import mongoose, { Document } from "mongoose";
import crypto from "crypto";

// Define the TypeScript interface for the user
interface IUser extends Document {
    name: string;
    email: string;
    hashed_password: string;
    salt?: string;
    _password?: string,
    createdAt?: Date;
    updatedAt?: Date;

    makeSalt(): string;
    encryptPassword(password: string): string;
    authenticate(plainText: string): boolean;
    encryptPassword(password: string): string;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email already exists'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: [true, 'Email is required'],
    },
    hashed_password: {
        type: String,
        required: [true, 'Password is required'],
    },
    salt: String
}, {
    timestamps: true
});

UserSchema
    .virtual('password')
    .set(function (this: IUser, password: string) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this.hashed_password;
    });

UserSchema.methods = {
    authenticate: function (plainText: string) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password: string) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
};

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6 ) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required.')
    }
})

const User = mongoose.model("User", UserSchema);

export { User, IUser};

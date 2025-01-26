"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (error, res, statusCode = 500) => {
    console.error("Error: ", error.message || error);
    if (error.name === 'ValidationError') {
        // Handle validation errors differently
        statusCode = 400;
        return res.status(statusCode).json({
            error: "Validation Error: " + error.message,
        });
    }
    // Default response for any other type of error
    res.status(statusCode).json({
        error: error.message || "Internal server error",
    });
};
exports.default = handleError;

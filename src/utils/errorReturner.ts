import { NextResponse } from "next/server";
import ErrorReturn from "../models/ErrorReturn";

const errorReturner = (error: any): ErrorReturn => {
    if (error.response) { // Axios Error
        return {
            status: error.response.status,
            message: error.response.data.error,
            headers: error.response.data.headers
        };
    } else { // "http-errors" Error
        return {
            status: error.status,
            message: error.message,
            headers: error.headers,
        };
    }
}

export const nextErrorReturner = (error: ErrorReturn): NextResponse => {
    let errorBody = { // "http-errors" Error
        error: error.message,
        headers: error.headers
    }

    if (!error.headers) { // Axios Error
        errorBody = {
            error: error.response?.data.error || "Unknown error.",
            headers: {
                from: "axios_error",
                key: error.code!
            }
        }
    }

    return NextResponse.json(errorBody, { status: error.status! })
}

export default errorReturner;
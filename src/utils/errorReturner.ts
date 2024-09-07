import { NextResponse } from "next/server";
import ErrorReturn from "../models/ErrorReturn";

const errorReturner = (error: any): ErrorReturn => {
    if (error.response) {
        return {
            status: error.response.status,
            message: error.response.data.error,
            headers: error.response.data.headers
        };
    } else {
        return {
            status: error.status,
            message: error.message,
            headers: error.headers,
        };
    }
}

export const nextErrorReturner = (error: ErrorReturn): NextResponse => {
    return NextResponse.json({
        error: error.message,
        headers: error.headers
    }, { status: error.status! })
}

export default errorReturner;
export default interface ErrorReturn {
    status: number | null,
    message: string | null,
    headers?: {
        from: string | null,
        key: string | null,
    }
    response?: {
        data: {
            error: string
        }
    }
    code?: string,
}

export const errorReturnDefault: ErrorReturn = {
    status: null,
    message: null,
    headers: {
        from: null,
        key: null
    }
};
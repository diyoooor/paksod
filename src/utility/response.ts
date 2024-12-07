interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    data?: T;
    message?: string;
    error?: T;
}

export const createApiResponse = <T>(
    success: boolean,
    statusCode: number,
    payload?: T,
    message?: string,
    error?: T
): ApiResponse<T> => {
    return success ?
        {
            success,
            statusCode,
            data: payload,
            message,
        }
        :
        {
            success,
            statusCode,
            error,
            message,
        };

};

export const commonErrorResponse = (status: number, message: string, error: unknown
) => {
    return createApiResponse(false, status, {}, message, error);
}

export const commonSuccessResponse = (status: number, message: string, payload: unknown) => {
    return createApiResponse(true, status, payload, message);
}

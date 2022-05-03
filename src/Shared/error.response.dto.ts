export class ErrorResponseDto {
    code: number;
    message: string;

    static async of(code: number, message: string): Promise<ErrorResponseDto> {
        return {
            code: code,
            message: message
        }
    }
}
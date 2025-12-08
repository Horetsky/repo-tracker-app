
export class JwtTokenPayload {
    sub: string;
    email: string;
}

export class SessionResponseDto {
    accessToken: string;
    payload: JwtTokenPayload;
}
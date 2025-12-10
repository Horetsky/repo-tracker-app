import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export default {
    origin: [
        process.env.WEB_CLIENT_PUBLIC_URL || "",
    ],
    credentials: true,
} satisfies CorsOptions;
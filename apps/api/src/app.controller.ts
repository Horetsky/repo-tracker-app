import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@/config.service";

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    // Health Check
    @Get()
    getHello(): string {
        return `Hello World ${this.configService.env("PORT")}!`;
    }
}

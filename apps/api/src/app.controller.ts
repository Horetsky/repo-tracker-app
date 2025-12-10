import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@/config.service";
import { Public } from "@/decorators";

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    // Health Check
    @Public()
    @Get()
    getHello(): string {
        return `Hello World ${this.configService.env("PORT")}!`;
    }
}

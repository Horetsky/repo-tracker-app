import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { UserModule } from "@/modules/user/user.module";
import { ProjectModule } from "@/modules/project/project.module";

@Module({
    imports: [
        UserModule,
        ProjectModule,
    ],
    providers: [SeedService],
})
export class SeedModule {}

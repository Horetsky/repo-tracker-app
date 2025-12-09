import { UserModule } from "@/modules/user/user.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { ProjectModule } from "@/modules/project/project.module";
import { SeedModule } from "@/modules/seed/seed.module";

export default [
    UserModule,
    AuthModule,
    ProjectModule,
    
    SeedModule,
];
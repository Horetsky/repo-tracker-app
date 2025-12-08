import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "@/modules/user/entities";
import { UserController } from "@/modules/user/user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

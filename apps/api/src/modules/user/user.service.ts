import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "@/modules/user/entities";
import { Repository } from "typeorm";
import { CreateUserDto } from "@/modules/user/dto";
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async create(input: CreateUserDto): Promise<UsersEntity> {
        const exists = await this.usersRepository.exists({
            where: { email: input.email },
        });

        if(exists) throw new ConflictException();

        const passwordHash = await bcrypt.hash(input.password, 10);

        return this.usersRepository.save({
            email: input.email,
            password: passwordHash,
        });
    }

    async findOneByEmail(email: string): Promise<UsersEntity | null> {
        return this.usersRepository.findOneBy({ email });
    }
}

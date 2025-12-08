import { IsNotEmpty, IsString } from "class-validator";

export class AddProjectDto {
    @IsString()
    @IsNotEmpty()
    owner: string;

    @IsString()
    @IsNotEmpty()
    repo: string;
}
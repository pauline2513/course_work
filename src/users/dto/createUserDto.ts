import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}
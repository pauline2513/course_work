import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;
}
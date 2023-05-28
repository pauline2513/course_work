import { Body, Controller, Delete, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { UpdateUserDto } from "./dto/updateUserDto";

@Controller('users')
@ApiTags("Пользователи")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch()
    update(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
        const user = request.user;
        return this.usersService.updateUser(user.email, updateDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete()
    delete(@Req() request): Promise<boolean>{
        const user = request.user;
        return this.usersService.deleteUser(user.email);
    }
}
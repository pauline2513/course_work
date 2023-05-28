import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/createUserDto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserLoginDto } from "./dto/userLoginDto";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.registerUser(userDto);
    }
    @Post('login')
    login (@Body() dto: UserLoginDto) {
        return this.authService.loginUser(dto);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    // @Post('test')
    // test() {
    //     return true;
    // }
    
}
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/createUserDto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { UserLoginDto } from "./dto/userLoginDto";
import * as bcrypt from 'bcrypt';
import { TokenService } from "src/token/token.sevice";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly tokenService: TokenService) {}

    async registerUser(userDto: CreateUserDto): Promise<User>
    {
        const exist_user = await this.userService.findUserByEmail(userDto.email)
        if (exist_user) {
            throw new BadRequestException("user with this email already exists");
        }
        return this.userService.createUser(userDto);
    }
    async loginUser(userLoginDto: UserLoginDto): Promise<string> {
        const exist_user = await this.userService.findUserByEmail(userLoginDto.email)
        if (!exist_user) {
            throw new BadRequestException("user with this email does not exists");
        }
        const validatePassword = await bcrypt.compare(userLoginDto.password, exist_user.password);
        if (!validatePassword) {
            throw new BadRequestException("wrong email or password");
        }
        const userInfo = {username: exist_user.username, email: exist_user.email}
        const token = await this.tokenService.generateJwtToken(userInfo)
        return token;
    }
}
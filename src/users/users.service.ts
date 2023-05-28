import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    
    async hashPassword (password) {
        return bcrypt.hash(password, 10)
    }
    async findUserByEmail(needed_email : string)
    {
        return this.userRepository.findOne({
            where: {email: needed_email}
        })
    }
    async createUser(userDto: CreateUserDto): Promise<User>
    {
        const user = this.userRepository.create();
        user.password = await this.hashPassword(userDto.password);
        user.email = userDto.email;
        user.username = userDto.username;
        await this.userRepository.save(user);
        return user;
    }
    async updateUser(email: string, userDto: UpdateUserDto): Promise<UpdateUserDto>{
        await this.userRepository.update({email: email}, userDto)
        return userDto;
    }

    async deleteUser(email: string): Promise<boolean>{
        await this.userRepository.delete({email: email});
        return true
    }
    // async userForPublic(email:string) {
    //     return this.userRepository.findOne({
    //         where: {email: email},
    //         select: {
    //             id: false,
    //             username: true,
    //             email: true,
    //             password: false,
    //         }
    //     })
    // }

}
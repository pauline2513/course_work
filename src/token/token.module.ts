import { Module } from "@nestjs/common";
import { TokenService } from "./token.sevice";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [TokenService, JwtService],
    exports: [TokenService]
})
export class TokenModule {};


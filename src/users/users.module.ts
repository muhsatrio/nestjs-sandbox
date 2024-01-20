import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        AuthModule
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
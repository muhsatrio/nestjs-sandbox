import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiPathConst } from 'src/lib/const/api.path.const';
import { InsertUserDTO } from './dto/insert-user.dto';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller(ApiPathConst.USERS)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async insert(@Body() request: InsertUserDTO) {
        await this.usersService.insert(request);

        return {
            message: "OK"
        }
    }

    @Post("login")
    async login(@Body() request: LoginRequestDTO): Promise<LoginResponseDTO> {
        return this.usersService.login(request);
    }
}

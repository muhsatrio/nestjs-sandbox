import { Body, Controller, Get, Head, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiPathConst } from 'src/lib/const/api.path.const';
import { InsertUserDTO } from './dto/insert-user.dto';
import { GetUsersDTO } from './dto/get.users.dto';
import { GeneralConst } from 'src/lib/const/general.const';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller(ApiPathConst.USERS)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post("register")
    async insert(@Body() request: InsertUserDTO) {
        await this.usersService.insert(request);

        return {
            message: "OK"
        }
    }

    @Get()
    async get(@Headers(GeneralConst.HEADER_AUTHORIZATION) headerAuthorization): Promise<GetUsersDTO[]> {
        return this.usersService.getAll(headerAuthorization);
    }

    @Post("login")
    async login(@Body() request: LoginRequestDTO): Promise<LoginResponseDTO> {
        return this.usersService.login(request);
    }
}

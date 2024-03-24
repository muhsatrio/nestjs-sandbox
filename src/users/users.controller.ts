import { Body, Controller, Get, Head, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiPathConst } from 'src/lib/const/api.path.const';
import { InsertUserRequest } from './request/insert-user-request';
import { GetUsersResponse } from './response/get.users-response';
import { GeneralConst } from 'src/lib/const/general.const';
import { LoginRequest } from './request/login-request';
import { LoginResponse } from './response/login-response';

@Controller(ApiPathConst.USERS)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post("register")
    async insert(@Body() request: InsertUserRequest) {
        await this.usersService.insert(request);

        return {
            message: "OK"
        }
    }

    @Get()
    async get(): Promise<GetUsersResponse[]> {
        return this.usersService.getAll();
    }

    @Post("login")
    async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.usersService.login(request);
    }
}

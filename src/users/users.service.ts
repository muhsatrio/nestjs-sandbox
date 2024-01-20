import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InsertUserDTO } from './dto/insert-user.dto';
import { GetUsersDTO } from './dto/get.users.dto';
import * as bcrypt from 'bcrypt';
import { FindUserDTO } from './dto/find-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private authService: AuthService,
        ) {}

    async insert(request: InsertUserDTO): Promise<void> {
        const foundUser: Users = await this.usersRepository.findOneBy({
            username: request.username
        });

        if (foundUser != null) {
            throw new BadRequestException("User had been exist.");
        }

        const encryptedPassword = await bcrypt.hash(request.password, 10);

        const newUser = new Users();

        newUser.name = request.name;
        newUser.password = encryptedPassword;
        newUser.username = request.username;

        await this.usersRepository.insert(newUser);
    }

    async find(username: string): Promise<FindUserDTO> | undefined {
        const foundUsers: Users = await this.usersRepository.findOneBy({
            username: username
        });
        
        if (!foundUsers) {
            return null;
        }

        return {
            username: foundUsers.username,
            name: foundUsers.name,
            password: foundUsers.password
        }
    }

    async getAll(headerAuth: string): Promise<GetUsersDTO[]> {
        await this.authService.auth(headerAuth);

        const foundUser: Users[] = await this.usersRepository.find();
        const returnedUsers: GetUsersDTO[] = new Array();

        foundUser.forEach(eachUser => {
            returnedUsers.push({
                username: eachUser.username,
                name: eachUser.name
            })
        });

        return returnedUsers;
    }

    async login(request: LoginRequestDTO): Promise<LoginResponseDTO> {
        const foundUser: FindUserDTO = await this.find(request.username);

        if (!foundUser) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const valid = await bcrypt.compare(request.password, foundUser.password);

        if (!valid) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const token = await this.authService.signToken(foundUser.username);

        return {
            token
        };
    }
}

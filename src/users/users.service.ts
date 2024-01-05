import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InsertUserDTO } from './dto/insert-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService
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

    async login(request: LoginRequestDTO): Promise<LoginResponseDTO> {
        const foundUser: Users = await this.usersRepository.findOneBy({
            username: request.username
        });

        if (foundUser == null) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const valid = await bcrypt.compare(request.password, foundUser.password);

        if (!valid) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const token = await this.jwtService.signAsync({
            sub: foundUser.id,
            username: foundUser.password
        })

        return {
            token: token
        }
    }
}

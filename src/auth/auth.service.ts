import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GeneralConst } from 'src/lib/const/general.const';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    async auth(headerAuthorization: string) {
        if (!headerAuthorization) {
            throw new UnauthorizedException('Unauthorized');
        }

        const token = this.extractTokenFromHeader(headerAuthorization);

        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }

        try {
            await this.jwtService.verifyAsync(token, {
                secret: GeneralConst.JWT_SECRET
            })
        } catch {
            throw new UnauthorizedException('Unauthorized');
        }
    }

    async signToken(username: string): Promise<string> {
        const token = await this.jwtService.signAsync({
            username: username
        });

        return token;
    }

    private extractTokenFromHeader(auth: string): string | undefined {
        const [type, token] = auth.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

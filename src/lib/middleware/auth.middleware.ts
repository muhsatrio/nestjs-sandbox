import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { GeneralConst } from "../const/general.const";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService
    ) {}

    async use (req: Request, _res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new UnauthorizedException('Unauthorized');
        }

        const token = this.extractTokenFromHeader(req.headers.authorization);

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

        next();
    }

    private extractTokenFromHeader(auth: string): string | undefined {
        const [type, token] = auth.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
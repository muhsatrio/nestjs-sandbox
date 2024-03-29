import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AuthMiddleware } from "src/lib/middleware/auth.middleware";
import { ApiPathConst } from "src/lib/const/api.path.const";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude(
            {path: ApiPathConst.USERS + "/register", method: RequestMethod.POST},
            {path: ApiPathConst.USERS + "/login", method: RequestMethod.POST}
        ).forRoutes(UsersController);
    }
}
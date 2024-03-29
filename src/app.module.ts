import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GeneralConst } from './lib/const/general.const';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users],
      synchronize: true
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: GeneralConst.JWT_SECRET,
      signOptions: {
          expiresIn: GeneralConst.JWT_EXPIRY_TIME
      }
  })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

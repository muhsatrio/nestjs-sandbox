import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GeneralConst } from 'src/lib/const/general.const';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [JwtModule.register({
      global: true,
      secret: GeneralConst.JWT_SECRET,
      signOptions: {
          expiresIn: GeneralConst.JWT_EXPIRY_TIME
      }
  })]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../entity/usuario.entity';
import { Token } from '../entity/token.entity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Usuario, Token]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 60 * 60 * 24 * 30,
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

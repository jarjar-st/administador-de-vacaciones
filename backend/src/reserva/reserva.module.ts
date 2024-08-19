import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, PrismaService, JwtService, TwilioService]
})
export class ReservaModule {}

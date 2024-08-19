import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VacaService } from './vaca.service';
import { VacaController } from './vaca.controller';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  providers: [VacaService, PrismaService, JwtService, TwilioService],
  controllers: [VacaController]
})
export class VacaModule {}

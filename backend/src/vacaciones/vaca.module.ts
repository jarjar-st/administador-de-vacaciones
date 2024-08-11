import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VacaService } from './vaca.service';
import { VacaController } from './vaca.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [VacaService, PrismaService, JwtService],
  controllers: [VacaController]
})
export class VacaModule {}

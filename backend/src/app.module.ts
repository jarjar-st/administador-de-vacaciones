import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ReservaModule } from './reserva/reserva.module';
import { InventarioModule } from './Inventario/inventario.module';
import { VacaModule } from './vacaciones/vaca.module';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ReservaModule,
    InventarioModule,
    VacaModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}

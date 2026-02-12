import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CardsModule } from './cards/cards.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PaymentsModule } from './payments/payments.module';
import { AssetsModule } from './assets/assets.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    CardsModule,
    ExpensesModule,
    PaymentsModule,
    AssetsModule,
    DashboardModule,
    AnalysisModule,
  ],
})
export class AppModule {}

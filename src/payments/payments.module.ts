import { Module } from '@nestjs/common';
import { CardsModule } from '../cards/cards.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [CardsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

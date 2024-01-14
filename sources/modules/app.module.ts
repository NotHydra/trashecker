import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TrashBinModule } from './trash-bin.module';

@Module({
  imports: [TrashBinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

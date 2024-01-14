import { Module } from '@nestjs/common';
import { TrashBinController } from 'controllers/trash-bin.controller';
import { TrashBinService } from 'services/trash-bin.service';

@Module({
  imports: [],
  controllers: [TrashBinController],
  providers: [TrashBinService],
})
export class TrashBinModule {}

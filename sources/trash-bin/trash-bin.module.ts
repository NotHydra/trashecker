import { Module } from '@nestjs/common';
import { TrashBinController } from 'trash-bin/trash-bin.controller';
import { TrashBinService } from 'trash-bin/trash-bin.service';

@Module({
  imports: [],
  controllers: [TrashBinController],
  providers: [TrashBinService],
})
export class TrashBinModule {}

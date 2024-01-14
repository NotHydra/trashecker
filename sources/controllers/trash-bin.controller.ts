import { Body, Controller, Get, Put } from '@nestjs/common';
import { TrashBinService } from 'services/trash-bin.service';

@Controller('trash-bin')
export class TrashBinController {
  constructor(private readonly service: TrashBinService) {}

  @Get()
  public find(): TrashBinInterface {
    return this.service.find();
  }

  @Put('full')
  public changeFull(@Body() body: { full: boolean }): TrashBinInterface {
    return this.service.changeFull(body.full);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class TrashBinService {
  private trashBin: TrashBinInterface = {
    id: 1,
    name: 'Trash Bin 1',
    full: true,
  };

  public find(): TrashBinInterface {
    return this.trashBin;
  }

  public changeFull(full: boolean): TrashBinInterface {
    this.trashBin.full = full;

    return this.trashBin;
  }
}

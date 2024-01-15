import { Injectable } from '@nestjs/common';

@Injectable()
export class TrashBinService {
  private trashBins: TrashBinInterface[] = [
    {
      id: 1,
      name: 'Trash Bin 1',
      maxCapacity: null,
      currentCapacity: null,
    },
  ];

  public find(): TrashBinInterface[] {
    return this.trashBins;
  }

  public changeFull(id, trashBinDTO: TrashBinDTOInterface): TrashBinInterface {
    this.trashBins.find((trashBin: TrashBinInterface) => {
      if (trashBin.id === id) {
        if (trashBinDTO.name !== null) {
          trashBin.name = trashBinDTO.name;
        }

        if (trashBinDTO.maxCapacity !== null) {
          trashBin.maxCapacity = trashBinDTO.maxCapacity;
        }

        if (trashBinDTO.currentCapacity !== null) {
          trashBin.currentCapacity = trashBinDTO.currentCapacity;
        }

        return trashBin;
      }
    });

    return null;
  }
}

import { Injectable } from "@nestjs/common";
import { SocketGateway } from "providers/socket.gateway";

@Injectable()
export class TrashBinService {
    constructor(private readonly socketGateway: SocketGateway) {}

    private trashBins: TrashBinInterface[] = [
        {
            id: 1,
            name: "Trash Bin 1",
            maxCapacity: null,
            currentCapacity: null,
        },
    ];

    public find(): TrashBinInterface[] {
        return this.trashBins;
    }

    public change(id: number, trashBinDTO: TrashBinDTOInterface): TrashBinInterface {
        return this.trashBins.find((trashBin: TrashBinInterface): TrashBinDTOInterface => {
            if (trashBin.id === id) {
                if (trashBinDTO.name !== null && trashBinDTO.name !== undefined) {
                    trashBin.name = trashBinDTO.name;
                }

                if (trashBinDTO.maxCapacity !== null && trashBinDTO.maxCapacity !== undefined) {
                    trashBin.maxCapacity = trashBinDTO.maxCapacity;
                }

                if (trashBinDTO.currentCapacity !== null && trashBinDTO.currentCapacity !== undefined) {
                    trashBin.currentCapacity = trashBinDTO.currentCapacity;
                }

                console.log(trashBin);

                this.socketGateway.server.emit("trashBinChanged", trashBin);

                return trashBin;
            }
        });
    }
}

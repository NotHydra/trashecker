import { Module } from "@nestjs/common";
import { TrashBinController } from "./trash-bin.controller";
import { TrashBinService } from "./trash-bin.service";
import { SocketGateway } from "providers/socket.gateway";

@Module({
    imports: [],
    controllers: [TrashBinController],
    providers: [TrashBinService, SocketGateway],
})
export class TrashBinModule {}

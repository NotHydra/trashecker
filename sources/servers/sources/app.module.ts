import { Module } from "@nestjs/common";
import { TrashBinModule } from "./trash-bin/trash-bin.module";
import { SocketGateway } from "./providers/socket.gateway";

@Module({
    imports: [TrashBinModule],
    controllers: [],
    providers: [SocketGateway],
})
export class AppModule {}

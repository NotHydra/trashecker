import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("trashBinChanged")
    handleTrashBinChanged(@MessageBody() trashBin: TrashBinInterface): void {
        console.log(trashBin);

        this.server.emit("trashBinChanged", trashBin);
    }
}

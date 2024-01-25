import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("trashBinChanged")
    handleMessage(@MessageBody() trashBin: TrashBinDTOInterface): void {
        this.server.emit("trashBinChanged", trashBin);
    }
}

import { Body, Controller, Get, Param, ParseIntPipe, Put } from "@nestjs/common";
import { TrashBinService } from "./trash-bin.service";

@Controller("api/trash-bin")
export class TrashBinController {
    constructor(private readonly service: TrashBinService) {}

    @Get()
    public find(): TrashBinInterface[] {
        return this.service.find();
    }

    @Put(":id")
    public change(@Param("id", ParseIntPipe) id: number, @Body() body: TrashBinDTOInterface): TrashBinInterface {
        return this.service.change(id, body);
    }
}

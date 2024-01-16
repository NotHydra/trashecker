import { Module } from "@nestjs/common";
import { TrashBinModule } from "./trash-bin/trash-bin.module";

@Module({
    imports: [TrashBinModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

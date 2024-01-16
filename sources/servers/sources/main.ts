import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { INestApplication } from "@nestjs/common";

async function bootstrap(): Promise<void> {
    dotenv.config();

    const app: INestApplication = await NestFactory.create<INestApplication>(AppModule);
    const port: number = parseInt(process.env.PORT) || 3000;

    app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept");

        next();
    });

    app.enableCors({
        credentials: true,
        origin: "*",
        allowedHeaders: "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe",
        methods: "GET,POST,PUT,DELETE",
    });

    await app.listen(port);

    console.log(`Listening on http://localhost:${port}`);
}

bootstrap();

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main() {
    // --- MONGODB
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message from Mongo',
    //     origin: 'app.ts',
    //     level: 'low'
    // });

    // await newLog.save();
    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);
    // console.log(logs[0]?.message);


    // --- POSTGRES
    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'app.ts'
    //     }
    // });
    // console.log({newLog});

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs);

    Server.start();
    // console.log(envs);
}
import { MongoClient } from "mongodb";
import * as path from 'path';
import * as fs from "fs";

import Config from "../src/app/config";

const client = new MongoClient(Config.MONGO_URL);

async function getData() {
    const products =  await new Promise<any>((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "./products.json"), { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

    return products.map(product => ({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
    }))
}

async function main() {
    try {
        const products = await getData();
        await client.connect();
        const db = client.db(Config.FASHION_CLOUD_DB);
        const collection = db.collection("products");
        await collection.insertMany(products);
    }
    catch (err) {
        console.log("error ", err)
    }

}

main().then(() => {
    client.close();
    console.log("products added to DB")
})
    .catch((error) => {
        client.close();
        console.log("error", error)
        process.exit(1);
    });

const { MongoClient } = require("mongodb");

async function run() {
    const uri = "mongodb://localhost:27017"; 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("laptopStore");
        const collection = db.collection("laptops");

        
        await collection.insertMany([
            {
                brand: "Dell",
                model: "XPS 13",
                processor: "Intel Core i7",
                ram: "16GB",
                storage: "512GB SSD",
                price: 1299.99,
                stock: 10
            },
            {
                brand: "Apple",
                model: "MacBook Air",
                processor: "M1",
                ram: "8GB",
                storage: "256GB SSD",
                price: 999.99,
                stock: 15
            }
        ]);

        console.log("Data inserted successfully!");
    } finally {
        await client.close();
    }
}

run().catch(console.error);

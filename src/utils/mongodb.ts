import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const options = {};

let client;
let clientPromise: Promise<MongoClient> = Promise.resolve(
  new MongoClient(uri, options)
);

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

import { MongoClient } from "mongodb";

const connectionMongoDB = async () => {
  try {
    const url = process.env.URL_DB || '';
    const client = new MongoClient(url);
    const dbName = process.env.DB_NAME || '';
    await client.connect();
    console.info("Connected successfully to server");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const getConnection = async () => {
  try {
    const con = await connectionMongoDB();
    if (!con) return false;
    return true;
  } catch (error) {
    return false;
  }
}

export default getConnection;
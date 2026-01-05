const { MongoClient } = require("mongodb");
require("dotenv").config();

async function testBasicConnection() {
  const uri = process.env.MONGODB_URI;
  console.log("Testing basic MongoDB connection...");
  console.log("URI:", uri.replace(/:[^:@]+@/, ':****@')); // Hide password
  
  const client = new MongoClient(uri);
  
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("✅ Connected successfully!");
    
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping successful!");
    
    const databases = await client.db().admin().listDatabases();
    console.log("✅ Databases:", databases.databases.map(db => db.name));
    
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error(error.message);
    console.error("\nFull error:", error);
  } finally {
    await client.close();
  }
}

testBasicConnection();

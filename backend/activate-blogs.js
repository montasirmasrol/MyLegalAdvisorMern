const { MongoClient } = require("mongodb");
require("dotenv").config();

async function activateBlogs() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("mylegaladvisor");
    const result = await db.collection("blogs").updateMany(
      { isActive: false },
      { $set: { isActive: true } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} blogs to active status`);
    console.log(`✅ Matched ${result.matchedCount} inactive blogs`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

activateBlogs();

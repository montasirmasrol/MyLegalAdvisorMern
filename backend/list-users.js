const { MongoClient } = require("mongodb");
require("dotenv").config();

async function listUsers() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB\n");
    
    const db = client.db("mylegaladvisor");
    const users = await db.collection("users").find({}).toArray();
    
    console.log(`Found ${users.length} users:\n`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role || "Not set"}`);
      console.log(`   ID: ${user._id}`);
      console.log("");
    });
    
    if (users.length > 0) {
      console.log("\n📝 To make a user an admin, run:");
      console.log("   node make-admin.js <email>");
      console.log("\nExample:");
      console.log(`   node make-admin.js ${users[0].email}`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

listUsers();

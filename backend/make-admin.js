const { MongoClient } = require("mongodb");
require("dotenv").config();

async function makeAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.error("❌ Please provide an email address");
    console.log("\nUsage: node make-admin.js <email>");
    console.log("Example: node make-admin.js user@example.com");
    process.exit(1);
  }
  
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB\n");
    
    const db = client.db("mylegaladvisor");
    
    // Find user by email
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      console.log("\nRun 'node list-users.js' to see all users");
      process.exit(1);
    }
    
    console.log(`Found user: ${user.name} (${user.email})`);
    console.log(`Current role: ${user.role || "Not set"}\n`);
    
    // Update user role to admin
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { role: "admin" } }
    );
    
    if (result.modifiedCount > 0) {
      console.log(`✅ Successfully made ${user.name} an admin!`);
      console.log("\n🎉 You can now login and access admin features");
    } else {
      console.log(`ℹ️ User was already an admin`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

makeAdmin();

const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Test MongoDB Connection
async function testMongoDB() {
  console.log("\n🔍 Testing MongoDB Connection...\n");
  
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error("❌ MONGODB_URI not found in .env file!");
    return false;
  }
  
  console.log("✓ MONGODB_URI found in .env");
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect
    await client.connect();
    console.log("✅ MongoDB connected successfully!");
    
    // Test ping
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB ping successful!");
    
    // Check database
    const dbName = process.env.MONGODB_DB || "mylegaladvisor";
    const db = client.db(dbName);
    console.log(`✅ Database '${dbName}' accessible!`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Test each collection
    const requiredCollections = ['users', 'lawyers', 'blogs', 'appointments', 'comments', 'ratings'];
    console.log("\n📊 Checking collection counts:");
    
    for (const collectionName of requiredCollections) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`   - ${collectionName}: ${count} documents`);
      } catch (err) {
        console.log(`   - ${collectionName}: Collection doesn't exist yet (will be created on first insert)`);
      }
    }
    
    await client.close();
    console.log("\n✅ All MongoDB tests passed!\n");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error("Error:", error.message);
    if (error.code === 'ENOTFOUND') {
      console.error("\n💡 Tip: Check your internet connection and MongoDB URI");
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error("\n💡 Tip: This is a Node.js v22 SSL compatibility issue.");
      console.error("   Solutions:");
      console.error("   1. Downgrade to Node.js v20 LTS: nvm install 20 && nvm use 20");
      console.error("   2. Or use the connection string with SSL disabled (not recommended for production)");
    }
    return false;
  }
}

// Test Email Configuration
function testEmail() {
  console.log("\n🔍 Testing Email Configuration...\n");
  
  const email = process.env.TRANSPORTER_EMAIL;
  const pass = process.env.TRANSPORTER_PASS;
  
  if (!email) {
    console.error("❌ TRANSPORTER_EMAIL not found in .env file!");
    return false;
  }
  console.log(`✓ TRANSPORTER_EMAIL: ${email}`);
  
  if (!pass) {
    console.error("❌ TRANSPORTER_PASS not found in .env file!");
    return false;
  }
  console.log("✓ TRANSPORTER_PASS: Found (hidden for security)");
  
  console.log("\n✅ Email configuration looks good!");
  console.log("💡 Note: Actual email sending will be tested when you use the contact form\n");
  return true;
}

// Run all tests
async function runAllTests() {
  console.log("=".repeat(60));
  console.log("  MY LEGAL ADVISOR - CONNECTION TEST");
  console.log("=".repeat(60));
  
  const mongoResult = await testMongoDB();
  const emailResult = testEmail();
  
  console.log("=".repeat(60));
  if (mongoResult && emailResult) {
    console.log("✅ ALL TESTS PASSED! Your backend is ready to use.");
  } else {
    console.log("❌ SOME TESTS FAILED! Please fix the issues above.");
  }
  console.log("=".repeat(60) + "\n");
}

runAllTests();

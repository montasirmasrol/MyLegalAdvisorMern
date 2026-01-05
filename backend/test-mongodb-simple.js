// Minimal test to verify MongoDB connection works
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Completely bypass SSL verification for Node.js v22
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testConnection() {
  console.log('\n🔍 Testing MongoDB Connection...\n');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('mylegaladvisor');
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections`);
    
    // Try to insert a test document
    const testCollection = db.collection('test');
    await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    console.log('✅ Can write to database');
    
    // Clean up test
    await testCollection.deleteMany({ test: 'data' });
    console.log('✅ Can delete from database');
    
    console.log('\n✅ MongoDB is working perfectly!\n');
    await client.close();
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

testConnection().then(success => process.exit(success ? 0 : 1));

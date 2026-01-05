const { MongoClient } = require("mongodb");
require("dotenv").config();

async function fixBlogs() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB\n");
    
    const db = client.db("mylegaladvisor");
    
    // Update all blogs where isActive is null or doesn't exist
    const result = await db.collection("blogs").updateMany(
      { $or: [{ isActive: null }, { isActive: { $exists: false } }] },
      { $set: { isActive: true } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} blogs to active status`);
    console.log(`✅ Matched ${result.matchedCount} blogs\n`);
    
    // Show updated blogs
    const blogs = await db.collection("blogs").find({}).toArray();
    console.log(`Total blogs: ${blogs.length}`);
    blogs.forEach((blog, index) => {
      console.log(`  ${index + 1}. ${blog.blog_title} - isActive: ${blog.isActive}`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

fixBlogs();

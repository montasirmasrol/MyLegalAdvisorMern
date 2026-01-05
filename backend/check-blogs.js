const { MongoClient } = require("mongodb");
require("dotenv").config();

async function checkBlogs() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB\n");
    
    const db = client.db("mylegaladvisor");
    const blogs = await db.collection("blogs").find({}).toArray();
    
    console.log(`Found ${blogs.length} total blogs:\n`);
    blogs.forEach((blog, index) => {
      console.log(`Blog ${index + 1}:`);
      console.log(`  Title: ${blog.blog_title}`);
      console.log(`  isActive: ${blog.isActive}`);
      console.log(`  ID: ${blog._id}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

checkBlogs();

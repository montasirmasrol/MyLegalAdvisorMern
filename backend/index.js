const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

const sendEmail = (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASS,
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailBody = {
    from: `"My Legal Advisor" <${process.env.TRANSPORTER_EMAIL}>`, // sender address
    to: emailAddress, // list of receivers
    subject: emailData.subject, // Subject line
    html: emailData.message, // html body
  };

  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });
};

//middlewares
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI is not defined in .env file!');
  process.exit(1);
}

console.log('🔍 Connecting to MongoDB...');

// Create a MongoClient with standard options for Node.js v20
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Serve all uploaded files statically from any subfolder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function run() {
  try {
    // Connect to MongoDB
    console.log('⏳ Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log('✅ MongoDB ping successful!');
    
    const dbName = process.env.MONGODB_DB || "mylegaladvisor";
    const db = client.db(dbName);
    console.log(`✅ Using database: ${dbName}`);

    const allBlogCollection = db.collection("blogs");
    const userCollection = db.collection("users");
    const lawyerCollection = db.collection("lawyers");
    const allCommentCollection = db.collection("comments");
    const ratingCollection = db.collection("ratings");
    const appointmentCollection = db.collection("appointments");

    // ********** Users Related API *********//
    // get a user info by email from db
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    // Add user to database when user is created in the client site
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);

      // check whether user exists or not. Insert user only if user does not exist
      const query = { email: user.email };
      const existUser = await userCollection.findOne(query);
      console.log("Check user is present or not:", existUser);
      if (existUser) {
        return res.send({ message: "User already exists!", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      
      // If role is lawyer, also add to lawyers collection with default values
      if (user.role === "lawyer") {
        const lawyerData = {
          lawyer_name: user.name,
          lawyer_email: user.email,
          lawyer_image: user.image || "",
          category: "General",
          phone: "",
          professional_info: "Professional lawyer ready to assist you with legal matters.",
          qualification: "Law Degree",
          experience: 0,
          totalRating: 0,
          ratingCount: 0,
        };
        await lawyerCollection.insertOne(lawyerData);
      }
      
      res.send(result);
    });

    // ********** Users API  Ends here*********//

    // ********** Contact Form API *********//
    app.post("/contact", async (req, res) => {
      try {
        const { firstName, lastName, email, phone, message } = req.body;
        
        const emailData = {
          subject: `New Contact Form Submission from ${firstName} ${lastName}`,
          message: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };
        
        // Send email to admin
        sendEmail(process.env.TRANSPORTER_EMAIL, emailData);
        
        res.send({ success: true, message: "Contact form submitted successfully!" });
      } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).send({ success: false, message: "Failed to send message" });
      }
    });
    // ********** Contact Form API Ends here*********//

    // ********** Lawyers Related API *********//
    // get all lawyers info from database
    app.get("/lawyers", async (req, res) => {
      const result = await lawyerCollection.find().toArray();
      res.send(result);
    });

    // get all appointments data for a specific lawyer from database
    app.get("/appointments/:email", async (req, res) => {
      const lawyerEmail = req.params.email;
      console.log(lawyerEmail);
      const result = await appointmentCollection
        .find({ lawyerEmail })
        .toArray();
      res.send(result);
    });

    // get a single lawyer info for lawyer details page from database
    app.get("/lawyers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await lawyerCollection.findOne(query);
      res.send(result);
    });

    // get a lawyer info by email from database
    app.get("/lawyer/:email", async (req, res) => {
      const lawyer_email = req.params.email;
      const result = await lawyerCollection.findOne({ lawyer_email });
      res.send(result);
    });

    // to update likes count of meal data in the database
    app.patch("/appointment/:id", async (req, res) => {
      const id = req.params.id;
      const appData = req.body;

      console.log({ id, appData });
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "approved",
        },
      };
      const result = await appointmentCollection.updateOne(query, updateDoc);

      let subject = `Lawyer ${appData?.lawyerName} Approved the Appointment`;
      let message = "";

      if (appData?.consultationType === "free") {
        message = `
        Dear ${appData?.userName} ,
        
        Your appointment with the lawyer has been approved for a **Free Consultation**. 
        This consultation will take place via a phone call or an online meeting. 

        **Details:**
        - **Date and Time:** 12/01/2025 | 09:30 PM
        - "Meet Link: https://meet.google.com/jit-bvui-hwu"
        - "Phone: +01723332211"
        Best regards,  
        My Legal Advisor: Lawyer Appointment System
      `;
      }
      if (appData?.consultationType === "online") {
        message = `   
        Dear ${appData?.userName} ,

        Your appointment with the lawyer has been approved for an **Online Consultation**. 
        Please join the meeting using the link below at the scheduled time. 

        **Details:**
        - **Date and Time:** 12/01/2025 | 09:30 PM
        - **Meet Link:** https://meet.google.com/jit-bvui-hwu,
        - **Charge:** $50 (to be paid online)

        Best regards,  
        My Legal Advisor`;
      }
      if (appData?.consultationType === "offline") {
        message = `   
        Dear ${appData?.userName} ,
 Your appointment with the lawyer has been approved for an **Offline Consultation**. 
        Please visit the lawyer's office at the scheduled time.

       **Details:**
        - **Date and Time:** 12/01/2025 | 09:30 PM
        - **Charge:** $100 (to be paid at the office)

        Best regards,  
        Lawyer Appointment System`;
      }

      sendEmail(appData?.userEmail, {
        subject: subject,
        message: message,
      });

      res.send(result);
    });

    // Add or Update new or existing lawyer to the database
    app.put("/lawyer/:email", async (req, res) => {
      const email = req.params.email;
      const lawyerProfile = req.body;
      console.log("Lawyer Info:", { lawyerProfile, email });
      const query = { lawyer_email: lawyerProfile?.lawyer_email };

      const options = { upsert: true }; // Create if it doesn't exist
      const updateDoc = { $set: { ...lawyerProfile } };
      const result = await lawyerCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    // ********** Lawyer API  Ends here*********//

    //*************** Blogs API **************//

    // ******* Fetch All blogs from the DB ******//
    app.get("/blogs", async (req, res) => {
      const search = req.query.search;
      let query = {};
      if (search) {
        query = {
          blog_title: { $regex: search, $options: "i" },
        };
      }
      const result = await allBlogCollection.find(query).toArray();
      res.send(result);
    });

    // get single blog data from database
    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Get blog id:", id);
      const query = { _id: new ObjectId(id) };
      const result = await allBlogCollection.findOne(query);
      res.send(result);
    });

    // Save a blog by user and lawyer to the database
    app.post("/blog", async (req, res) => {
      const blogInfo = req.body;
      console.log(blogInfo);
      const result = await allBlogCollection.insertOne({
        ...blogInfo,
        isActive: true,
      });
      res.send(result);
    });

    // to update likes count of meal data in the database
    app.patch("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const { isActive } = req.body;
      const query = { _id: new ObjectId(id) };
      const options = {
        $set: { isActive },
      };
      if (!isActive) {
        options.$inc = { like: 1 };
      }
      const result = await allBlogCollection.updateOne(query, options);
      res.send(result);
    });

    // Delete a blog from database
    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete blog id:", id);
      const query = { _id: new ObjectId(id) };
      const result = await allBlogCollection.deleteOne(query);
      res.send(result);
    });

    //****** Blogs API Ends here *******//

    // ---------- Comments related API ---------- //
    // get all comments for specific blog from database
    app.get("/comments/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Comment blog id:", id);
      const query = { blogId: id };
      const result = await allCommentCollection.find(query).toArray();
      res.send(result);
    });
    // Save a comment by user and lawyer to the database
    app.post("/comment", async (req, res) => {
      const commentInfo = req.body;
      console.log(commentInfo);
      const result = await allCommentCollection.insertOne(commentInfo);
      res.send(result);
    });
    // ---------- Comments API Ends here ---------- //

    // ---------- Meals related API ---------- //

    // get all meals for admin dashboard from database
    app.get("/dasAllMeals", async (req, res) => {
      const result = await allBlogCollection.find().toArray();
      res.send(result);
    });

    //******* Rating Related API *********//

    // Add endpoint to check if user has already rated
    app.get("/ratings/:lawyerId/:userId", async (req, res) => {
      try {
        const { lawyerId, userId } = req.params;

        const existingRating = await ratingCollection.findOne({
          lawyerId,
          userId,
        });

        res.json({
          hasRated: !!existingRating,
          rating: existingRating?.rating || 0,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Modify the existing ratings endpoint to store user ratings
    app.post("/ratings", async (req, res) => {
      try {
        const { lawyerId, userId, rating } = req.body;

        // Check if user has already rated
        const existingRating = await ratingCollection.findOne({
          lawyerId,
          userId,
        });

        if (existingRating) {
          return res
            .status(400)
            .json({ error: "User has already rated this lawyer" });
        }

        // Store the rating
        await ratingCollection.insertOne({
          lawyerId,
          userId,
          rating,
          timestamp: new Date(),
        });

        // Update lawyer's total rating
        const result = await lawyerCollection.updateOne(
          { _id: new ObjectId(lawyerId) },
          {
            $inc: {
              totalRating: rating,
              ratingCount: 1,
            },
          }
        );

        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Create appointment
    app.post("/appointments", upload.single("documents"), async (req, res) => {
      try {
        const {
          subject,
          message,
          lawyerEmail,
          lawyerName,
          userName,
          userEmail,
          consultationType,
        } = req.body;

        const appointment = {
          lawyerEmail,
          lawyerName,
          userName,
          userEmail,
          subject,
          message,
          consultationType,
          documentUrl: req.file
            ? `/uploads/documents/${req.file.filename}`
            : null,
          status: "pending",
        };

        await appointmentCollection.insertOne(appointment);

        res.status(201).json({
          success: true,
          message: "Appointment request created successfully",
          appointment,
        });
      } catch (error) {
        console.error("Appointment creation error:", error);
        res.status(500).json({
          success: false,
          message: "Error creating appointment request",
        });
      }
    });

    // Send a ping to confirm a successful connection
    console.log('✅ All collections initialized successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    //  await client.close();
  }
}
run().catch((err) => {
  console.error('❌ Fatal Error:', err);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("My Legal Advisor server is running here!");
});

app.listen(port, () => {
  console.log(`My My Legal Advisor app is listening on port: ${port}`);
});

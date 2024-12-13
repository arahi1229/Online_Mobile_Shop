const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files for images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Static mobile data for fallback
// const staticMobiles = [
//   {
//     id: 1,
//     name: "iPhone 14",
//     brand: "Apple",
//     price: 999,
//     description: "Latest iPhone with A16 Bionic chip.",
//     image: "/images/Apple-iPhone-14.webp",
//   },
//   {
//     id: 2,
//     name: "Galaxy S23",
//     brand: "Samsung",
//     price: 899,
//     description: "Flagship Android phone from Samsung.",
//     image: "/images/s23.jpg",
//   },
//   {
//     id: 3,
//     name: "Pixel 9",
//     brand: "Google",
//     price: 799,
//     description: "Clean Android experience by Google.",
//     image: "/images/pixel8.webp",
//   },
//   {
//     id: 4,
//     name: "OnePlus 11",
//     brand: "OnePlus",
//     price: 699,
//     description: "Powerful and affordable flagship.",
//     image: "/images/oneplus.webp",
//   },
//   {
//     id: 5,
//     name: "Xiaomi 13 Pro",
//     brand: "Xiaomi",
//     price: 649,
//     description: "High-end Xiaomi phone with Snapdragon 8 Gen 1.",
//     image: "/images/xiamoni13.webp",
//   },
//   {
//     id: 6,
//     name: "Sony Xperia 1 IV",
//     brand: "Sony",
//     price: 899,
//     description: "4K display with powerful camera features.",
//     image: "/images/sony.webp",
//   },
//   {
//     id: 7,
//     name: "Oppo Find X5",
//     brand: "Oppo",
//     price: 749,
//     description: "Stylish design with Hasselblad camera tech.",
//     image: "/images/oppo.webp",
//   },
//   {
//     id: 8,
//     name: "Huawei P50 Pro",
//     brand: "Huawei",
//     price: 799,
//     description: "Flagship Huawei phone with stunning cameras.",
//     image: "/images/huwa.webp",
//   },
// ];

// MongoDB connection URI
const uri = "mongodb+srv://ar17301164:ARMMRrfa10@cluster0.pbiht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let phonecollection;

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("onlinemobileshop");
    phonecollection = db.collection("phone");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

initializeDatabase().catch(console.dir);

// Middleware to ensure database is initialized
app.use((req, res, next) => {
  if (!phonecollection) {
    console.warn("Database not initialized yet. Falling back to static data.");
  }
  next();
});

// API endpoint to fetch all mobiles
app.get('/api', async (req, res) => {
  try {
    if (!phonecollection) {
      // Database not connected, fallback to static data
      return res.json(staticMobiles);
    }
    const mobiles = await phonecollection.find({}).toArray();
    res.json(mobiles);
  } catch (error) {
    console.error("Failed to fetch mobiles from database:", error);
    res.json(staticMobiles); // Fallback to static data on error
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Backend is running!</h1>');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


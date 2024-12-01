
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Mobile data with local image paths
// const mobiles = [
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

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ar17301164:ARMMRrfa10@cluster0.pbiht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const phonecollection = client.db("onlinemobileshop").collection("phone");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/api', async(req, res) => {
const mobiles=await phonecollection.find({})
  res.json(mobiles);
});

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Backend is running!</h1>');
});

 const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

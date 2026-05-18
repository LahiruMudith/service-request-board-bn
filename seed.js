require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/service-request-board';

const sampleJobs = [
  {
    title: "Leaking kitchen tap needs urgent fix",
    description: "The cold water tap in my kitchen has been dripping constantly for two weeks. Water damage is starting on the cabinet below. Need a professional plumber ASAP.",
    category: "Plumbing",
    location: "Glasgow",
    status: "Open",
    contactName: "Sarah Mitchell",
    contactEmail: "sarah.m@example.com"
  },
  {
    title: "Rewire garden shed electrics",
    description: "Looking for a certified electrician to rewire my garden shed. Current wiring is old and potentially unsafe. Need new sockets, lighting and RCD protection.",
    category: "Electrical",
    location: "Edinburgh",
    status: "In Progress",
    contactName: "James Thornton",
    contactEmail: "j.thornton@example.com"
  },
  {
    title: "Full exterior house painting",
    description: "3-bed semi-detached house needing full exterior repaint. Render and woodwork. Paint supplied. Looking for competitive quotes.",
    category: "Painting",
    location: "Aberdeen",
    status: "Open",
    contactName: "Fiona Campbell",
    contactEmail: "fiona.c@example.com"
  },
  {
    title: "Custom kitchen cabinet installation",
    description: "Need a skilled joiner to install 8 flat-pack kitchen cabinets. Units already purchased from IKEA. Approximately one full day's work.",
    category: "Joinery",
    location: "Dundee",
    status: "Closed",
    contactName: "Robert Lang",
    contactEmail: "r.lang@example.com"
  },
  {
    title: "Bathroom ceiling replaster",
    description: "Damp has caused the bathroom ceiling plaster to crack and bubble. Needs stripped back and replastered. Small bathroom, approx 4m².",
    category: "Other",
    location: "Inverness",
    status: "Open",
    contactName: "Anna Reid",
    contactEmail: "anna.reid@example.com"
  },
  {
    title: "Install outdoor security lighting",
    description: "Require electrician to install 3 PIR security lights around the property. Cable running needed from garage consumer unit.",
    category: "Electrical",
    location: "Glasgow",
    status: "Open",
    contactName: "Colin Fraser",
    contactEmail: "c.fraser@example.com"
  },
  {
    title: "Assemble flat-pack bedroom furniture",
    description: "Need help assembling a new wardrobe, chest of drawers, and two bedside tables. All items are from Next Home.",
    category: "Joinery",
    location: "Stirling",
    status: "Open",
    contactName: "Laura Patterson",
    contactEmail: "laura.p@example.com"
  },
  {
    title: "Fix dripping shower head",
    description: "The shower head in the main bathroom continues to drip after being turned off. It's a mixer shower. Seems to be getting worse.",
    category: "Plumbing",
    location: "Edinburgh",
    status: "Open",
    contactName: "David Clark",
    contactEmail: "d.clark@example.com"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB for seeding.');

    // Clear existing data
    await JobRequest.deleteMany({});
    console.log('Cleared existing job requests.');

    // Insert new data
    await JobRequest.insertMany(sampleJobs);
    console.log(`Successfully inserted ${sampleJobs.length} sample jobs.`);

  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDatabase();

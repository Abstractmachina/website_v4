#! /usr/bin/env node
// 'This script populates submissions from a CSV file to your database.
// Specify csv file path as argument
// - e.g.: node populatedb "./data/submissions_test_230421.csv"'


// const csv = require('fast-csv');
import "./dotenv.js";
import mongoose from 'mongoose';
  
// Get arguments passed on command line
// const filepath = process.argv[2];

// const Submission = require("../../models/submission");
// const MediaContent = require("../../models/mediaContent");
// let submissions = [];

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const railwayMongo = process.env.DATABASE_URI;

  
const escapeApostrophy = '&apos';

// -------------	MAIN	-----------------------
main().catch((err) => console.log("main err: ",err));
  
async function main() {
  console.log("Debug: About to connect");
  // console.log(mongoDB);
  // mongoose.connect(mongoDB);
  console.log("connection URI:", railwayMongo);
  if (!railwayMongo) throw new Error("No railwayMongo connection string found in env");

  const db =await mongoose.connect(railwayMongo);
  console.log("Debug: Should be connected?");
  console.log("... Clearing database now ...");

  // const result1 = await Submission.deleteMany({});
  // const result2 = await MediaContent.deleteMany({});
  console.log(db.connection.readyState);



  // await importSubmissions(filepath);
  console.log("deletion results:");
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

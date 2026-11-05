const mongoose = require("mongoose");
require('dotenv').config();

main().catch((err) => console.log(err));

async function main() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = process.env.DB_PORT || '27017';
  const dbName = process.env.DB_NAME || 'workshop01';

  const uri = `mongodb://${host}:${port}/${dbName}`;

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(">>> MongoDB Connection Failed: <<<", err.message);
  }
}
import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("\n📡📡📡[MongoDB_Atlas Connected]📡📡📡");
} catch (error) {
  console.log("🌋🌋🌋" + error);
}

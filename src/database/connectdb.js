import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("\n📡📡📡[MongoDB_Atlas Connected]📡📡📡");
} catch (error) {
  console.log("🌋🌋🌋" + error);
}

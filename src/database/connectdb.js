import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("\nš”š”š”[MongoDB_Atlas Connected]š”š”š”");
} catch (error) {
  console.log("ššš" + error);
}

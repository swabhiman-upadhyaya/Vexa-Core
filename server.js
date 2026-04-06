import "dotenv/config";

import app from "./src/app.js";
import connectDB from './src/config/database.js';
import { testAi } from "./src/services/ai.services.js";

const PORT = process.env.PORT || 3000;

testAi();

connectDB()
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
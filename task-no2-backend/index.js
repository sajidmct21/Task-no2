import express from "express";
import env from "dotenv";
import cors from "cors";
import dbConnection from "./dbconnection/dbConnection.js";
import userRouter from "./routes/user.route.js";
import vendorRouter from './routes/vender.route.js'
import quotationRequestRouter from './routes/quotationRequest.routes.js'
import vendorAssignmentRouter from './routes/vendorAssignment.routes.js'
import quotationRouter from './routes/quotation.routes.js'
import activityLogRouter from './routes/activityLog.routes.js'

import dns from "node:dns/promises";   
dns.setServers(["1.1.1.1", "1.0.0.1"]);   

const app = express();
env.config();
app.use(cors());

app.use(express.json());

// app.use("/", (req, res) => {
//   res.send("Welcome to backend");
// });

// Routers
app.use("/api/user", userRouter);
app.use("/api/vendors",vendorRouter)
app.use("/api/quotation-request",quotationRequestRouter)
app.use("/api/vendor-assignment", vendorAssignmentRouter)
app.use("/api/quotation", quotationRouter)
app.use("/api/activity-log",activityLogRouter)





// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

// port
const port = process.env.PORT || 8000;

// db connection function
dbConnection();

// listen function
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

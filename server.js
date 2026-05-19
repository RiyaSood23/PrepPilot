const http = require("http");

const express = require("express");
require("dotenv").config({ 
  path: "./.env"
 });

console.log("ENV:", process.env.MONGODB_URI);
console.log("SESSION:", process.env.SESSION_SECRET);

const errorHandler = require("./middlewares/error");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const connectDB = require("./config/db");

const companyRoutes = require("./routes/company.routes");
const studentRoutes = require("./routes/student.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require("./routes/auth.routes");
const viewRoutes = require("./routes/view.routes");


// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);
app.use(express.static("public"));


// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

app.use("/", viewRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("PrepPilot Server Running");
});


// 404
app.use((req, res) => {
  res.status(404).json({
    success:false,
    message:"Route not found"
  });
});

app.use(errorHandler);



const server = http.createServer(app);

const io = require("socket.io")(server,{
   cors:{
      origin:"*"
   }
});


io.on("connection",(socket)=>{

   console.log("User connected");

   socket.on("newApplication",(data)=>{

      io.emit("applicationUpdated",data);

   });

   socket.on("disconnect",()=>{

      console.log("User disconnected");

   });

});


const startServer = async () => {

   await connectDB();

   server.listen(PORT,()=>{

      console.log(`Server running on ${PORT}`);

   });

};



startServer();
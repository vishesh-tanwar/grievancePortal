const express = require("express");
require('./db/conn');
const Router=require('./router/auth');
const port = 5000;
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");

const app = express();
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.use(cookieParser());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    );
    next();
})
app.use(express.json());
app.use(Router);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});



// const express = require("express");
// const cookieParser = require("cookie-parser");
// const authRouter = require("./router/auth");
// const port = 5000;
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     next();
// });

// // Routes
// app.use("/", authRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send("Something went wrong!");
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`App is listening on port ${port}`);
// });

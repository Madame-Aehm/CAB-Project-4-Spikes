import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { getActiveUser, login, register } from "./utils/controllers.js";
import cookieAuth from "./utils/cookieAuth.js";
import 'dotenv/config'

const app = express();

const connectMiddlewares = () => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: process.env.CLIENT_BASEURL, // here we can add the client base url to our env file
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
  app.use(cors(corsOptions));
}

const connectDatabase = async() => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
  });
}

const defineRoutes = () => {
  app.post("/register", register);
  app.post("/login", login);
  app.get("/active", cookieAuth, getActiveUser);
  app.post("/update", cookieAuth, (req, res) => {
    res.send("This GET endpoint must be authorized");
  })

  app.get("/test", (req, res) => res.send("Testing something. Here is a <a href='/somewhere'>link to somewhere...</a>"))
  app.get("/somewhere", (req, res) => res.send("This is Somewhere!"))
}

// const cookieDocsSnippet = () => {
//   app.get('/', function(req, res){
//     if (req.cookies.remember) {
//       res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
//     } else {
//       res.send('<form method="post"><p>Check to <label>'
//         + '<input type="checkbox" name="remember"/> remember me</label> '
//         + '<input type="submit" value="Submit"/>.</p></form>');
//     }
//   });
  
//   app.get('/forget', function(req, res){
//     res.clearCookie('remember');
//     res.redirect('back');
//   });
  
//   app.post('/', function(req, res){
//     var minute = 60000;
//     if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
//     res.redirect('back');
//   });
// }

connectMiddlewares();
defineRoutes();
// cookieDocsSnippet();
connectDatabase();



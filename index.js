import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { authMiddleware } from "./middleware/isSignedIn.js";

dotenv.config();
import debug from 'debug';
const debugServer = debug('app:Server');
import bcrypt from 'bcrypt';
import { toNodeHandler } from "better-auth/node";
import { registerUser, getAccountByEmail, getAccountByUsername, getAccounts } from './database.js'
import { validate } from './middleware/joiValidator.js';
import { registerSchema } from './validation/schema.js'
import auth from './auth.js'
import userRoutes from "./routes/api/users.js";


const app = express();

// Get the directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(join(__dirname, 'AnimeTracker/dist')));
const port = process.env.PORT || 8080;

//login: POST /api/auth/sign-in/email
//Signup: POST /api/auth/sign-up/email
//get session: GET /api/auth/get-session
//logout: POST /api/auth/sign-out
app.all("/api/auth/*splat", toNodeHandler(auth))
app.use("/api", userRoutes);



app.listen(port, () => {
  debugServer(`Server is now running on http://localhost:${port}`)
});

// app.post('/signup', validate(registerSchema), async (req, res) => {
//   try {
//     const newAccount = req.body;
//     const email = newAccount.email;
//     const username = newAccount.username;
//     if (await getAccountByEmail(email)) {
//       return res.status(400).json({message: 'Email already in use'})
//     }
//     if (await getAccountByUsername(username)) {
//       return res.status(400).json({message: 'Username already in use'})
//     }
//     newAccount.password = await bcrypt.hash(newAccount.password, 10)
//     newAccount.creationDate = new Date();
//     newAccount.lists = [];
//     newAccount.reviews = [];
//     newAccount.profilePic = './animeTracker/public/Portrait_Placeholder.png' || null;
//     newAccount.followedAccounts = [];
//     newAccount.instagramAccountLink = null;
//     newAccount.facebookAccountLink = null;
//     newAccount.tiktokAccountLink = null;
//     delete newAccount.confirmPassword;
//     const result = await registerUser(newAccount)
//     if (result.insertedId) {
//       res.status(201).json({ id: result.insertedId, ...newAccount })
//     } else {
//       res.status(500).json({error: 'Error adding user' })
//     }
//   } catch (error) {
//     res.status(500).json({error: 'server error'})
//   }
// });

app.get('/getAccounts', async (req,res) => {
  try {
    const accounts = await getAccounts()
    if (!accounts) {
       res.status(500).json({error: 'error retrieving users'})
    }else {
       res.status(200).json(accounts)
    }
  }catch (error) {
    return res.status(500).send('server error')
  }
});



// Serve index.html for any routes that don't match API endpoints
app.get(['/signin', '/signup', '/discover', '/', '/show/:id'], (req, res) => {
  res.sendFile(join(__dirname, 'AnimeTracker/dist/index.html'));
});


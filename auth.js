import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, connect } from "./database.js"


const client = await getClient();
const db = await connect();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8080",
  trustedOrigins: ["http://localhost:5173", "http://localhost:8080","http://localhost:3000"],
    database: mongodbAdapter(db, {
      client
    }),
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      username: {
        type:"string",
        required: false
      },
      lists: {
        type: "object",
        required: false,
        defaultValue: [
          {
            name: "Watchlist",
            shows: []
          },
          {
            name: "Reviews",
            shows: []
          }
        ]
      },
      reviews: {
        type: "object",
        required: false,
        defaultValue: []
      },
      profilePic: {
        required: false,
        defaultValue:  'Portrait_Placeholder.png' || null,
      },
      followedAccounts: {
        type: "object",
        required: false,
        defaultValue: []
      },
      instagramAccountLink: {
        type: "string",
        required: false,
        defaultValue: ''
      },
      facebookAccountLink: {
        type: "string",
        required: false,
        defaultValue: ''
      },
      tiktokAccountLink: {
        type: "string",
        required: false,
        defaultValue: ''
      }
    }

  }

});


export default auth
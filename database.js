import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from "mongodb";
import debug from 'debug';
const debugDb = debug('app:Database')

let _db = null;
let _client = null;

async function connect() {
  if (!_db) {
    const dbUrl = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    _client = await MongoClient.connect(dbUrl)
    _db = _client.db(dbName);
    debugDb('connected.')
  }
  return _db;
}

async function registerUser(user){
  const db = await connect();
  user._id = new ObjectId();
  return db.collection('Accounts').insertOne(user)
}

async function getAccountByEmail(email) {
  const db = await connect();
  return db.collection('user').findOne({email:email})
}

async function getAccountByUsername(username) {
  const db = await connect();
  const user = await db.collection('Accounts').findOne({username:username})
}

async function getAccounts() {
  const db = await connect()
  return db.collection('user').find().toArray();
}

async function searchUserById(userId) {
  const db = await connect()
  debugDb("connected")
  return db.collection('user').find({_id: userId})
}

async function addToList(userId, show, listName) {
  const db = await connect();
  return db.collection('user').updateOne({ "_id": new ObjectId(userId), "lists.name": listName }, {$push: { "lists.$.shows": show }});

}

async function createList(userId, listName) {
  const db = await connect();
  return db.collection('user').updateOne({"_id": new ObjectId(userId)}, {$push: { lists: { name: listName, shows: []}}});
}

async function getClient(){ 
  if (!_client){
    await connect();
  }
  return _client;
}
export { registerUser, getAccountByEmail, getAccountByUsername, getAccounts, getClient, connect, searchUserById, addToList, createList }
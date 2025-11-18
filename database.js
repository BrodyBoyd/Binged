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

async function deleteList(userId, listName) {
  const db = await connect();
  return db.collection('user').updateOne({ _id: new ObjectId(userId)},{ $pull: { lists: { name: listName}}});
}

async function getClient(){ 
  if (!_client){
    await connect();
  }
  return _client;
}

async function createReview(userId, review) {
  const db = await connect()
  review.reviewId = new ObjectId()
  db.collection('reviews').insertOne(review)
  return db.collection('user').updateOne({"_id": new ObjectId(userId)}, {$push: { reviews: review }})
}

async function deleteReview(userId, reviewId) {
  const db = await connect()
  const reviewObjectId = new ObjectId(reviewId)

  db.collection('reviews').deleteOne({ reviewId: reviewObjectId })
  return db.collection('user').updateOne({"_id": new ObjectId(userId)}, {$pull: { reviews: { reviewId: reviewObjectId } }})
}
export { registerUser, getAccountByEmail, getAccountByUsername, deleteList, getAccounts, deleteReview, getClient, connect, searchUserById, addToList, createList, createReview }
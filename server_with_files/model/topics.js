'use strict'

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";     
const client = new MongoClient(uri)

async function connectDB() {
  try {
    await client.connect();
    await client.db("topics-list").command({ ping: 1 });
    console.log("Connected successfully to database");
  } catch (error) {
    console.log(error)
  }
}

const Topics = client.db("topics-list").collection('topics')

const getTopicsM = async () => {
  return Topics.find().toArray();
};

const addTopicM = (topic) => {
  return Topics.insertOne(topic)
};

const deleteTopicM = (id) => {
  return Topics.deleteOne({"_id": ObjectId(id)})
};

const upvoteTopicM = (id) => {
  return Topics.updateOne({"_id": ObjectId(id)}, {$inc: {score: 1}} )
};

const downvoteTopicM = (id) => {
  return Topics.updateOne({"_id": ObjectId(id)}, {$inc: {score: -1}} )
};


module.exports = {connectDB, getTopicsM, addTopicM, deleteTopicM, upvoteTopicM, downvoteTopicM}

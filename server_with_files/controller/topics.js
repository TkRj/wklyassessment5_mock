"use strict";

const { getTopicsM, addTopicM, deleteTopicM, upvoteTopicM, downvoteTopicM } = require("../model/topics");
const uuid = require("uuid");

const getTopics = async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = await getTopicsM();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

const postTopic = async (ctx) => {
  try {
    const title = ctx.request.body.title;
    const date = new Date();
    const topic = {
      title: title,
      published_at: date,
      score: 0,
    };
    ctx.status = 201;
    const res = await addTopicM(topic);
    const id = res.insertedId
    const dbTopic = {
      _id: id,
      title: title,
      published_at: date,
      score: 0,
    }
    ctx.body = dbTopic;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};
const deleteTopic = async (ctx) => {
  try {
    const id = ctx.params.id
    ctx.status = 200;
    ctx.body = await deleteTopicM(id);
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};
const upvoteTopic = async (ctx) => {
  try {
    const id = ctx.params.id
    ctx.status = 200;
    ctx.body = await upvoteTopicM(id);
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};
const downvoteTopic = async (ctx) => {
  try {
    const id = ctx.params.id
    ctx.status = 200;
    ctx.body = await downvoteTopicM(id);
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

module.exports = {
  getTopics,
  postTopic,
  deleteTopic,
  upvoteTopic,
  downvoteTopic,
};

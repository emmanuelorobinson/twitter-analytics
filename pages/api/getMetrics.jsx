import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.BEARER_TOKEN);

const storeToJSON = (data) => {
  let json = {};

  // console.log(data);

  for (let i = 0; i < data.length; i++) {

    let tweet = data[i];
    let tweetId = tweet.id;

    json[tweetId] = {
      id: tweetId,
      created_at: tweet.created_at,
      author_id: tweet.author_id,
      like_count: tweet.public_metrics.like_count,
      quote_count: tweet.public_metrics.quote_count,
      reply_count: tweet.public_metrics.reply_count,
      retweet_count: tweet.public_metrics.retweet_count,
      source: tweet.source,
      text: tweet.text,
      hashtag: tweet.entities.hashtags,
    };

  }
  // save to json file

  //define fs
  const fs = require("fs");

  fs.writeFileSync("././data/tweets.json", JSON.stringify(json));

  res.status(200);

};

export default async function handler(req, res) {
  // get twitter data using user id from query
  // Top tweet types
  // Top content type
  // Time of tweet
  // Most retweeted user by count of the current user
  // Top hashtag by count of the current user

  try {
    const { username } = req.query;

    //retrive full archive of tweets for user

    // const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:TwitterDev`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    //   },
    // });

    const endpointUrl = `https://api.twitter.com/2/tweets/search/recent`;

    const params = {
      query: `from:${username} -is:retweet`,
      "tweet.fields": "created_at,author_id,public_metrics,source,entities",

    };

    const response = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.body;

    storeToJSON(data.data);

    res.send(data.data);
  } catch (error) {

    console.log(error);

  }
}

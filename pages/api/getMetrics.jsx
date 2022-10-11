import { Client } from "twitter-api-sdk";
import needle from "needle";
import path from "path";
import {promises as fs} from 'fs'

const client = new Client(process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN);

const jsonDirectory = path.join(process.cwd(), "json");

const storeToJSON = async (data) => {
  let json = {};

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

  // const fs = require("fs");
  // fs.writeFileSync("././data/tweets.json", JSON.stringify(json));
  await fs.writeFile(jsonDirectory + "/tweets.json", JSON.stringify(json), (err) =>  {
    if (err) {
      console.log(err);
    }
  });
};

const metrics = {
  username: "",
  followers_count: 0,
  following_count: 0,
  tweet_count: 0,
  topSource: {},
  tweetWithMostLikes: "",
  topHashtag: {},
};

const getTopSource =  (data) => {

  //parse json
  const json = JSON.parse(data);

  const sources = {};

  for (let tweet in json) {
    let tweetMetrics = json[tweet];

    //get source and increment count
    let source = tweetMetrics.source;

    console.log(source);

    if (sources[source] === undefined) {
      sources[source] = 1;
    } else {
      sources[source]++;
    }
  }

  //get most frequent source
  metrics.topSource = sources;
};

const getTopHashtag =  (data) => {
  //parse json
  const json = JSON.parse(data);

  const hashtags = {};

  for (let tweet in json) {
    let tweetMetrics = json[tweet];

    //get hashtags and increment count
    let hashtag = tweetMetrics.hashtag || [];

    // ignore hashtags that are empty
    if (hashtags.length === 0) {
      continue;
    } else {
      hashtag.forEach((tag) => {
        console.log(tag.tag);

        if (hashtags[tag.tag] === undefined) {
          hashtags[tag.tag] = 1;
        } else {
          hashtags[tag.tag]++;
        }
      });
    }

    metrics.topHashtag = hashtags;
  }
};
const getUserInfo =  async() => {

  const data = await fs.readFile(jsonDirectory + "/user.json", "utf8");


  const json = JSON.parse(data);

  // get user data
  metrics.username = json[Object.keys(json)[0]].username;
  metrics.followers_count = json[Object.keys(json)[0]].followers_count;
  metrics.following_count = json[Object.keys(json)[0]].following_count;
  metrics.tweet_count = json[Object.keys(json)[0]].tweet_count;
};

const getTopTweet =  (data) => {

  //parse json
  const json = JSON.parse(data);

  //loop through json and get metrics
  const tweetCount = {
    tweet: "",
    like_count: 0,
  };

  for (let tweet in json) {
    let tweetMetrics = json[tweet];

    const date = new Date(tweetMetrics.created_at);

    //get source and increment count
    let like_count = tweetMetrics.like_count;

    if (tweetCount.like_count < like_count) {
      tweetCount.tweet = tweetMetrics.text;
      tweetCount.like_count = like_count;
    }
  }

  metrics.tweetWithMostLikes = tweetCount.tweet;
};

export default async function handler(req, res) {
  try {
    const { username } = req.query;

    const endpointUrl = `https://api.twitter.com/2/tweets/search/recent`;

    const params = {
      query: `from:${username} -is:retweet`,
      "tweet.fields": "created_at,author_id,public_metrics,source,entities",
    };

    const response = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
      },
    });

    const data = await response.body;

    storeToJSON(data.data);

    const localData = await fs.readFile(jsonDirectory + "/tweets.json", "utf8");

    getTopSource(localData);
    getTopHashtag(localData);
    getTopTweet(localData);
    getUserInfo(localData);

    // console.log(metrics);

    // const fs = require("fs");
    // fs.writeFileSync("././data/tweetdata.json", JSON.stringify(metrics));
    await fs.writeFile(
      jsonDirectory + "/tweetdata.json",
      JSON.stringify(metrics), (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    // return json;
    res.status(200).json(metrics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

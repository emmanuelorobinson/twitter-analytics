import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.TWITTER_BEARER_TOKEN);

const storeToJSON = (data) => {
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

  const fs = require("fs");
  fs.writeFileSync("././data/tweets.json", JSON.stringify(json));
};

const metrics = {
  username: "",
  followers_count: 0,
  following_count: 0,
  tweet_count: 0,
  topSource: [],
  tweetWithMostLikes: "",
  topHashtag: [],
};

const getTopSource = () => {
  // loop through tweets.json and get metrics

  //get most frequent source

  //open json file and get data
  const fs = require("fs");
  const data = fs.readFileSync("././data/tweets.json");

  //parse json
  const json = JSON.parse(data);

  //loop through json and get metrics

  const sourceCount = {
    source: "",
    count: 0,
  };

  for (let tweet in json) {
    let tweetMetrics = json[tweet];

    // console.log(tweetMetrics);

    //get source and increment count
    let source = tweetMetrics.source;

    if (sourceCount.source === source) {
      sourceCount.count++;
    } else {
      sourceCount.source = source;
      sourceCount.count = 1;
    }
  }

  //get most frequent source
  metrics.topSource = sourceCount;
};

const getUserInfo = () => {

  const fs = require("fs");
  const data = fs.readFileSync("././data/user.json");
  const json = JSON.parse(data);

  // get user data  
  metrics.username = json[Object.keys(json)[0]].username;
  metrics.followers_count = json[Object.keys(json)[0]].followers_count;
  metrics.following_count = json[Object.keys(json)[0]].following_count;
  metrics.tweet_count = json[Object.keys(json)[0]].tweet_count;
}

const getTopTweet = () => {
  //loop through tweets.json and get tweet with most likes

  //get most liked tweet

  //open json file and get data
  const fs = require("fs");

  const data = fs.readFileSync("././data/tweets.json");

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
    //console.log(date.getUTCHours());

    // console.log(tweetMetrics);

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
        authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    const data = await response.body;

    storeToJSON(data.data);

    getTopSource();
    getTopTweet();
    getUserInfo();

    console.log(metrics);
    

    const fs = require("fs");

    fs.writeFileSync("././data/tweetdata.json", JSON.stringify(metrics));

    // return json;
    res.status(200).json(metrics);

  } catch (error) {
    console.log(error);
  }
}

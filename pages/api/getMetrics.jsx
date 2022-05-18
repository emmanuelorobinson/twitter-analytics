import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.BEARER_TOKEN);

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
      "tweet.fields": "created_at,author_id,public_metrics,source"

    };

    const response = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.body;

    res.send(data.data);
  } catch (error) {

    console.log(error);

  }
}

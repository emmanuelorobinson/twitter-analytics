import { Client } from "twitter-api-sdk";

const client = new Client(process.env.BEARER_TOKEN);

export default async function handler(req, res) {
  // get twitter data using user id from query
  // Top tweet types
  // Top content type
  // Time of tweet
  // Most retweeted user by count of the current user
  // Top hashtag by count of the current user

  try {
    const { id } = req.query;

    //retrive full archive of tweets for user

    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:TwitterDev`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.json();

    res.send(data.data);

  } catch (error) {
    console.log(error);
  }
}

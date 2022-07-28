import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.TWITTER_BEARER_TOKEN);

const storeToJSON = (data) => {
  let json = {};

  console.log(data);

  let userId = data.id;

  console.log(userId);

  json[data.username] = {
    id: userId,
    username: data.username,
    followers_count: data.public_metrics.followers_count,
    following_count: data.public_metrics.following_count,
    tweet_count: data.public_metrics.tweet_count,
    listed_count: data.public_metrics.listed_count,
  };
  // save to json file

  //define fs
  const fs = require("fs");

  fs.writeFileSync("././data/user.json", JSON.stringify(json));

  // return json;
};

export default async function handler(req, res) {
  try {
    const { user } = req.query;
    // const response = await client.users.findUserByUsername(user);

    // const response = await fetch(`https://api.twitter.com/2/users/by/username/${user}`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    //   },
    // });

    const endpointUrl = `https://api.twitter.com/2/users/by/username/${user}`;

    const params = {
      "user.fields": "public_metrics",
    };

    const response = await needle("get", endpointUrl, params, {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    // console.log(response);
    const data = await response.body;

    storeToJSON(data.data);

    res.send(data.data);
  } catch (error) {
    console.log(error);
  }
}

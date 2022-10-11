import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN);

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
    profile_image_url: data.profile_image_url,
  };
  // save to json file

  //define fs
  const fs = require("fs");

  // navigate to the directory where the file is located
  fs.writeFileSync("././data/user.json", JSON.stringify(json));
  //print current directory

  // return json;
};

export default async function handler(req, res) {
  try {
    const { user } = req.query;
  
    const endpointUrl = `https://api.twitter.com/2/users/by/username/${user}`;

    const params = {
      "user.fields": "public_metrics,profile_image_url",
    };

    const response = await needle("get", endpointUrl, params, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
      },
    });

    //do the same thing using fetch include params
    // const response = await fetch(endpointUrl, params, {
    //   headers: {
    //     authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
    //   },
    // });


    // console.log(response);
    const data = await response.body;

    storeToJSON(data.data);

    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

import { Client } from "twitter-api-sdk";
import needle from "needle";
import path from 'path';
import { promises as fs } from 'fs';

const client = new Client(process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN);

const storeToJSON = async (data) => {
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
  const jsonDirectory = path.join(process.cwd(), 'data');
  

  await fs.writeFile(jsonDirectory + '/user.json', JSON.stringify(json), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('file saved');
    }
  });

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

    res.send(data.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

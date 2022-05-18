import { Client } from "twitter-api-sdk";
import needle from "needle";

const client = new Client(process.env.BEARER_TOKEN);

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
        authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    // console.log(response);
    const data = await response.body;
    console.log(data);

    res.send(data.data);

  } catch (error) {
    console.log(error);
  }
}

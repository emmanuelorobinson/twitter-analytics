import { Client } from "twitter-api-sdk";

const client = new Client(process.env.BEARER_TOKEN);

export default async function handler(req, res) {
  try {
    const { user } = req.query;
    // const response = await client.users.findUserByUsername(user);

    const response = await fetch(`https://api.twitter.com/2/users/by/username/${user}`, {
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

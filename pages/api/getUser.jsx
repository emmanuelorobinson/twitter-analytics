import { Client } from "twitter-api-sdk";

const client = new Client(process.env.BEARER_TOKEN);

export default async function handler(req, res) {
  try {
    const { user } = req.query;
    const response = await client.users.findUserByUsername(user);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}

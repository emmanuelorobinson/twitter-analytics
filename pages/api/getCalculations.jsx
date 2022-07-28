

const metrics = {
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

}

export default async function handler(req, res) {


  try {

    //get metrics
    getTopSource();
    getTopTweet();

    // console.log(metrics);

    //define fs
    const fs = require("fs");

    fs.writeFileSync("././data/tweetdata.json", JSON.stringify(metrics));

    // return json;
    res.status(200);

  }
  catch (err) {
    console.log(err);
  }

}
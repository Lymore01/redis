const bodyParser = require("body-parser");
const express = require("express");
const redis = require("redis");
const app = express();
const port = 3300;


// create redis client
const client = redis.createClient();


// middlewares
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  // set data in redis
  client.set("key", "value", (err, reply) => {
    if (err) {
      console.log(err);
      client.quit(); // Close client on error
      return res.status(500).json({ message: "Error setting data!" });
    }
    // get data
    client.get("key", (err, data) => {
      if (err) {
        console.error(err);
        client.quit(); //close the client on error

        return res.status(400).json({ message: "No data found" });
      }
      client.quit(); //close the client after operations
      return res.status(200).json({ data });
    });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

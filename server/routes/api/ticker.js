const request = require("request-promise");

const ticker = cache => (req, res) => {
  const { convert } = req.query;

  cache.get(`ticker-${convert}`, (err, value) => {
    if (value) {
      res.send(value);
    } else {
      let start = new Date().getTime();
      request
        .get(
          `https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=${convert
            ? convert.toUpperCase()
            : ""}`
        )
        .then(json => {
          console.log("done");
          console.log((new Date().getTime() - start) / 10000);

          cache.set(`ticker-${convert}`, json, 120, (err, v) => {
            if (err) {
              console.log(err);
            }
            res.send(json);
          });
        });
    }
  });
};

module.exports = { ticker };

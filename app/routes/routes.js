module.exports = function(app) {
  app.get("/", (req, res) => res.send("Hello World!"));

  app.get("/nama/:saya?", (req, res) => {
    if (req.params.saya) {
      res.send(`Hello ${req.params.saya}`);
    } else {
      res.send("Hello User");
    }
  });
};

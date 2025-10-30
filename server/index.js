require("dotenv").config();
require("./src/service/cronjob");
const express = require("express"),
  appRoutes = require("./src/routes/appRoutes"),
  credentials = require("./src/middleware/credentials"),
  corsOptions = require("./src/config/corsOptions"),
  cors = require("cors"),
  helmet = require("helmet"),
  logger = require("morgan"),
  { connectToDatabase } = require("./src/loaders/mongodb"),
  http = require("http"),
  app = express(),
  port = 5000,
  server = http.createServer(app);

connectToDatabase();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.gstatic.com"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
      ],

      connectSrc: ["'self'", "https://rct-prince.netlify.app"],
      objectSrc: ["'none'"],
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(logger("dev"));
app.use(credentials);
app.use(appRoutes);
server.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port ${port}  🧠`);
});

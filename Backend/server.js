const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

// Process Env
const DB = config.MONGO_URI;
const PORT = config.LISTEN_PORT;

// Connect to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database data connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

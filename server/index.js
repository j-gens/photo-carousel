const express = require('express');
const app = express();


app.use(express.static('public'));






//set up for future deployment:
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3100;
}
app.listen(port, () => console.log(`App is listening on port ${port}`));

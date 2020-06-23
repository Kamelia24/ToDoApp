const express = require('express');
const app = express();
const Router = require('./router.js');
app.use(express.static(__dirname + '/public'));
app.use(Router);
let port=4000;
app.listen(port,()=>{console.log(`Node JS API is listening on port: ${port}`);});

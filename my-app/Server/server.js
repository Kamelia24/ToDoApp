const express = require('express');
const app = express();
const Router = require('./router.js');
var cors = require('cors');
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(Router);
let port=5000;
app.listen(port,()=>{console.log(`Node JS API is listening on port: ${port}`);});

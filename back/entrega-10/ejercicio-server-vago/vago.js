const express = require("express");

const app = express();

app.get('/', (request, response, next) => {
  const now = new Date();
  if(now.getMinutes()%2 === 0){
    next();
  }else{
    next(new Error('Estoy durmiendo'));
  }
});

// Error middleware
app.use((error, resquest, response, next))=> {
response.status(500).send(error.message);
});

// Not found
app.use((error, resquest, response, next) => {
  response.status(404).send('not found');
});

app.listen(3000, () => {
  console.log('error');
})
require('dotenv').config
const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const starRoute = require('./src/routes/starRoute');
const tonRoute = require('./src/routes/tonRoute');
const dbConnect = require('./src/config/dbConnection');

const port = process.env.APP_PORT || 6100

app.use(express.json()); // for application/json 
app.use(express.urlencoded({ extended: true })); 

// app.use(cookieParser())

// app.set('view engine', 'ejs')

app.use('/star', starRoute);
app.use('/ton', tonRoute);

app.get('/', (req, res) => {
  res.send('✅ Starflux backend is up and running!');
});


dbConnect().then()
.catch(e => console.log(e))

app.use(express.static(path.join(__dirname, '/public')))

app.listen(port, () => { 
  console.log(`Server started  successfully ${port}`)
})
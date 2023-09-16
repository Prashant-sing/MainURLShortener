const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.set('strictQuery', true);

const db = 'mongodb+srv://himanshu852279:Eatshit123@cluster0.xzp9cgs.mongodb.net/ShortURL?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(db,{    
}).then(()=>{
   console.log("Connected");
}).catch((err)=>{
   console.log(err);
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 8000);
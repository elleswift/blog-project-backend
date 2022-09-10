import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI       =   process.env.MONGO_URI
const client    =   new MongoClient(URI)
const database  =   client.db('blog-project-backend')
const articles  =   database.collection('articles')

client.connect()
console.log('Mongo working')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => console.log("Listening on 4000"))

app.get('/get-articles', async (req, res) => {                    
const allArticles = await articles.find().toArray()
res.json(allArticles)
})

app.post('/add-article', async (req, res) => {
 await articles.insertOne(req.body)
  res.json('Entry added')
})

app.delete('/remove-article', async (req, res) => {
  console.log(req.query)
  await articles.findOneAndDelete(req.query)
 res.json('Entry deleted')
})
 


app.put('/update-article', async (req, res) => {
  // find Article that you wnat to update
  // set desried key to variable
  // set the req.boby.title to the article title
  articles.findOneAndUpdate(req.query, { $set: req.body })
   res.json('Entry updated')
})  
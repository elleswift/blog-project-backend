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

app.listen(PORT, () => console.log("Listening on 4000"))

app.get('/', async (req, res) => {                    
const allArticles = await articles.find().toArray()
res.json(allArticles)
})

app.post('/', async (req, res) => {
 await articles.insertOne(req.body)
  res.json('Entry added')
})

app.delete('/', async (req, res) => {
  console.log(req.query)
  await articles.findOneAndDelete(req.query)
 res.json('Entry deleted')
})


app.put('/', async (req, res) => {
  articles.findOneAndUpdate(req.query, { $set: req.body })
   res.json('Entry updated')
})  
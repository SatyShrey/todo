
import express, { urlencoded, json } from "express"
const app=express()
import cors from "cors"
app.use(cors({}))
app.use(urlencoded({extended:true}))
app.use(json())

import { config } from 'dotenv';
config();

import { MongoClient as mongoClient } from "mongodb"
let conStr=process.env.url

mongoClient.connect(conStr).then(clientObject => {
    const database=clientObject.db('todo');
    app.get('/', (req, res) => {
        res.send('Welcome to To-Do API 6060.');
        res.end();
    })

    app.post('/add', (req, res) => {
        const note=req.body
        database.collection('notes').insertOne(req.body).then(()=>{
            database.collection('notes').find({email:note.email}).toArray().then(notes=>{
                res.send(notes)
                res.end()
            })
        })
    })

    app.post('/notes',(req,res)=>{
        database.collection('notes').find(req.body).toArray().then(notes=>{
            res.send(notes)
            res.end()
        })
    })

    app.delete('/remove/:email/:id', (req, res) => {
        const note={id:req.params.id,email:req.params.email}
        database.collection('notes').deleteOne(req.body).then(()=>{
            database.collection('notes').find({email:note.email}).toArray().then(notes=>{
                res.send(notes)
                res.end()
            })
        })
    })

})

app.listen(6060,()=>{console.log('api activated port:6060')})
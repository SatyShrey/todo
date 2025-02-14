
import express, { urlencoded, json } from "express"
const app=express()
import cors from "cors"
app.use(cors({}))
app.use(urlencoded({extended:true}))
app.use(json())

import { MongoClient as mongoClient } from "mongodb"
let conStr='mongodb+srv://sndsatya:QtAy7QbfwCnzUhvu@clustersnd.adfao0n.mongodb.net'

mongoClient.connect(conStr).then(clientObject => {
    const database=clientObject.db('todo');
    app.get('/', (req, res) => {
        res.send('Welcome to To-Do API 6060.');
        res.end();
    })

    app.post('/add', (req, res) => {
        database.collection('notes').insertOne(req.body);
        res.end();
    })

    app.get('/notes/:id',(req,res)=>{
        database.collection('notes').find({email:req.params.id}).toArray().then(notes=>{
            res.send(notes)
            res.end()
        })
    })

    app.delete('/remove/:id/:email', (req, res) => {
        var id = req.params.id;
        var email=req.params.email
        database.collection('notes').deleteOne({ id: id,email:email });
        res.send("Deleted")
    })

})

app.listen(6060,()=>{console.log('api activated port:6060')})
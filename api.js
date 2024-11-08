
const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mongoClient=require("mongodb").MongoClient
let conStr='mongodb+srv://sndsatya:QtAy7QbfwCnzUhvu@clustersnd.adfao0n.mongodb.net'

mongoClient.connect(conStr).then(clientObject => {
    const database=clientObject.db('todo');
    app.get('/', (req, res) => {
        res.send('Welcome to Note API.')
    })
})

app.listen(6060,()=>{console.log('api activated')})
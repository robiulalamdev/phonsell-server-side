const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


//Middleware
app.use(cors())
app.use(express.json())




const uri = process.env.DB_ACCESS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);
async function run() {
    try {
        const categoriesCollection = client.db('phonsell').collection('categories')
        const usersCollection = client.db('phonsell').collection('users')

        // signup to set users
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        });

        // categories
        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await categoriesCollection.find(query).toArray()
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Phonsell Server is running')
})

app.listen(port, () => {
    console.log(`Phonsell server Running on ${port}`)
})
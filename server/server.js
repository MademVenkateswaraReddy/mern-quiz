import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import router from './router/route.js'
import connect from './database/conn.js'

const app = express()

app.use(morgan('tiny'))
app.use(cors(
    {
        origin: ["http://deploy-mern-quiz-vercel-app"],
        methods: ['POST', 'GET', 'DELETE'],
        credentials: true
    }
))
app.use(express.json())
config();
const port = process.env.PORT || 8080

app.use('/api', router)

app.get('*', (req, res)=>{
    try {
        res.json('Get Request')
    } catch (error) {
        res.json(error)
    }
})

connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log('Can not connect to the server')
    }
}).catch(error =>{
    console.log('Invalid Database connection')
})

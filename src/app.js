import express from 'express'

import employeesRouter from './routes/employees.routes.js'
import indexRouter from './routes/index.routes.js'

import './config.js'

const app = express()

app.use(express.json())

app.use('/api',employeesRouter);
app.use('/api',indexRouter);
app.use((req,res,next)=>{
    res.status(404).json({
        "message":"endpoint not found",
    })
})
export default app

// import dotenv from 'dotenv'
// dotenv.config()

// import mongoose from 'mongoose'
// mongoose.connect(process.env.DB!)

// import express from 'express'
// import cors from 'cors'
// import AuthRouter from './router/auth.router'
// import cookieParser from 'cookie-parser'
// const app = express()
// app.listen(process.env.PORT || 8080,
//     ()=> console.log(`server is running on  ${process.env.PORT}`)
// )

// app.use(cors({
//     origin: process.env.CLIENT,
//     credentials: true
// }))
// app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// app.use("/auth" , AuthRouter)





import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import cors from 'cors'
import AuthRouter from './router/auth.router'
import cookieParser from 'cookie-parser'
import StorageRouter from './router/storage.router'
import AuthMiddleware from './middleware/auth.middleware'
import FriendRouter from './router/friend.router'
import SwaggerConfig from './util/swagger'
import { serve, setup } from 'swagger-ui-express'

const app = express()

// ✅ 1. Middleware FIRST
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ✅ 2. Routes AFTER middleware
app.use("/api-docs", serve, setup(SwaggerConfig))
app.use("/auth", AuthRouter)
app.use("/storage",AuthMiddleware, StorageRouter)
app.use("/friend",AuthMiddleware, FriendRouter)


// ✅ 3. Listen LAST
app.listen(process.env.PORT || 8080,
    () => console.log(`Server is running on port ${process.env.PORT}`)
)


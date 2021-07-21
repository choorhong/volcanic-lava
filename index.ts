import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import purchaseOrderRoutes from './routes/purchaseOrder'
import bookingRoutes from './routes/booking'
import shipmentRoutes from './routes/shipment'

// Setup env
dotenv.config()
const { MONGODB_URI, PORT } = process.env

// Initiate our app
const app = express()

// Configure our app
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Configure routes
app.use('/auth', authRoutes)
app.use('/shipment', shipmentRoutes)
app.use('/booking', bookingRoutes)
app.use('/purchase-order', purchaseOrderRoutes)
app.use('/', (_, res) => res.json({ message: 'Connected, congratz!' }))

// Setup database
if (!MONGODB_URI) throw 'Database string is undefined'
mongoose
  .connect(`${MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to mongoDB & server running on http://localhost:${PORT}`))
  })
  .catch(err => console.log(err))

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import dashboardRoute from './routes/dashboard.js'
import firmRoute from './routes/firmRoutes.js'
import ledgerRoutes from './routes/ledgerRoutes.js'
import connDB from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'

async function main () {
  dotenv.config({ path: './config/.env' })
  const port = process.env.PORT || 8000
  const app = express()

  app.use(express.json())
  app.use(
    cors({
      origin: '*'
    })
  )
  app.use('/api/user', userRoutes)
  app.use('/api/dashboard', dashboardRoute)
  app.use('/api/firm', firmRoute)
  app.use('/api/ledgers', ledgerRoutes)
  app.use('*', (req, res, next) => {
    res.status(404).json({ error: 'Path Not Found' })
  })

  app.use(errorHandler)
  try {
    connDB()
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch(err => console.log(err))

// config/dotenv.js
import dotenv from 'dotenv'

// Load .env file into process.env
dotenv.config({ path: '../.env' })

// Optional: Verify loading (remove in production)
console.log(
  'Loaded environment variables:',
  Object.keys(process.env).filter((k) => k.startsWith('YOUR_')),
)

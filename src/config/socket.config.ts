import { io } from 'socket.io-client'
import { env } from './env.config'

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : env.VITE_SERVER_URL

export const socket = io(URL)

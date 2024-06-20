import './index.css'
import './app'

console.log(`[renderer] starting in ${process.env.NODE_ENV} mode`)

declare global {
    interface Window {
        electron: any
    }
}

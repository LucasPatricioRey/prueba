import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewRouter from './routers/view.router.js'

const app = express()

const httpServer = app.listen( 8080, () => console.log('SERVER OPEN!')) 
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', viewRouter)

const messages= []

io.on('connection', socket => {
    socket.on('message', data => {
        messages.push(data)
        io.emit('logs', messages)
    })
})
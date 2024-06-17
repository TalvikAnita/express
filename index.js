const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const addRoutes = require('./routes/add') 
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses');
const fs = require('fs') 

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views', 'partials')
})


hbs.handlebars.registerPartial('footerPartial', fs.readFileSync(path.join(__dirname, 'views', 'partials', 'footer.hbs'), 'utf8'))
hbs.handlebars.registerPartial('headPartial', fs.readFileSync(path.join(__dirname, 'views', 'partials', 'head.hbs'), 'utf8'))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes) 
app.use('/courses', coursesRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

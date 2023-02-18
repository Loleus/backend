const express = require('express');
const hbs = require('express-handlebars');
const {handleError} = require("./utils/errors")
const methodOverride = require('method-override');
const {clientRouter} = require('./routes/client')
const {loginRouter} = require('./routes/login')
const {homeRouter} = require('./routes/home');
const { join } = require('path');
const app = express()
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));

app.use("/", express.static(join(__dirname, 'public')));
// app.get('/', (req, res) => {
//   res.sendFile('index.html', {
//     root: './public/'
//   });
// })
// app.get('/admin', (req, res) => {
//   res.send('login')
// })

// app.use("/", express.static(join(__dirname, 'src')));
app.engine('.hbs', hbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');

app.use('/home', homeRouter);
app.use('/home/home', homeRouter);
app.use('/login', loginRouter)
app.use('/client', clientRouter)
app.use(handleError)
// app.use('/users', usersRouter);
app.listen(3000, '0.0.0.0',() => {
  console.log("Listening on http://0.0.0.0:3000")
});
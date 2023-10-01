const path = require('path');

const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const mongoose=require('mongoose')
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6517b67e2cb1dec71cb859f5')//6517b67e2cb1dec71cb859f5
    .then(user => {
      console.log("222222222225555555555555-----------------------------..............>>>>", req.user)
      req.user=user;
      console.log("222222222225555555555555-----------------------------..............>>>>", req.user)
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://abhishekgpt:abhishekgpt@cluster0.jlhyahh.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name:"Abhi",
        email:"abhi@gmail.com",
        cart:{
          items:[]
        }
      })
      user.save()
    }
  })
app.listen(4000)
}).catch(err=>{
  console.log(err)
})

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { result } = require("lodash");
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb-svc:27017/pei_blog';
mongoose.connect(mongoUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"]
    },
    article: {
        type: String,
        required: [true, "Please enter the article"]
    }
});
const Post = mongoose.model("post", postSchema);
Post.findOne({title: "Home"}, (err, result) => {
    if(err)
        console.log(err);
    else {
        if(!result) {
            initPost = new Post({
                title: "Home",
                article: homeStartingContent   
            })
            initPost.save();
        }
    }
})
app.get("/post/:title", (req, res) => {
    const id = req.params.title;
    console.log("found");
    Post.findOne({_id:id}, (err, result) => {
        if(err)
            console.log(err);
        else {
            if(result) {
                
                res.render("post", { Post: result });
            } else {
                console.log("not found in /post/:title");
            }
        }
    });
    //res.render("post", { Post: curPost });
});

app.get("/", (req, res) => {
    //lowerTitle.forEach(e => console.log(e));
    const lowerTitle = [];
    Post.find({}, (err, result) => {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            if(result) {
                result.forEach(e => {
                    lowerTitle.push("/post/"+e._id.toString());
                    //console.log(e._id.toString());
                }) 
                res.render("home", { totalPosts: result, postLink: lowerTitle });
            }
            else {
                console.log("not found in /");
            }
        }
    })
    
});

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        article: req.body.postBody
    });
    post.save();
    Post.findOne({title: req.body.postTitle}, (err, result) => {
        if(err)
            console.log(err);
        else {
            if(result) {
                lowerTitle.push("/post/"+result[0]._id);
            } else {
                console.log("not found in /compose");
            }
        }
    })
   //lowerTitle.push("/post/" + ));
    res.redirect("/");
});












app.listen(3000, function () {
    console.log("Server started on port 3000");
});

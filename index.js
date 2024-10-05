const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "vikash kumar",
    content: "i love you ",
  },
  {
    id: uuidv4(),
    username: "Santosh Sharma",
    content: " this is the santosh content",
  },
  {
    id: uuidv4(),
    username: "Muskan kumari",
    content: "i am Vikash !",
  },
  {
    id: uuidv4(),
    username: "Poonam kumari",
    content: "MY name is poonam kumar!",
  },
  {
    id: uuidv4(),
    username: "riya kumari",
    content: "i am riya !",
  },
  {
    id: uuidv4(),
    username: "nidhi kumari",
    content: "i am nidhi !",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
  res.send("it is working");
});
// THIS IS THE PATCH
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
  console.log(post);
});
//this is the edit  routs the content on the page

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// this is the delet route for the delete the post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

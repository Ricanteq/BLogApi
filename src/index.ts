import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { BlogPost } from "./bloginterface";


let posts: BlogPost[] = [];

let nextId = 1;

const app = express();
app.use(bodyParser.json());


app.get('/posts', (req: Request, res: Response) => {
  res.json(posts);
});


app.get('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Blog post not found');
  }
});


app.post('/posts', (req: Request, res: Response) => {
  const post: BlogPost = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    publishedDate: new Date()
  };
  posts.push(post);
  res.json(post);
});


app.put('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
  } else {
    res.status(404).send('Blog post not found');
  }
});


app.delete('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Blog post not found');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

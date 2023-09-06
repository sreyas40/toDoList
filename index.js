const { v4: uid } = require('uuid');
uid();
const express = require('express');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }))

let tdata = [{
    id: uid(),
    task: "wake up at 6am",
    repeat: "daily"
},
{
    id: uid(),
    task: "Go for a walk",
    repeat: "sat-sun"
    }];

app.get('/', (req, res) => {
    res.render('home.ejs',{tdata})
})
app.get('/new', (req, res) => {
    res.render('ntask.ejs')
})
app.post('/new', (req, res) => {
    const { new_task, repeat } = req.body
    const task = new_task;
    const id = uid();
    tdata.push({id,task, repeat })
    console.log(tdata)
   res.redirect('/')
})
app.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    const req_task = tdata.find(t=>t.id === id)
    console.log(req_task)
    res.render('etask.ejs',{req_task})
})
app.post('/:id', (req, res) => {
    const { id } = req.params;
    const { task, repeat } = req.body;
    const req_task = tdata.find(t => t.id === id);
    req_task.task = task;
    req_task.repeat = repeat;
    res.redirect('/')
})
app.post('/:id/delete', (req, res) => {
    const { id } = req.params;
    tdata = tdata.filter(t => t.id !== id)
    res.redirect('/')
})




app.listen(3000, () => { console.log("Server Online :3000") });
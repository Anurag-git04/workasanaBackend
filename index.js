const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(cors())
require('dotenv').config()


const connectDb = require('./db/db.connect');
connectDb()

//Models Import 
const User = require('./models/user.model')
const Team = require('./models/team.model')
const Project = require('./models/project.model')
const Task = require('./models/task.model')

// sign in log in log out 
//User Apies for sign In Log In and fetching of all the user
app.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body
    try{
        let user = await User.findOne({email})
        if(user) return res.status(401).json({message:'User already exsit'})

        const hashed = await bcrypt.hash(password,10)
        user =new User({name,email,password:hashed})
        await user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(201).json({token})
    }catch(error){
        res.status(500).send('error in post ');
    }
})

app.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid emailId or password'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'Invalid Password'})
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.status(200).json({token})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:'error Login failed'})
    }
})

app.get('/member',async(req,res)=>{
    try{
        const data = await User.find()
        if(data){
            return res.status(201).json({data})
        }
        return res.status(400).json({message:"No data found"})
    }catch(error){
        console.log(error)
        return res.status(404).json({message:'Error while fetching members Data'})
    }
})

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDU2YTQ2ODQ5ODcxMTI0ZjgyNWQ1ZiIsImlhdCI6MTc0OTM3OTY3MCwiZXhwIjoxNzQ5NDY2MDcwfQ.ML7F-84aUfaumVZ8n1uof6T4yMikXIK-sJyb3esNRc0"

app.post('/team',async(req,res)=>{
    const {name,description,member} = req.body
    try{
        if(!name || !description || !member){
            return res.status(400).json({message:'Missing Value Please send complete value'})
        }
        const newteam = new Team({name,description,member})
        await newteam.save()
        res.status(201).json({team:newteam})
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Error while posting team'})
    }
})

app.get('/teams',async(req,res)=>{
    try {
        const data = await Team.find().populate('member')
        if(data){
            return res.status(201).json({data})
        }
        return res.status(400).json({message:"No data found"})
    } catch (error) {
        console.log(error)
    }
})

//Now Project Apies -> GET ->POST
app.post('/project',async(req,res)=>{
    const {name,description} = req.body
    try {
        const newProject = await Project({name,description})
        await newProject.save()
        return res.status(201).json({message:'Project is Saved'})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'Error while Posting project'})
    }
})

app.get('/project',async(req,res)=>{
    try {
        const data = await Project.find()
        if(data){
            return res.status(201).json({data})
        }
        return res.status(400).json({message:"No data found"})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'Error while fetching project'})
    }
})

//Tasks 

app.post('/task', async (req, res) => {
    const { name, project, team, owners, tags, timeToComplete, status } = req.body;
    try {
        
        if (!name || !project || !team || !owners || !timeToComplete) {
            return res.status(400).json({ message: 'All the feild are required for task creation.' });
        }

        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        const existingTeam = await Team.findById(team);
        if (!existingTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }
        
        const existingOwners = await User.find({ _id: { $in: owners } });
        if (existingOwners.length !== owners.length) {
            return res.status(404).json({ message: 'One or more owners not found.' });
        }

        const newTask = new Task({
            name,
            project,
            team,
            owners,
            tags: tags || [], 
            timeToComplete,
            status: status || 'To Do' 
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error while creating task.' });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('project', 'name description') 
            .populate('team', 'name description')   
            .populate('owners', 'name email');      

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found.' });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error while fetching tasks.' });
    }
});

app.get('/tasksbyid/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const data = await Task.findById(id).populate('project', 'name description').populate('owners','name')   

        if(data){
            return res.status(201).json({data})
        }else{
            return res.status(401).json({message:'No Data Found'})
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error while fetching tasks.' });
    }
})

app.put('/task/:id',async(req,res)=>{
    const { name, project, team, owners, tags, timeToComplete, status } = req.body;
    const {id} = req.params
    try {
        if (!name || !project || !team || !owners || !timeToComplete||status) {
            return res.status(400).json({ message: 'All the feild are required for task creation.' });
        }

        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        const existingTeam = await Team.findById(team);
        if (!existingTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }
        
        const existingOwners = await User.find({ _id: { $in: owners } });
        if (existingOwners.length !== owners.length) {
            return res.status(404).json({ message: 'One or more owners not found.' });
        }
        
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ error: `Lead with ID '${id}' not found.` });
        }
        task.name = name
        task.project = project
        task.team = team 
        task.owners = owners
        task.timeToComplete = timeToComplete
        await task.save()
        const populateTask = await task.findById(task._id).populate('team','name').populate('owners','name').populate('project','name')

        return res.status(200).json({
            id:populateTask.id,
            name:populateTask.name,
            team:{
                id:populateTask.team._id,
                name:populateTask.team.name
            },
            owners:{
                id:populateTask.owners._id,
                name:populateTask.owners.name
            },
            task:populateTask.timeToComplete,
            updatedAt:populateTask.updatedAt
        })
    } catch (error) {
        console.error('Error while updating:', error);
        res.status(500).json({ message: 'Error while Updatingtasks.' });
    }
})

const PORT = 5080

app.listen(PORT,()=>{
    console.log(`Server is connected`)
})
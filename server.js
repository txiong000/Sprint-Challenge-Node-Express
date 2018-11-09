const express = require('express');

const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const server = express();
const port = 9000;

server.use(express.json());


server.get('/api/projects', (req, res) => {
    projects.get().then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ message: "Unable to retrieve projects"})
    })
})

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.get(id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: "error no id by that number"})
            })
})

server.post('/api/projects', (req, res) => {
    const {name, description} = req.body;
    projects.insert({name, description})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: "Can not add new project"})
            })
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    projects.update(id, changes)
            .then(project => {
                if(project) {
                    res.status(200).json({ message: 'project updated'});
                } else {
                    res.status(404).json({ message: 'project not found'})
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'failed to update project'})
            })
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.remove(id)
            .then(project => {
               if(project) {
                res.status(200).json(project)
               } else {
                 res.status(400).json({ message: "no matching id"})
               }
            })
            .catch(err => {
                res.status(500).json({ message: "error no id match to delete"})
            })
})

/// Actions

server.get('/api/actions', (req, res) => {
    actions.get()
           .then(action => {
               res.status(200).json(action)
           })
           .catch(err => {
               res.status(500).json({ message: "failed to retrieve actions"})
           })
})



server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions.get(id)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(err => {
                res.status(500).json({ message: "error no id by that number"})
            })
})

server.post('/api/actions', (req, res) => {
    const {project_id, description, notes} = req.body;
    actions.insert({project_id, description, notes})
            .then(action => {
                res.status(200).json(action)
            })
            .catch(err => {
                res.status(500).json({ message: "Can not add new action"})
            })
})



server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    actions.update(id, changes)
            .then(action => {
                if(action) {
                    res.status(200).json(action);
                } else {
                    res.status(404).json({ message: 'project not found'})
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'failed to update project'})
            })
})


server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions.remove(id)
            .then(action => {
               if(action) {
                res.status(200).json(action)
               } else {
                 res.status(400).json({ message: "no matching id"})
               }
            })
            .catch(err => {
                res.status(500).json({ message: "error no id match to delete"})
            })
})

server.get('/api/projects/action/:id', (req, res) => {
    const { id } = req.params;
    projects.getProjectActions(id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: "unable to retrieve project actions"})
            })
})


















server.listen(port, ()=> {
    console.log(`Server listening to port ${port}`)
})
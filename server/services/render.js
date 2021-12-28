const axios = require('axios')

exports.homeRoutes = (req, res)=>{
    //Make a get request to /api/reports
    axios.get('http://localhost:3001/api/persons')
    .then(function(response){
        res.render('index', {persons:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

// exports.homeRoutes = (req, res) => {
//     res.render('index.ejs');
// };

exports.view_fgcreate = (req, res)=>{
    axios.get('http://localhost:3001/api/persons', {params:{id:req.query.id}})
    .then(function(response){
        res.render('add_report', {persons:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.view_graduate = (req, res)=>{
    axios.get('http://localhost:3001/api/reportsbyperson', {params:{document_number:req.query.document_number}})
    .then(function(response){
        // console.log(response.data)
        res.render('view_report', {graduate:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}

exports.update_graduate = (req, res)=>{
    axios.get('http://localhost:3001/api/reportsbyperson', {params:{document_number:req.query.document_number}})
    .then(function(response){
        // console.log(response.data)
        res.render('update_report', {graduate:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}

exports.view_person = (req, res)=>{
    axios.get('http://localhost:3001/api/persons', {params:{id:req.query.id}})
    .then(function(response){
        res.render('index_person', {persons:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.add_person = (req, res)=>{
    res.render('add_person');
}

exports.update_person = (req, res)=>{
    axios.get('http://sagyt.unab.edu.pe//api/persons', {params:{id:req.query.id}})
        .then(function(persondata){
            res.render("update_person", {person:persondata.data})
        })
    .catch(err=>{
        res.send(err);
    })
}

exports.add_report = (req, res)=>{
    res.render('add_report');
}

exports.add_approval = (req, res)=>{
    res.render('add_approval');
}

exports.view_fgapproval = (req, res)=>{
    axios.get('http://localhost:3001/api/persons', {params:{id:req.query.id}})
    .then(function(response){
        res.render('add_approval', {persons:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.view_approval = (req, res)=>{
    axios.get('http://localhost:3001/api/approvalsbyperson', {params:{document_number:req.query.document_number}})
    .then(function(response){
        // console.log(response.data)
        res.render('view_approval', {approval:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}

exports.update_approval = (req, res)=>{
    axios.get('http://localhost:3001/api/approvalsbyperson', {params:{document_number:req.query.document_number}})
    .then(function(response){
        // console.log(response.data)
        res.render('update_approval', {approval:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    
}


//agregado por pedro => para dar HOME
exports.homeHome = (req, res)=>{
    res.render('home.hbs');
};

exports.aboutHome = (req, res) => {
    res.render('about.hbs');
};



// para INICIAR SESION
// exports.userSignin = (req, res) => {
//     res.render('users/signin');
// };

// exports.userSignup = (req, res) => {
//     res.render('users/signup');
// };
var Persondb = require('../model/person')

//create and save new person
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Contenido no pudo ser encontrado!"})
        return;
    }

    //new person
    const person = new Persondb({
        surname_pat: req.body.surname_pat,
        surname_mat: req.body.surname_mat,
        first_names: req.body.first_names,
        document_type: req.body.document_type,
        document_number: req.body.document_number,
        mail: req.body.mail,
        phone: req.body.phone,
        phone_option: req.body.phone_option,
        state: req.body.state,
        condition: req.body.condition,
        modality: req.body.modality,
        user: req.body.user
    })

    //save person in the database
    person
        .save(person)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-person')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Ha ocurrido un error mientras se ejecutaba la creación del egresado"
            })
        })

}


// retrieve and return a single person
exports.findOne = (req,res)=>{
    if(req.query.id){
        const id = req.params.id;
        Persondb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"No se encontró persona con id: "+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error recuperando persona con id: "+id})
            })
    }

}

//retrieve and return all persons / retrieve and return a single person
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Persondb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"No se encontró persona con id: "+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error recuperando persona con id: "+id})
            })
    }else{
        //return all persons
        Persondb.find()
        .populate('user')
        .then(person=>{
            res.send(person)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Ha ocurrido un error mientras al obtener la información de la persona"})
        })
    }

}

//Update a new identified person by person id
exports.update = (req,res)=>{
        if(!req.body){
            return res
                .status(400)
                .send({message:"La información a actualizar no puede estar vacía"})
        }
    
        const id = req.params.id;
        Persondb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
            .then(data=>{
                if(!data){
                    res.status(400).send({message:`No se puede actualizar a la persona con ${id}. Probablemente no se encontró a la persona`})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error al actualizar información de la persona"})
            })
}

//Delete a person with specified person id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Persondb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede eliminar a la persona con id: ${id}. Probablemente el id es incorrecto`})
            }
            else{
                res.send({
                    message:"La persona fue eliminada exitosamente"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al eliminar información de la persona con id"+id})
        })
}

//Assign user to person
exports.assignuser = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"La información a actualizar no puede estar vacía"})
    }

    const id = req.params.id;
    Persondb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede actualizar a la persona con ${id}. Probablemente no se encontró a la persona`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al actualizar información de la persona"})
        })
}



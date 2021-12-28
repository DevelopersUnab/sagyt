var Supportdb = require('../model/supports');

//create and save new support
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Contenido no pudo ser encontrado!"})
        return;
    }
    //new support
    const support = new Supportdb({
        date_support: req.body.date_support,
        type_support: req.body.type_support,
        title_support: req.body.title_support,
        modality_support: req.body.modality_support,
        originality_proyect: req.body.originality_proyect,
        approval_support: req.body.approval_support,
        state: req.body.state,
        person: req.body.person
    })

    //save graduate in the database
    support
        .save(support)
        .then(data=>{
            res.send(data)
            // res.redirect('/add-report')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Ha ocurrido un error mientras se ejecutaba la creación del registro"
            })
        })

}

exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Supportdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"No se encontró egresado con id: "+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error recuperando egresado con id: "+id})
            })
    }else{
        Supportdb.find()
        .populate('person')
            .then(support=>{
                res.send(support)
            })
            .catch(err=>{
                res.status(500).send({message:err.message||"Ha ocurrido un error, al obtener la información del egresado"})
            })
    }


    
}

// retrieve and return a single approval
exports.findOne = (req,res)=>{
    if(req.query.id){
        const id = req.params.id;
        Supportdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"No se encontró registro con id: "+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error recuperando registro con id: "+id})
            })
    }

}


//Assign person to support
exports.assignperson = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"La información a actualizar no puede estar vacía"})
    }

    const id = req.params.id;
    Supportdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede actualizar registro con ${id}. Probablemente no se encontró registro`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al asignar reporte"})
        })
}

//Search approval by person
exports.Findbyperson = async (req, res) => {
    const { document_number }  = req.query;
    Supportdb
      .find({ persons: { $not: { $size: 0 } } })
      .lean()
      .populate({ path: 'person', match: { document_number: document_number } })
      .exec((err, approvals) => {
        if (err) {
          console.log(err);
          return res.send(err.message);
        }

        const data = approvals.filter(
            approval => {
                if(approval.person != null){
                     return approval.person
                }
            }
        )

        res.send(data);
      });
  }

// Update approval
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"La información a actualizar no puede estar vacía"})
    }

    const id = req.params.id;
    Supportdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede actualizar registro con ${id}. Probablemente no se encontró registro`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al actualizar información del registro"})
        })
}

//Delete a graduate with specified graduate id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Supportdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede eliminar registro con id: ${id}. Probablemente el id es incorrecto`})
            }
            else{
                res.send({
                    message:"Registro fue eliminado exitosamente"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al eliminar información del registro con id"+id})
        })
}

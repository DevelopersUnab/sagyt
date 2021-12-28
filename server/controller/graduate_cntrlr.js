var Graduatedb = require('../model/graduates');

//create and save new graduate
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Contenido no pudo ser encontrado!"})
        return;
    }
    //new graduate
    const graduate = new Graduatedb({
        code_graduate: req.body.code_graduate,
        school: req.body.school,
        program_academic: req.body.program_academic,
        study_plan: req.body.study_plan,
        approved_credits: req.body.approved_credits,
        date_firstenrollment_unab: req.body.date_firstenrollment_unab,
        date_firstenrollment_origen: req.body.date_firstenrollment_origen,
        date_last_semester: req.body.date_last_semester,
        date_egress: req.body.date_egress,
        condition: req.body.condition,
        person: req.body.person
    })

    //save graduate in the database
    graduate
        .save(graduate)
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

// retrieve and return a single person
exports.findOne = (req,res)=>{
    if(req.query.id){
        const id = req.params.id;
        Graduatedb.findById(id)
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



exports.Findbyperson = async (req, res) => {
    const { document_number }  = req.query;
    Graduatedb
      .find({ persons: { $not: { $size: 0 } } })
      .lean()
      .populate({ path: 'person', match: { document_number: document_number } })
      .exec((err, graduates) => {
        if (err) {
          console.log(err);
          return res.send(err.message);
        }

        const data = graduates.filter(
            graduate => {
                if(graduate.person != null){
                     return graduate.person
                }
            }
        )

        res.send(data);
      });
  }



//retrieve and return all graduate/ retrieve and return a single graduate
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Graduatedb.findById(id)
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
        Graduatedb.find()
        .populate('person')
            .then(graduate=>{
                res.send(graduate)
            })
            .catch(err=>{
                res.status(500).send({message:err.message||"Ha ocurrido un error, al obtener la información del egresado"})
            })
    }


    
}

//Count total records
exports.count = (req,res)=>{
    Graduatedb.find().count()
    .then(total=>{
        res.json({total})
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Ha ocurrido un error, al obtener la información del egresado"})
    })
}


//Update a new identified report by graduate id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"La información a actualizar no puede estar vacía"})
    }

    const id = req.params.id;
    Graduatedb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede actualizar egresado con ${id}. Probablemente no se encontró egresado`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al actualizar información del egresado"})
        })
}

//Delete a graduate with specified graduate id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Graduatedb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message:`No se puede eliminar egresado con id: ${id}. Probablemente el id es incorrecto`})
            }
            else{
                res.send({
                    message:"Egresado fue eliminado exitosamente"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error al eliminar información del egresado con id"+id})
        })
}

//Assign person to record
exports.assignperson = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"La información a actualizar no puede estar vacía"})
    }

    const id = req.params.id;
    Graduatedb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
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
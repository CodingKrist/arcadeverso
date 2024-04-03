const Tareas = require('../models/Tareas')

module.exports = {
    getTareas: async (req,res)=>{
        //console.log(req.user)
        try{
            const todasTareas = await Tareas.find({userId: req.user.id})
            const tareaIncompleta = await Tareas.countDocuments({userId:req.user.id, completa: false})
            res.render('listatareas.ejs', {tareas: todasTareas, incompletas: tareaIncompleta, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    crearTarea: async (req, res)=>{
        try{
            await Tareas.create({tarea: req.body.tareaNueva, completa: false, userId: req.user.id})
            console.log('Tarea añadida')
            res.redirect('/listatareas')
        }catch(err){
            console.log(err)
        }
    },
    
    markComplete: async (req, res)=>{
        try{
            await Tareas.findOneAndUpdate({_id:req.body.tareaIdFromJSFile},{
                completa: true
            })
            console.log('Marcada Completa')
            res.json('Marcada Completa')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Tareas.findOneAndUpdate({_id:req.body.tareaIdFromJSFile},{
                completa: false
            })
            console.log('Marcada Incompleta')
            res.json('Marcada Incompleta')
        }catch(err){
            console.log(err)
        }
    },

    deleteTarea: async (req, res)=>{
        console.log(req.body.tareaIdFromJSFile)
        try{
            await Tareas.findOneAndDelete({_id:req.body.tareaIdFromJSFile})
            console.log('Tarea elimineada')
            res.json('Eliminada')
        }catch(err){
            console.log(err)
        }
    }
}    

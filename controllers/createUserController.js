const ESP = require('../models/esp')
const admin = require('../models/admins')

module.exports = async (req,res) => {
    
    ESP.create({Governorate: req.body.name, MAC: req.body.MAC , LOC: req.body.location}, (error)=>{
        console.log(error)
    })
    
    const data = await admin.find({adminname: req.body.name});
    if(data !== null)
    {
        admin.create({adminname: req.body.name, password: req.body.password}, (error)=>{
            console.log(error)
        })
    }
    
    res.render('success')
    
}
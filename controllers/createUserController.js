const ESP = require('../models/esp')
const admin = require('../models/admins')

module.exports = async (req,res) => {
    
    const error = await ESP.create({Governorate: req.body.name, MAC: req.body.MAC , LOC: req.body.location})
    console.log(error)

    
    const data = await admin.find({adminname: req.body.name});
    if(!data)
    {
        var err = await admin.create({adminname: req.body.name, password: req.body.password})
        console.log(err)
    }
    
    res.render('success', {
        title: "Alpha - Success"
    })
    
}
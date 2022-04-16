const ESP = require('../models/esp')


module.exports = async (req,res) => {

    
    if(global.role == 0)         // admin
    {
        const data = await ESP.find({})
        res.render('monitor', {ESPData : data, name: 'any'})
    }
    else if(global.role == 1)    // police
    {
        const data = await ESP.find({Governorate: global.username})
        res.render('monitor', {ESPData : data, name: global.username})
    }
    else
    {
        res.send('Not Allowed')
    }
}

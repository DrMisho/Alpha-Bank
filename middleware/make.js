const ESP = require('../models/esp')
module.exports = async (req, res, next) => {
    const data = await ESP.find({})
        if(global.isDanger.length == 0)
        {
            for(i = 0 ; i< data.length; i++)
            {
                 console.log(data[i].LOC)
                global.LOCDanger.push(data[i].LOC)
                global.GOVDanger.push(data[i].Governorate)
                if (data[i].Status != 0) 
                {
                    global.isDanger.push(data[i].Status)
                    
                }
                else
                {
                    global.isDanger.push(0)
                } 
            }
        }
        next();
}        
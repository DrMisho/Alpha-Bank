const ESP = require("../models/esp.js")

module.exports = (req, res, next) => {
    console.log(req.body)
    ESP.findOne({MAC: req.body.MAC}, (error,esp)=>{
        if (error || !esp)
            return res.send('Not Allowed');
        
            next();
    });

}
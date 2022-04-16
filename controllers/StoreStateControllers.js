const ESP = require('../models/esp.js');
const TelegramBot = require('node-telegram-bot-api');
const token = '5247305274:AAFQOm7wErZluTntkl1eL4cS952a3CLFs3A';
const bot = new TelegramBot(token, {polling: true});
const chatId = -725607600;


module.exports = (req,res) => {
    ESP.updateOne({MAC: req.body.MAC}, {Status: req.body.Status, Log: Date.now()}
    ,  (error, data)=>{
        console.log(req.body)
        if(req.body.Status > 0)
        {
            ESP.find({MAC: req.body.MAC},(error, data)=>{
                let n = global.LOCDanger.indexOf(data[0].LOC)
                global.isDanger[n] = data[0].Status
                console.log(data[0])
                bot.sendMessage(chatId, `Danger!! Status: ${data[0].Status}`);
            })
            
        }
        else 
        {
            ESP.find({MAC: req.body.MAC},(error, data)=>{
                let n = global.LOCDanger.indexOf(data[0].LOC)
                global.isDanger[n] = 0
                console.log(data[0])
            })
            
        }
        res.send('ok');
    })
    
}
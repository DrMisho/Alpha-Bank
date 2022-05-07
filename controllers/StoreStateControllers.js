const ESP = require('../models/esp.js');
const TelegramBot = require('node-telegram-bot-api');
const token = '5247305274:AAFQOm7wErZluTntkl1eL4cS952a3CLFs3A';
const bot = new TelegramBot(token, {polling: false});
const chatId = -725607600;

module.exports = async (req,res) => {
    var error = await ESP.updateOne({MAC: req.body.MAC}, {Status: req.body.Status, Log: Date.now()})
    console.log(req.body)
    if(req.body.Status > 0)
    {
        var error, data = await ESP.find({MAC: req.body.MAC});
        bot.sendMessage(chatId, `Governorate: ${data[0].Governorate}\nBank Branch: ${data[0].LOC}\nDanger Status: ${data[0].Status}`);
    }

    res.send('ok');

}
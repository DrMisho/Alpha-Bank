const ESP = require('../models/esp')


module.exports = async (req,res) => {

    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    if(global.role == 0)         // admin
    {
        const data = await ESP.find({})
        var date = []
        for(let i = 0; i< data.length; i++)
        {
            var minutes = data[i].Log.getMinutes().toString().length == 1 ? '0'+data[i].Log.getMinutes() : data[i].Log.getMinutes()
            var hours = data[i].Log.getHours().toString().length == 1 ? '0'+data[i].Log.getHours() : data[i].Log.getHours()
            var ampm = data[i].Log.getHours() >= 12 ? 'pm' : 'am'
            date[i] = days[data[i].Log.getDay()]+' '+months[data[i].Log.getMonth()]+' '+data[i].Log.getDate()+' '+data[i].Log.getFullYear()+' '+hours+':'+minutes+ampm;
        }
        res.render('monitor', {ESPData : data, name: 'any', date: date, title: "Alpha - Monitor"})
    }
    else if(global.role == 1)    // police
    {
        const data = await ESP.find({Governorate: global.username})
        var date = []
        for(let i = 0; i< data.length; i++)
        {
            var minutes = data[i].Log.getMinutes().toString().length == 1 ? '0'+data[i].Log.getMinutes() : data[i].Log.getMinutes()
            var hours = data[i].Log.getHours().toString().length == 1 ? '0'+data[i].Log.getHours() : data[i].Log.getHours()
            var ampm = data[i].Log.getHours() >= 12 ? 'pm' : 'am'
            date[i] = days[data[i].Log.getDay()]+' '+months[data[i].Log.getMonth()]+' '+data[i].Log.getDate()+' '+data[i].Log.getFullYear()+' '+hours+':'+minutes+ampm;
        }
        res.render('monitor', {ESPData : data, name: global.username, date: date, title: "Alpha - Monitor"})
    }
    else
    {
        res.send('Not Allowed')
    }
}

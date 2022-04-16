const bcrypt = require('bcrypt');
const admins = require('../models/admins');
module.exports = async (req, res, next) => 
{
    const { username, password } = req.body;
    console.log(req.body)
    admins.findOne({adminname: username}, (error, user) => 
    {
        if (user) 
        {
            console.log(user)
            bcrypt.compare(password, user.password, async(error, same) => 
            {
                if (same) 
                { 
                    req.session.userId = user._id
                    global.role = user.role;
                    global.username = username;
                    if(user.role == 0)   // admin
                    {
                        isAdmin = true;
                        res.redirect('/monitor')
                    }
                    else
                    {
                        console.log(global.role)
                        res.redirect('/monitor')
                    }
                } 
                else 
                {
                    res.send('password worng');
                }
            });
        } 
        else 
        {
            res.send('NOT ALLOWED');
        }
    });
};
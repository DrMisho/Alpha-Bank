module.exports = (req, res) => {
    global.isAdmin = false;
    global.username = null;
    global.role = 4;
//    global.isDanger = []
//    global.isDanger.length = 0
//    global.LOCDanger.length = 0
    req.session.destroy(() => {
        res.redirect('/');
    });
}
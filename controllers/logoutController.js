module.exports = (req, res) => {
    global.isAdmin = false;
    global.username = null;
    global.role = 4;
    req.session.destroy(() => {
        res.redirect('/');
    });
}
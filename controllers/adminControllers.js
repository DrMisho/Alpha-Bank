module.exports = (req,res) => {
    if (req.session.userId && isAdmin) {
        return res.render('createUser');
    }
    res.redirect('/');
}

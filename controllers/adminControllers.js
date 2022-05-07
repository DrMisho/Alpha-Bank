module.exports = (req,res) => {
    if (req.session.userId && isAdmin) {
        return res.render('createUser', {
            title: "Alpha - Create Branch"
        });
    }
    res.redirect('/');
}

module.exports = (req, res, next) => {
    if (!global.isAdmin) {
        return res.redirect('/');
    }
    next()
}
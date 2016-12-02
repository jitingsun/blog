exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.session.err = '已经保持登录状态了';
        res.redirect('/');
    } else {
        next();
    }
};
exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.err = '请登录后访问';
        res.redirect('/');
    }
};
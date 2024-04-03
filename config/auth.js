module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if(req.isAuthenticated()) {
        return next();
      }
      // Si el usuario no está autenticado, redirígelo a la página de inicio
      res.redirect('/');
    }
  }
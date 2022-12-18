module.exports = (req, res, next) => {
  //console.log("Verificando Session");
  if (!req.session.authenticated)
    return res.status(401).json({ message: 'Usuário não logado!' });
  next();
}
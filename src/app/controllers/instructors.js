const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res){
    return res.render("instructors/index");
  },
  create(req, res){
    return res.render("instructors/create");
  },
  post(req, res){
    //estrutura de validação{
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos!");
      }
    }
    let { avatar_url, birth, name, services, gender, type_class } = req.body;

    return;
  },
  show(req, res){
    return;
  },
  edit(req, res){
    return;
  },
  put(req, res){
    return;
  },
  delete(req, res){
    return;
  },
};

const fs = require("fs");
/* const { url } = require("inspector"); */
const data = require("./data.json");

//show
exports.show = function(req,res){
  const {id} = req.params
  const foundInstructor = data.instructors.find(function(instructor){
  return instructor.id == id
})
if (!foundInstructor)return res.send("Instructor not found!")

function age(timestamp){
  const today = new Date()
  const birthDate = new Date(timestamp)

  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  if (month <0 || month == 0 && today.getDate()<= birthDate.getDate()) {
    age = age -1
  }
  return age
}
const  instructor={
  ...foundInstructor,
  age: age(foundInstructor.birth),
  services:foundInstructor.services.split(","),
  created_at:"",
}

return res.render("instructors/show",{instructor})
}
//create
exports.post = function (req, res) {
  //estrutura de validação{
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha todos os campos!");
    }
  }
  let {avatar_url, birth,name, services,gender,type_class} = req.body

  //tratamento dos dados
  birth = Date.parse(birth)
  const created_at = Date.now();
  const id = Number(data.instructors.length +1)


  data.instructors.push({
    id,
    avatar_url,
    name,
    birth, 
    gender,
    services,
    created_at,
    type_class,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error!");
    return res.redirect("/instructors");
  });
  //return res.send(req.body)
};


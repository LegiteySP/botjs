const { model, Schema } = require('mongoose');

module.exports = model(
  'nome', // nome = nome da Schema que vai aparecer, igual o "formularios" "rankedbases" que ta na print
  new Schema({
    //Informações, com vários tipos
    // String: Texto normal, letras etc
    // Number: Apenas numeros
    // Object: Coleção de itens ["a", "b"] ou [{a: "a"}, {b: "b"}]
    // Array: Coleção de itens ["a", "b", "c"]
    // Tem alguns outros que eu não lkembro agorakkkk
    UserID: String, // Id do usuario
    Nickname: String, // Nome do usuario
    Bio: String,
    Elo: { type: Number, default: 0 },
    Like: {type: Number, default: 0}
    // Clan: {type: String, default: []}
  }),
);

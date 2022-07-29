const { model, Schema } = require('mongoose');

module.exports = model(
  'Clãs', // nome = nome da Schema que vai aparecer, igual o "formularios" "rankedbases" que ta na print
  new Schema({
    //  Elo: { type: Number, default: 0 },
    //Informações, com vários tipos
    // String: Texto normal, letras etc
    // Number: Apenas numeros
    // Object: Coleção de itens ["a", "b"] ou [{a: "a"}, {b: "b"}]
    // Array: Coleção de itens ["a", "b", "c"]
    // Tem alguns outros que eu não lkembro agorakkkk
    Clan: {type: String, default: []}
  }),
);

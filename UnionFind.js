module.exports = function() {
  return {
    Conjuntos: {},
    Find: function(v1) {
      return v1.conjunto;
    },
    MakeSet: function(v1) {
      this.Conjuntos[v1.identificador] = {
        vertices: [v1],
        quantity: 1
      }
      v1.conjunto = v1.identificador;
    },
    Union: function(v1, v2) {
      var nomeDoPrimeiroConjunto = this.Find(v1),
        nomeDoSegundoConjunto = this.Find(v2),
        conjuntoInteiro1 = this.Conjuntos[nomeDoPrimeiroConjunto],
        conjuntoInteiro2 = this.Conjuntos[nomeDoSegundoConjunto];

      if (nomeDoPrimeiroConjunto == nomeDoSegundoConjunto) {
        return false;
      }
      if (conjuntoInteiro1.quantity < conjuntoInteiro2.quantity) {
        conjuntoInteiro1.vertices.map(function(value) {
          value.conjunto = nomeDoSegundoConjunto;
          return value;
        })
        conjuntoInteiro2.vertices = conjuntoInteiro2.vertices.concat(conjuntoInteiro1.vertices);
        conjuntoInteiro2.quantity += conjuntoInteiro1.quantity;
        delete this.Conjuntos[nomeDoPrimeiroConjunto];
      } else {
        conjuntoInteiro2.vertices.map(function(value) {
          value.conjunto = nomeDoPrimeiroConjunto;
          return value;
        })
        conjuntoInteiro1.vertices = conjuntoInteiro1.vertices.concat(conjuntoInteiro2.vertices)
        conjuntoInteiro1.quantity += conjuntoInteiro2.quantity;
        delete this.Conjuntos[nomeDoSegundoConjunto];
      }
      return true;
    }
  }
}

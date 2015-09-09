module.exports = function(){
  return {
    Conjuntos: {},
    MakeSet: function(v1){
      this.Conjuntos[v1.identificador] = {
        vertices: [v1],
        quantity: 1
      }
      v1.conjunto = v1.identificador;
    },
    Union: function(v1,v2){
      var conjuntoDoVerticeV1 = this.Find(v1)
      ,   conjuntoDoVerticeV2 = this.Find(v2)
      ,   conjuntoInteiro1 = this.Conjuntos[conjuntoDoVerticeV1]
      ,   conjuntoInteiro2 = this.Conjuntos[conjuntoDoVerticeV2];

      if(conjuntoDoVerticeV1.identificador == conjuntoDoVerticeV2.identificador){
        return false;
      }
      console.log(conjuntoInteiro1,conjuntoInteiro2);
      if(conjuntoInteiro1.quantity < conjuntoInteiro2.quantity){
        conjuntoInteiro1.vertices.map(function(value){
          value.conjunto = conjuntoInteiro2;
          return value;
        })
        conjuntoInteiro2.vertices.concat(conjuntoInteiro1.vertices);
        conjuntoInteiro2.quantity += conjuntoInteiro1.quantity;
        delete this.Conjuntos[conjuntoInteiro1];
      } else {
        conjuntoInteiro2.vertices.map(function(value){
  				value.conjunto = conjuntoInteiro1;
  				return value;
  			})
  			conjuntoInteiro1.vertices.concat(conjuntoInteiro2.vertices)
  			conjuntoInteiro1.quantity += conjuntoInteiro2.quantity;
  			delete this.Conjuntos[conjuntoInteiro2];
      }
      return true;
    },
    Find: function(v1){
      return v1.conjunto;
    }
  }
}

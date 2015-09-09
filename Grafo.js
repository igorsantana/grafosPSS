module.exports = function Grafo(){
  this.vertices = [];
  this.arestas = [];
  this.getFormattedArestas = function(){
    return this.arestas.map(function(data){
      return 'DE: (x:'+data.de.x+ ','+ data.de.y+') | PARA:('+data.para.x+ ','+ data.para.y+') | DISTANCIA:' + data.distancia;
    });
  }
  this.getArestas = function(){
    return this.arestas;
  }
  this.getFormattedVertices = function(){
    return this.vertices.map(function(data){
      return '('+data.identificador+')'
    });
  }
  this.getVertices = function(){
    return this.vertices;
  }
  this.addVertice = function(v){
    var bool = this.vertices.filter(function(val){
      return v.identificador == val.identificador
    }).length > 0;
      if(!bool){
        this.vertices.push(v);
      }
  }
  this.addAresta = function(v1,v2,dist){
    this.arestas.push({
      de: v1,
      distancia:dist,
      para: v2
    })
  }
}

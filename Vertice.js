module.exports =  function Vertice(x,y,identificador){
    this.x = x;
    this.y = y;
    this.identificador = Math.random().toString(36).substr(2, 5);
  }

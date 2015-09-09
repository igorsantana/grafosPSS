module.exports =  function Vertice(x,y,identificador){
    this.x = x;
    this.y = y;
    this.identificador = Math.random().toString(36).substr(2, 5);
    this.getDistanceFrom = function(vertex){
      if(this.x == vertex.x && this.y == vertex.y) return -1;
      return Math.sqrt(Math.pow((this.x-vertex.x),2)+ Math.pow((this.x-vertex.x),2))
    }
  }

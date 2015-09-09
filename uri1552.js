(function () {
  var fs = require('fs')
  ,   Grafo = require('./Grafo')
  ,   Vertice = require('./Vertice')
  ,   UnionFind = require('./UnionFind')();
  fs.readFile('./entry.txt',{encoding: 'utf8'},callback);

  function callback(err,data){
    var content = data.split('\n')
    ,   numberOfCases = content[0]
    ,   cases = {}
    ,   counter = 0
    content.shift();

    for(var i = 0; i < content.length;i++ ){
      if(content[i].split(' ').length == 1){
        counter++;
        cases['case'+counter] = new Grafo();
      } else if(content[i].split(' ').length > 1){
        cases['case'+counter].addVertice(new Vertice(parseFloat(content[i].split(' ')[0]),parseFloat(content[i].split(' ')[1])));
      }
    }
    delete cases['case'+counter];
    for(var key in cases) if(cases.hasOwnProperty(key)){
      criaTodasArestas(cases[key]);
      kruskal(cases[key])
    }
  }

  function getDistance(v1,v2){
    var a = v1.x - v2.x,
				b = v1.y - v2.y;
		return Math.sqrt((a*a)+(b*b));
  }

  function criaTodasArestas(case_){
    case_.vertices.forEach(function(value){
      UnionFind.MakeSet(value);
      case_.vertices.forEach(function(obj){
        if(obj.identificador != value.identificador){
          case_.addAresta(value,obj,getDistance(value,obj));
        }
      })
    })
  }

  function kruskal(grafo){
    function sortArestas(aresta1,aresta2){
      return aresta1.distancia - aresta2.distancia;
    }
    var mst = []
    ,   floresta = grafo.getVertices()
    ,   arestasOrdenadas = grafo.getArestas().sort(sortArestas).reverse();
    arestasOrdenadas.forEach(function(value){
      if(UnionFind.Find(value.de) != UnionFind.Find(value.para)){
        mst.push(value);
        UnionFind.Union(value.de,value.para);
      }
    })
    var somaTotal = 0;
    mst.forEach(function(oi){
      somaTotal += oi.distancia;
    })
    console.log((somaTotal/100).toFixed(2));
  }
})();

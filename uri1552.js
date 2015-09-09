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

  function criaTodasArestas(case_){
    case_.getVertices().forEach(function(value){
      // Faz o MakeSet
      UnionFind.MakeSet(value);
      case_.getVertices().forEach(function(data){
        if(data.getDistanceFrom(value) != -1){
          case_.addAresta(value,data,data.getDistanceFrom(value));
        }
      })
    })
  }

  function kruskal(grafo){
    function sortArestas(aresta1,aresta2){
      var d1 = aresta1.distancia, d2 = aresta2.distancia;
      if(d1 < d2) return -1
      if(d1 < d2) return 1
      return 0
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
    var somaTotal;
    mst.forEach(function(oi){
      // console.log(oi.distancia);
      somaTotal += oi.distancia;
    })

  }
})();

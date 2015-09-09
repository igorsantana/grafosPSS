(function() {
  var fs = require('fs'),
    Grafo = require('./Grafo'),
    Vertice = require('./Vertice'),
    UnionFind = require('./UnionFind')();
  fs.readFile('./entry.txt', {
    encoding: 'utf8'
  }, callback);
  // Função principal do app.
  function callback(err, data) {
    var content = data.split('\n'),
      numberOfCases = content[0],
      cases = {},
      counter = 0;
    content.shift();
    // Lê o arquivo e cria os vértices.
    for (var i = 0; i < content.length; i++) {
      if (content[i].split(' ').length == 1) {
        counter++;
        if (i != content.length - 1) {
          cases['case' + counter] = new Grafo();
        }
      } else if (content[i].split(' ').length > 1) {
        cases['case' + counter]
          .addVertice(new Vertice(parseFloat(content[i].split(' ')[0]), parseFloat(content[i].split(' ')[1])));
      }
    }

    for (var key in cases)
      if (cases.hasOwnProperty(key)) {
        // Pra cada case, cria toda as arestas
        criaTodasArestas(cases[key]);
        // Executa o kruskal
        kruskal(cases[key])
      }
  }

  function getDistance(v1, v2) {
    var a = v1.x - v2.x,
      b = v1.y - v2.y;
    return Math.sqrt((a * a) + (b * b));
  }

  function criaTodasArestas(case_) {
    case_.vertices.forEach(function(value) {
      UnionFind.MakeSet(value);
      case_.vertices.forEach(function(obj) {
        if (obj.identificador != value.identificador) {
          case_.addAresta(value, obj, getDistance(value, obj));
        }
      })
    })
  }

  function kruskal(grafo) {
    function sortArestas(aresta1, aresta2) {
      return aresta1.distancia - aresta2.distancia;
    }
    var mst = [],
      floresta = grafo.getVertices(),
      arestasOrdenadas = grafo.getArestas().sort(sortArestas).reverse();
    arestasOrdenadas.forEach(function(value) {
      if (UnionFind.Find(value.de) != UnionFind.Find(value.para)) {
        mst.push(value);
        UnionFind.Union(value.de, value.para);
      }
    })
    var somaTotal = 0;
    mst.forEach(function(data) {
      console.log('DE: (x:' + data.de.x + ',' + data.de.y + ') | PARA:(' + data.para.x + ',' + data.para.y + ') | DISTANCIA:' + data.distancia);
      somaTotal += data.distancia;
    })
    console.log((somaTotal / 100).toFixed(2));
  }
})();

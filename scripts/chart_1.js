const mapaFetch = d3.json('../datos/barrios-caba.geojson')
const dataFetch = d3.dsv(';', '../datos/147_vehiculos_mal_estacionados.csv', d3.autoType)

const chartContainer = d3.select('#chart_1')

const mapa1 = chartContainer.append('div')
  .attr('id', 'mapa1')
  
const mapa2 = chartContainer.append('div')
  .attr('id', 'mapa2')

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })



  /* Mapa Barrios */
  let chartMap1 = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 4,
      scheme: 'ylorbr',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "currentColor",
          stroke: "white",
          textAnchor: "center",
          dx: 4,
          filter: (d) => (d.properties.DENUNCIAS > 1000 ||d.properties.DENUNCIAS == 516 ),
          
        })
      )
    ],
  })

const mapaFetch = d3.json('datos/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'datos/147_vehiculos_mal_estacionados.csv', d3.autoType)

  //filter: (d) => d.properties.BARRIO > 
 /*  Agregamos al DOM la visualización chartMap */
 d3.select('#mapa1').append(() => chartMap1)
})

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Mapa densidad */
  
  let chartMap2 = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      scheme: 'ylorbr',
    },
    marks: [
      Plot.density(data, { x: 'lon', y: 'lat', fill: 'density',bandwidth: 15, thresholds: 30 }),
      Plot.geo(barrios, {
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
  })


  /* Agregamos al DOM la visualización chartMap */
  d3.select('#mapa2').append(() => chartMap2)
})



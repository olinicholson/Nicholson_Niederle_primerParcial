// d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
//   d3.timeFormatDefaultLocale(locale)
// })

/* Agregamos al DOM la visualización chartMap */
d3.dsv(";",'../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
  console.log(data)
  // filtramos los barrios necesarios
  let data_aux = data.filter( item => 
    item.domicilio_barrio == 'VILLA SOLDATI' || 
    item.domicilio_barrio == 'PALERMO' || 
    item.domicilio_barrio == 'VILLA URQUIZA')
  let chart = Plot.plot({
    marks: [
      Plot.line(data_aux, 
        Plot.groupX({ 
          y:"count" }, 
        { 
          x: "hora_ingreso_aux", 
          stroke: "domicilio_barrio",
          curve: 'natural',
          
      }) ),
      ],
      x: {
        label: "HORA",
        line: true,},
      y: {
        label: "CANTIDAD DE DENUNCIAS",
        line: true,
        domain: [0,250],},
      color: {
        legend: true,
      },

  })
d3.select('#chart_2').append(() => chart)
})
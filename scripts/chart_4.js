d3.dsv(";", '../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
  console.log(data)
  // filtramos los barrios necesarios
  let data_palermo = data.filter(item =>
    (item.domicilio_barrio == 'PALERMO') && (item.estado_del_contacto != null) && (item.subcategoria != "DEFENSA AL CONSUMIDOR") && (item.subcategoria != "OTROS"))
  let data_soldati = data.filter(item =>
    (item.domicilio_barrio == 'VILLA SOLDATI') && (item.estado_del_contacto != null))
  let data_aux = data.filter(item =>
    item.domicilio_barrio == 'PALERMO' || 'VILLA SOLDATI')

  // Crear gráfico para Palermo
  let chartPalermo = Plot.plot({
    marks: [
      Plot.barX(data_palermo,
        Plot.groupY({
          x: "count"
        },
          {
            y: "subcategoria",
            fill: "estado_del_contacto"
          })),

    ],
    y: {
      line: true,
      tickFormat: d => d.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),

    },
    x: {
      label: "CANTIDAD DE DENUNCIAS",
      line: true,
      domain: [0, 1000],
    },
    color: {
      legend: true,
    },
    marginLeft: 150,
  })
  d3.select('#chart_4')
    .append('p') // Agregar un elemento de título h2 al elemento DOM que contiene el gráfico
    .text('Palermo:'); // Agregar texto al elemento de título
  d3.select('#chart_4').append(() => chartPalermo)


  // Crear gráfico para Villa Soldati
  let chartSoldati = Plot.plot({
    marks: [
      Plot.barX(data_soldati,
        Plot.groupY({
          x: "count"
        },
          {
            y: "subcategoria",
            fill: "estado_del_contacto"
          })),
    ],
    y: {
      line: true,
      tickFormat: d => d.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
    },
    x: {
      label: "CANTIDAD DE DENUNCIAS",
      line: true,
      domain: [0, 1000],
    },
    marginLeft: 150,
  })

  d3.select('#chart_4')
    .append('p') // Agregar un elemento de título h2 al elemento DOM que contiene el gráfico
    .text('Villa Soldati:'); // Agregar texto al elemento de título

  d3.select('#chart_4').append(() => chartSoldati); // Agregar el gráfico al elemento DOM

})

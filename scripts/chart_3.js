d3.dsv(";",'../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
  console.log(data)
  // filtramos los barrios necesarios
  let data_palermo = data.filter( item => 
    (item.domicilio_barrio == 'PALERMO') && (item.estado_del_contacto != null)&& (item.subcategoria != "DEFENSA AL CONSUMIDOR")&& (item.subcategoria != "OTROS"))
  let data_soldati = data.filter( item => 
    (item.domicilio_barrio == 'VILLA SOLDATI')&& (item.estado_del_contacto != null) )
  let data_aux= data.filter( item => 
    item.domicilio_barrio == 'PALERMO' ||'VILLA SOLDATI'  )

  let chartPalermo = Plot.plot({
    marks: [
      Plot.barX(data_palermo, 
        Plot.groupY({ 
          x:"count" }, 
        { 
          y: "subcategoria", 
          fill: "estado_del_contacto"
      }) ),
      
      ],
      y: {
        line: true,
        tickFormat: d => d.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
  
      },
      x: {
        label: "CANTIDAD DE DENUNCIAS",
        line: true,
        domain: [0,1000],
      },
      color: {
        legend: true,
      },
      marginLeft: 150,
  })

  d3.select('#chart_3').append(() => chartPalermo)
})
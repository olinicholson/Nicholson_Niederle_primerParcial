d3.dsv(";",'../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
    console.log(data)
    // filtramos los barrios necesarios
    let data_aux = data.filter( item => 
      item.domicilio_barrio == 'VILLA SOLDATI' || 
      item.domicilio_barrio == 'PALERMO' )
    let chart4 = Plot.plot({
      marks: [
        Plot.barY(data_aux, 
          Plot.groupX({ 
            y:"count" }, 
          { 
            x: "subcategoria", 
            fill: "domicilio_barrio",
            fillOpacity: 0.5 // Agregar fillOpacity para superponer valores de fill
        }) ),
        ],
        x: {
          label: "HORA",
          line: true,
        },
        y: {
          label: "CANTIDAD DE DENUNCIAS",
          line: true,
        },
        color: {
          legend: true,
        },
    
    })
    d3.select('#chart_4').append(() => chart4)
  })
  
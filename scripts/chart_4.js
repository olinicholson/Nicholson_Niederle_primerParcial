d3.dsv(";",'../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
    console.log(data)
    // filtramos los barrios necesarios
    let data_aux = data.filter( item => 
      item.domicilio_barrio == 'PALERMO' )
    let chart4 = Plot.plot({
      marks: [
        Plot.barX(data_aux, 
          Plot.groupY({ 
            x:"count" }, 
          { 
            y: "subcategoria", 
            fill: "genero"
            /*function(d){
                if (d.genero=="mujer"){
                    return color; 
                }
                else  if (d.genero=="null"){
                    return color; 
                }
                if (d.genero=="hombre"){
                    return color; 
                }
            }*/

        }) ),
        ],
        y: {
          line: true,
          tickFormat: d => d.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
    
        },
        x: {
          label: "CANTIDAD DE DENUNCIAS",
          line: true,
        },
        color: {
          legend: true,
        },
        marginLeft: 150,
    
    })
    d3.select('#chart_4').append(() => chart4)
  })
  
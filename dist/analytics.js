function createSubCharts(datajson, statename){
    let chartStatus = Chart.getChart("mysubChart1"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    chartStatus = Chart.getChart("mysubChart2"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  
    document.getElementById("statename").innerHTML = statename
  
    sectordata = getSectorState(datajson, statename)
    xlabels = Object.keys(sectordata)
    ylabels = Object.values(sectordata)
  
    const ctx1 = document.getElementById('mysubChart1');
  
      new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: xlabels,
          datasets: [{
            label: 'Number of Society',
            data: ylabels
          }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: "Sector-wise",
                  font:{
                      size:20
                  }
  
              },
          },
  
        }
      });
  
    yeardata = getYearState(datajson, statename)
    xlabels = Object.keys(yeardata)
    ylabels = Object.values(yeardata)
  
    const ctx2 = document.getElementById('mysubChart2');
  
      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: xlabels,
          datasets: [{
            label: 'Number of Society',
            data: ylabels,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: "Year-wise",
                  font:{
                      size:20
                  }
              }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
  
        }
      });
      var sector = getSectorwise(datajson);
      var label4= [];
      var datas4=[];
      for (i in sector){
          label4.push(i);
          datas4.push(sector[i]["count"]);
      }
      var year = getYearWise(datajson);
      var label5= [];
      var datas5=[];
      for (i in year){
          label5.push(i);
          datas5.push(year[i]);
      }
      const ctx4 = document.getElementById('myChart4');
    new Chart(ctx4, {
        type: 'doughnut',
        data: {
          labels: label4,
          datasets: [{
            label: 'Number of Sectors',
            data: datas4
          }]
        },
        options: {
          plugins: {
            title: {
                display: true,
                text: 'Sector-wise',
                font:{
                    size:20
                }

            }
          }
  
        }
      });
    
    const ctx5 = document.getElementById('myChart5');
    new Chart(ctx5, {
        type: 'line',
        data: {
          labels: label5,
          datasets: [{
            label: 'Number of Sectors',
            data: datas5,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
                display: true,
                text: 'Year-wise',
                font:{
                    size:20
                }

            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
  
        }
      });
  }

  function createSubTable(datajson, statename){
    newdata = getDataState(datajson, statename)
    //console.log(newdata)
    var tablek = new Tabulator("#subTable", {
        data:newdata,
        resizableColumnFit:true,
        pagination:true,
        paginationSize:5,
        paginationSizeSelector:[5, 10, 20],
        paginationCounter:"rows",
        columns:[
            {title:"Sr_No", field:"Sr_No",hozAlign:"center", width:80, resizable:false},
            {title:"Name of Society",formatter:"textarea", hozAlign:"center", field:"Name of Society",resizable:false},
            {title:"Address",formatter:"textarea",hozAlign:"center", field:"Address", resizable:false},
            {title:"State", field:"State",formatter:"textarea",hozAlign:"center",resizable:false},
            {title:"District",hozAlign:"center", field:"District",resizable:false},
            {title:"Date of Registration",hozAlign:"center", field:"Date of Registration",resizable:false},
            {title:"Area of Operation",hozAlign:"center",formatter:"textarea", field:"Area of Operation", resizable:false},
            {title:"Sector Type",hozAlign:"center", field:"Sector Type",resizable:false},
        ],
        layout: 'fitColumns'
    });
  }

function createAnalytics(datajson, state){
    createSubCharts(datajson, state)
    createSubTable(datajson, state)
}
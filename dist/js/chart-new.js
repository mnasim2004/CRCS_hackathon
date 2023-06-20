/*Chart*/
function createCharts(datajson){
    var state = getModified(datajson);
    var label1= [];
    var datas1=[];
    for (i in state){
        label1.push(i);
        datas1.push(state[i]["count"]);
    }
    var sector = getSectorwise(datajson);
    var label2= [];
    var datas2=[];
    for (i in sector){
        label2.push(i);
        datas2.push(sector[i]["count"]);
    }
    var year = getYearWise(datajson);
    var label3= [];
    var datas3=[];
    for (i in year){
        label3.push(i);
        datas3.push(year[i]);
    }
    
    const ctx1 = document.getElementById('myChart1');

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: label1,
        datasets: [{
          backgroundColor: '#D3B3A1',
          label: 'Number of Society',
          data: datas1,
          borderWidth: 1,
          borderRadius: 15
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                text: 'State-wise',
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
    
    const ctx2 = document.getElementById('myChart2');
    new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: label2,
          datasets: [{
            backgroundColor: '#D3B3A1',
            label: 'Number of Sectors',
            data: datas2,
            borderWidth: 1,
            borderRadius: 15
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
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
  
        }
      });
    
    const ctx3 = document.getElementById('myChart3');
    new Chart(ctx3, {
        type: 'line',
        data: {
          labels: label3,
          datasets: [{
            label: 'Number of Sectors',
            backgroundColor: '#D3B3A1',
            borderWidth: 2,
            data: datas3,
            borderWidth: 1,
            tension: 0
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











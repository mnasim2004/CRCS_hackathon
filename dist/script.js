


/*----------End of India Chart---------------*/




var f = document.getElementsByClassName("innerclick")
for (let i=0;i<f.length;i++){
    f[i].addEventListener("click", function(){

        for (let i=0;i<f.length;i++){
            document.getElementById("section-"+f[i].id).style.display = "none"
            f[i].classList.remove("current")
            console.log(f[i].classList)
        }
        document.getElementById("section-"+f[i].id).style.display = "block"
        f[i].classList.add("current")
        console.log(f[i].classList)
    })
}


function getModified(datajson){
  var Statewise = []
  for (i in datajson){
      if(Statewise[datajson[i]["State"]] == null){
          Statewise[datajson[i]["State"]] = {}
      }
      if (Statewise[datajson[i]["State"]]["count"] == null){
          Statewise[datajson[i]["State"]]["count"] = 1
          Statewise[datajson[i]["State"]]["distribution"] = {}
      }
      else {
          Statewise[datajson[i]["State"]]["count"] += 1 
      }


      if(Statewise[datajson[i]["State"]]["distribution"][datajson[i]["Sector Type"]] == null){
          Statewise[datajson[i]["State"]]["distribution"][datajson[i]["Sector Type"]] = 1
      }
      else{
          Statewise[datajson[i]["State"]]["distribution"][datajson[i]["Sector Type"]] +=1
      }
  }
  return Statewise
  
}
function getSectorwise(datajson){
    var Sectorwise = [];
    for(i in datajson){
        if(Sectorwise[datajson[i]["Sector Type"]] == null){
            Sectorwise[datajson[i]["Sector Type"]] = {}
        } 
        if (Sectorwise[datajson[i]["Sector Type"]]["count"] == null){
            Sectorwise[datajson[i]["Sector Type"]]["count"] = 1
            Sectorwise[datajson[i]["Sector Type"]]["distribution"] = {}
        }
        else{
            Sectorwise[datajson[i]["Sector Type"]]["count"] += 1
        }
        if(Sectorwise[datajson[i]["Sector Type"]]["distribution"][datajson[i]["State"]] == null){
            Sectorwise[datajson[i]["Sector Type"]]["distribution"][datajson[i]["State"]] = 1
        }
        else{
            Sectorwise[datajson[i]["Sector Type"]]["distribution"][datajson[i]["State"]] +=1
        }


    }
    return Sectorwise;
}


function getYearWise(datajson){
    for(i in datajson){
        //console.log(datajson[i]["Date of Registration"]);
        if(datajson[i]["Date of Registration"]==undefined){
            console.log(datajson[i])
        }
    }
    temp = {}
    for (var i = 0; i < datajson.length; i++) {
        if(datajson[i]["Date of Registration"]==null || datajson[i]["Date of Registration"]=="" ){
            if (!temp[""]){
                temp[""] = 1
            }
            else{
                temp[""] += 1 
            }
        }

        else if( temp[datajson[i]["Date of Registration"].split("/")[2]]==null){
            temp[datajson[i]["Date of Registration"].split("/")[2]] = 1
        }
        else{
            temp[datajson[i]["Date of Registration"].split("/")[2]] += 1;
        }
    }
    return temp
}

$(document).ready(function() {
  //console.log("asdasdad")
  $.ajax({
      type: "GET",
      url: "data.csv",
      dataType: "text",
      success: function(data) {
          //console.log(data)
          var datajson = $.csv.toObjects(data)
          createTable(datajson)
          createMap(datajson)
          createChart(datajson)
          console.log(datajson)
          getYearWise(datajson)
      },
      error: function (request, status, error) {
          //console.log(error)
      }
   });
});




var correspond = {
  "IN-AN": "ANDAMAN AND NICOBAR ISLANDS",
  "IN-AP": "ANDHRA PRADESH",
  "IN-AR": "ARUNACHAL PRADESH",
  "IN-AS": "ASSAM",
  "IN-BR": "BIHAR",
  "IN-CH": "CHANDIGARH",
  "IN-CT": "CHHATTISGARH",
  "IN-DL": "NEW DELHI",
  "IN-DH": "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  "IN-GA": "GOA",
  "IN-GJ": "GUJARAT",
  "IN-HR": "HARYANA",
  "IN-HP": "HIMACHAL PRADESH",
  "IN-JK": "JAMMU AND KASHMIR",
  "IN-JH": "JHARKHAND",
  "IN-KA": "KARNATAKA",
  "IN-KL": "KERALA",
  "IN-LK": "LADAKH",
  "IN-LD": "LAKSHADWEEP",
  "IN-MP": "MADHYA PRADESH",
  "IN-MH": "MAHARASHTRA",
  "IN-MN": "MANIPUR",
  "IN-ML": "MEGHALAYA",
  "IN-MZ": "MIZORAM",
  "IN-NL": "NAGALAND",
  "IN-OR": "ODISHA",
  "IN-PY": "PUDUCHERRY",
  "IN-PB": "PUNJAB",
  "IN-RJ": "RAJASTHAN",
  "IN-SK": "SIKKIM",
  "IN-TN": "TAMIL NADU",
  "IN-TG": "TELANGANA",
  "IN-TR": "TRIPURA",
  "IN-UP": "UTTAR PRADESH",
  "IN-UT": "UTTARAKHAND",
  "IN-WB": "WEST BENGAL"
}

var states = Object.values(correspond)
states = states.join("?").toLowerCase().split("?")
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

function getAreasofOperation(datajson){
  var areas = {}
  for (i in datajson){

    list = datajson[i]["Area of Operation"].replace(".",",").split(",")
    for (j in list){
      if (areas[list[j].trim()]==null){
        areas[list[j].trim()] = 1
      }
      else {
        areas[list[j].trim()] +=1
      }
    }
  }
  //console.log("ssadasd")
  //console.log(areas)
  delete areas[""]
  var newareas = {}
  for (i in areas){
    
    var matchindex = stringSimilarity.findBestMatch(i, states).bestMatchIndex
    newstate = states[matchindex]
    //console.log(newstate)
    if(newareas[newstate]==null){
      newareas[newstate.toUpperCase()] = areas[i]
    }
    else{
      newareas[newstate.toUpperCase()] += areas[i]
    }
  }

  //console.log(newareas)
  return newareas
}


function getYearWise(datajson){
    // for(i in datajson){
    //     //console.log(datajson[i]["Date of Registration"]);
    //     if(datajson[i]["Date of Registration"]==undefined){
    //         console.log(datajson[i])
    //     }
    // }
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




function getSectorState(datajson,state){
    var Sectorwise ={};
    for (i in datajson){
        if (datajson[i]["State"].toLowerCase()!=state.toLowerCase()){continue}

        if(Sectorwise[datajson[i]["Sector Type"]] == null){
            Sectorwise[datajson[i]["Sector Type"]] = 1
        } 
        else{
            Sectorwise[datajson[i]["Sector Type"]] += 1
        }
    }
    console.log(Sectorwise);
    return Sectorwise;
}




function getYearState(datajson,state){
    temp = {}
    for (var i = 0; i < datajson.length; i++) {
        if((datajson[i]["Date of Registration"]==null || datajson[i]["Date of Registration"]=="" )&&(datajson[i]["State"] == state )){
            if (!temp[""]){
                temp[""] = 1
            }
            else{
                temp[""] += 1 
            }
        }

        else if(( temp[datajson[i]["Date of Registration"].split("/")[2]]==null)&&(datajson[i]["State"] == state )){
            temp[datajson[i]["Date of Registration"].split("/")[2]] = 1
        }
        else if (datajson[i]["State"] == state ){
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
          var state = "Kerala"  
          var datajson = $.csv.toObjects(data)
          createTable(datajson)
          createMapStatewise(datajson)
          createMapAreas(datajson)
          //console.log(getAreasofOperation(datajson))
          //getSectorState(datajson,state)
          //getYearState(datajson,state)
          createCharts(datajson)
          console.log(datajson)
          //getYearWise(datajson)
          
      },
      error: function (request, status, error) {
          //console.log(error)
      }
   });
});


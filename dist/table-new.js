$(document).ready(function() {
    //console.log("asdasdad")
    $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function(data) {
            //console.log(data)
            var datajson = $.csv.toObjects(data)
            console.log(datajson)
            
            /*
            for (i in datajson){
                datajson[i]["Sr. No."] = parseInt(datajson[i]["Sr. No."])
            }
            */
           
            /*
            var valueE1 = document.getElementById("filter-value1");
            var valueE2 = document.getElementById("filter-value2");
            var valueE3 = document.getElementById("filter-value3");
            var valueE4 = document.getElementById("filter-value4");
                    
            //Custom filter example
            function customFilter(data){
                return data.car && data.rating < 3;
            }
            //Trigger setFilter function with correct parameters
            function updateFilter(){
              var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
              var typeVal = typeEl.options[typeEl.selectedIndex].value;
            
              var filter = filterVal == "function" ? customFilter : filterVal;
            
              if(filterVal == "function" ){
                typeEl.disabled = true;
                valueEl.disabled = true;
              }else{
                typeEl.disabled = false;
                valueEl.disabled = false;
              }
              
              if(filterVal){
                table.setFilter(filter,typeVal, valueEl.value);
              }
            }
            
            //Update filters on value change
            document.getElementById("filter-field").addEventListener("change", updateFilter);
            document.getElementById("filter-type").addEventListener("change", updateFilter);
            document.getElementById("filter-value").addEventListener("keyup", updateFilter);
            
            //Clear filters on "Clear Filters" button click
            document.getElementById("filter-clear").addEventListener("click", function(){
              fieldEl.value = "";
              typeEl.value = "=";
              valueEl.value = "";
              table.clearFilter();
            });
            */

            var name = document.getElementById("name");
            name.addEventListener("change", function(e){
              console.log(this)
                table.setFilter("Name of Society","keywords", this.value);
            })

            var address = document.getElementById("address");
            address.addEventListener("change", function(e){
              console.log(this)
                table.setFilter("Address","keywords", this.value);
            })

            function yearfilter(headerValue, rowValue, rowData, filterParams){
              if(headerValue==null){return true}
              console.log(rowData["Date of Registration"])
              k = rowData["Date of Registration"].split("/")
              return k.includes(headerValue)
            }

            yearlist = []
            temp = {}
            for (var i = 0; i < datajson.length; i++) {
              if(datajson[i]["Date of Registration"]==null || datajson[i]["Date of Registration"]==""){continue}
              temp[datajson[i]["Date of Registration"].split("/")[2]] = 0;
            }
            yearlist = Object.keys(temp)
            console.log(yearlist)
          

            var table = new Tabulator("#example-table", {
                data:datajson,
                pagination:true,
                paginationSize:10,
                paginationSizeSelector:[5, 10, 20],
                paginationCounter:"rows",
                columns:[
                    {title:"Sr_No", field:"Sr_No",hozAlign:"center", width:80},
                    {title:"Name of Society",formatter:"textarea", hozAlign:"center", field:"Name of Society",headerFilterLiveFilter:true},
                    {title:"Address",formatter:"textarea",hozAlign:"center", field:"Address"},
                    {title:"State", field:"State",hozAlign:"center",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}},
                    {title:"District",hozAlign:"center", field:"District",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}},
                    {title:"Date of Registration",hozAlign:"center", field:"Date of Registration",headerFilter:"list",headerFilterParams:{values:yearlist, clearable:true}, headerFilterFunc:yearfilter},
                    {title:"Area of Operation",hozAlign:"center",formatter:"textarea", field:"Area of Operation"},
                    {title:"Sector Type",hozAlign:"center", field:"Sector Type",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}},
                ],
                layout: 'fitColumns'
            });

            table.on("dataFiltered", function(filters, rows){
              console.log(filters)
              if (!filters.length){return}
              for (i in filters){
                if (filters[i].field=="State"){
                  temp = {}
                  // Store each of the elements in an object keyed of of the name field.  If there is a collision (the name already exists) then it is just replaced with the most recent one.
                  for (var j = 0; j < datajson.length; j++) {
                    if(datajson[j]["State"]==filters[i].value && datajson[j]["District"]!="")
                      temp[datajson[j]["District"]] = datajson[j];
                  }
                  uniq_dist = Object.keys(temp)
                  //table.options.columns[4].headerFilterParams = {values:uniq_dist}
                  table.updateColumnDefinition("District", {headerFilterParams:{values:uniq_dist, clearable:true}}) 
                  return;
                }
                  
              }
              table.updateColumnDefinition("District", {headerFilterParams:{valuesLookup:true, clearable:true}}) 
            });
            
            
        },
        error: function (request, status, error) {
            //console.log(error)
        }
     });
});

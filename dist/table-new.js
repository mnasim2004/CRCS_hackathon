function createTable(datajson){
  //console.log(datajson)

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

            var area = document.getElementById("area");
            area.addEventListener("change", function(e){
              console.log(this)
                table.setFilter("Area of Operation","keywords", this.value);
        
            })
            document.getElementById("filter-clear").addEventListener("click", function(){
                name.value = "";
                address.value = "";
                area.value = "";
              
                table.clearFilter();
              });
            

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
            //console.log(yearlist)
          

            var table = new Tabulator("#example-table", {
                data:datajson,
                resizableColumnFit:true,
                pagination:true,
                paginationSize:10,
                paginationSizeSelector:[5, 10, 20],
                paginationCounter:"rows",
                columns:[
                    {title:"Sr_No", field:"Sr_No",hozAlign:"center", width:80, resizable:false},
                    {title:"Name of Society",formatter:"textarea", hozAlign:"center", field:"Name of Society",headerFilterLiveFilter:true, resizable:false},
                    {title:"Address",formatter:"textarea",hozAlign:"center", field:"Address", resizable:false},
                    {title:"State", field:"State",formatter:"textarea",hozAlign:"center",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}, resizable:false},
                    {title:"District",hozAlign:"center", field:"District",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}, resizable:false},
                    {title:"Date of Registration",hozAlign:"center", field:"Date of Registration",headerFilter:"list",headerFilterParams:{values:yearlist, clearable:true}, headerFilterFunc:yearfilter, resizable:false},
                    {title:"Area of Operation",hozAlign:"center",formatter:"textarea", field:"Area of Operation", resizable:false},
                    {title:"Sector Type",hozAlign:"center", field:"Sector Type",headerFilter:"list", headerFilterParams:{valuesLookup:true, clearable:true}, resizable:false},
                ],
                layout: 'fitColumns'
            });
}





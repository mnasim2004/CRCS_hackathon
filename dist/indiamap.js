    /*
    polygonSeries.data = [
    {
        id: "IN-JK",
        value: 20
    },
    {
        id: "IN-MH",
        value: 100
    },
    {
        id: "IN-UP",
        value: 0
    },
    {
        id: "US-AR",
        value: 0
    },
    {
        id: "IN-RJ",
        value: 0
    },
    {
        id: "IN-AP",
        value: 0
    },
    {
        id: "IN-MP",
        value: 0
    },
    {
        id: "IN-TN",
        value: 0
    },
    {
        id: "IN-JH",
        value: 0
    },
    {
        id: "IN-WB",
        value: 0
    },
    {
        id: "IN-GJ",
        value: 0
    },
    {
        id: "IN-BR",
        value: 0
    },
    {
        id: "IN-TG",
        value: 0
    },
    {
        id: "IN-GA",
        value: 0
    },
    {
        id: "IN-DN",
        value: 0
    },
    {
        id: "IN-DL",
        value: 0
    },
    {
        id: "IN-DD",
        value: 0
    },
    {
        id: "IN-CH",
        value: 0
    },
    {
        id: "IN-CT",
        value: 0
    },
    {
        id: "IN-AS",
        value: 0
    },
    {
        id: "IN-AR",
        value: 0
    },
    {
        id: "IN-AN",
        value: 0
    },
    {
        id: "IN-KA",
        value: 0
    },
    {
        id: "IN-KL",
        value: 0
    },
    {
        id: "IN-OR",
        value: 0
    },
    {
        id: "IN-SK",
        value: 0
    },
    {
        id: "IN-HP",
        value: 0
    },
    {
        id: "IN-PB",
        value: 0
    },
    {
        id: "IN-HR",
        value: 0
    },
    {
        id: "IN-UT",
        value: 0
    },
    {
        id: "IN-LK",
        value: 0
    },
    {
        id: "IN-MN",
        value: 0
    },
    {
        id: "IN-TR",
        value: 0
    },
    {
        id: "IN-MZ",
        value: 0
    },
    {
        id: "IN-NL",
        value: 0
    },
    {
        id: "IN-ML",
        value: 0
    }
    ];
 */

function createMapStatewise(datajson){

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

    polygondata = []
    var f = getModified(datajson)
    for (i in correspond){
        //x = f[correspond[i]]!=null ? f[correspond[i]]["count"] : 0
        //polygondata.push({id:i,value:x})
        if (f[correspond[i]]!=null){
            polygondata.push({id:i,value:f[correspond[i]]["count"]})
        }
    }
    //console.log(polygondata)

    /*------------------- India Chart ------------------*/
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create("chartdiv1", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_india2019High;

    

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chart.colors.getIndex(1).brighten(1),
    max: chart.colors.getIndex(1).brighten(-0.3)
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state

    //console.log(polygonSeries.data)
    polygonSeries.data = polygondata


    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.events.on("hit", function(ev) {
        //console.log(ev.target.dataItem.dataContext.name);
        createAnalytics(datajson, ev.target.dataItem.dataContext.name)
        document.getElementById("analytic").click()
        //document.getElementById("section-analytic").focus()
    });


    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3c5bdc");

    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    
    
}



function createMapAreas(datajson){

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

    polygondata = []
    var f = getAreasofOperation(datajson)
    //console.log(f)
    for (i in correspond){
        //x = f[correspond[i]]!=null ? f[correspond[i]]["count"] : 0
        //polygondata.push({id:i,value:x})
        if (f[correspond[i]]!=null){
            polygondata.push({id:i,value:f[correspond[i]]})
        }
    }
    //console.log(polygondata)

    /*------------------- India Chart ------------------*/
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create("chartdiv2", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_india2019High;

    

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chart.colors.getIndex(1).brighten(1),
    max: chart.colors.getIndex(1).brighten(-0.3)
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    //console.log(polygonSeries.data)
    polygonSeries.data = polygondata


    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.events.on("hit", function(ev) {
        //console.log(ev.target.dataItem.dataContext.name);
        createAnalytics(datajson, ev.target.dataItem.dataContext.name)
        document.getElementById("analytic").click()
        //document.getElementById("section-analytic").focus()
    });

    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3c5bdc");

    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    
    
}




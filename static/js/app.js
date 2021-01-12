const file = "data\\samples.json";
function buildCharts(samplechoice) {
    d3.json(file).then((data) => {
        var sample = data.samples.filter(a => a.id==samplechoice);
        var sampleotuids = sample[0].otu_ids;
        console.log(sampleotuids);
        var samplevalues = sample[0].sample_values;

        var otuidstrings = sampleotuids.slice(0,10).map(a => `OTU ${a}`);

        var trace = [{
            type: 'bar',
            x: samplevalues.slice(0,10),
            y: otuidstrings,
            orientation: 'h'
          }];
          var layout = {
            title: "Bar Chart Belly Button Bacteria",
            // xaxis:{title: "insert label here"},
            showlegend: false,
            height: 600,
            width: 800
          };
        Plotly.newPlot('bar', trace, layout);
        
        var trace1 = [{
            x: otuidstrings,
            y: samplevalues,
            mode: 'markers',
            marker: {
              size: samplevalues,
              color: sampleotuids
              // text values are supposed to be otulabels
              //colors are all red and orange, explore why
            }
          }];
          var layout1 = {
            title: "Bubble Chart Belly Button Bacteria",
            // yaxis:{title: "insert label here"},
            showlegend: false,
            height: 600,
            width: 1000
          };
        Plotly.newPlot('bubble', trace1, layout1);
    })    
}

function getdemoinfo(samplechoice) {
      d3.json(file).then((data)=> {
          var metadata = data.metadata;
  
          console.log(metadata)

          var result = metadata.filter(data => data.id==samplechoice)[0];

          console.log(result)

          var demoinfo = d3.select("#sample-metadata");
          
          demoinfo.html("");

          Object.entries(result).forEach((key) => {   
              demoinfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        
      });
    });
  }

function optionChanged(samplechoice) {
    buildCharts(samplechoice);
    getdemoinfo(samplechoice);
}
function init() {
    d3.json(file).then((data) => {
        var selector = d3.select("#selDataset");
        console.log(data.names);
        data.names.forEach(element => {
            selector.append("option").text(element).property("value", element);
        });
    })
    buildCharts(940);
    getdemoinfo(940);
}
init();
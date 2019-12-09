function metaData(sample) {
    d3.json(`samples.json/metadata/${sample}`).then((data) => {
        console.log(data);
    });
    var MetaDataSample = d3.select("#sample-metadata");
      
      Object.entries(metadata).forEach(([key, value]);
  }

function chartBuilder(sample) {

  d3.json(`samples.json/samples/${sample}`).then((data) => {
        console.log(data);
    });
    var ids = data.otu_ids;
    var labels = data.otu_labels;
    var values = data.sample_values;

    var BubbleLayout = {
        height: 600,
        width: 800,
        xaxis: { title: "ID's" },
        hovermode: "closest",
      };

      var BubbleData = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];

    Plotly.newPlot("bubble", BubbleData, BubbleLayout);

    var PieData = [
      {
        values: values.slice(0, 10),
        labels: ids.slice(0, 10),
        hovertext: labels.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];

    var PieLayout = {
        
        height: 600,
        width: 800,
    };

    Plotly.newPlot("pie", PieData, PieLayout);

}

function init() {
  
  var selector = d3.select("#selDataset");

  d3.json(`samples.json/names/${names}`).then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    chartBuilder(firstSample);
    metaData(firstSample);
  });
}

function optionChanged (newSample) {
  chartBuilder(newSample);
  metaData(newSample);
}

init();
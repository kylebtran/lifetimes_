import { useEffect, useState } from "react";

function Map({ coords }: { coords: number[][] }) {
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);

  useEffect(() => {
    const checkPlotly = () => {
      if (window.Plotly) {
        setPlotlyLoaded(true);
      } else {
        setTimeout(checkPlotly, 100);
      }
    };
    checkPlotly();
  }, []);

  useEffect(() => {
    if (plotlyLoaded) {
      const x = coords.map((a: number[]) => a[0]);
      const y = coords.map((a: number[]) => a[1]);

      const trace1 = {
        x,
        y,
        mode: "markers", // Include markers for points
        name: "points",
        marker: {
          color: "rgb(0, 0, 0)",
          size: 20,
          opacity: 0.4,
        },
        type: "scatter",
        hoverinfo: "x+y", // Show text hover info
      };

      const trace3 = {
        x,
        y,
        mode: "lines", // Include markers for points
        name: "points",
        line: {
          color: "rgb(255, 255, 255)",
          width: 1,
        },
        opacity: 0.3,
        type: "scatter",
      };

      const trace2 = {
        x,
        y,
        name: "density",
        ncontours: 8,
        colorscale: [
          [0, "rgba(26, 23, 23, 0.3)"],
          [0.9, "rgba(26, 23, 23, 0.1)"],
          [1, "rgba(0, 0, 0, 0)"],
        ],
        reversescale: true,
        showscale: false,
        type: "histogram2dcontour",
        hoverinfo: "none", // Disable hover info for density trace
        contours: {
          showlines: false,
        },
        marker: {
          color: "rgb(102,0,0)",
          size: 5,
          opacity: 0.4,
        },
      };

      const config = { displayModeBar: false, responsive: true };
      const data = [trace2, trace3, trace1];

      const layout = {
        showlegend: false,
        autosize: false,
        width: 984,
        height: 875,
        hovermode: "closest",
        bargap: 0,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        xaxis: {
          visible: true,
          domain: [0, 0.85],
          showgrid: false,
          zeroline: false,
          range: [-1, 1],
        },
        yaxis: {
          visible: true,
          domain: [0, 0.85],
          showgrid: false,
          zeroline: false,
          range: [-1, 1],
        },
        xaxis2: {
          visible: false,
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false,
        },
        yaxis2: {
          visible: false,
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false,
        },
        dragmode: false,
      };

      window.Plotly.newPlot("myDiv2", data, layout, config);
    }
  }, [plotlyLoaded, coords]);

  return (
    <div id="myDiv2" style={{ width: "100%", height: "100%" }}>
      {/* <div>X coordinates: {coords.map(a => a[0]).join(', ')}</div>
      <div>Y coordinates: {coords.map(a => a[1]).join(', ')}</div> */}
    </div>
  );
}

export default Map;

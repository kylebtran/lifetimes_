import { useEffect, useState } from "react";
import { Post } from "../(models)/db";
import { usePanelContext } from "../PanelContext";

function Mapers({ posts, setSelectedPost }: { posts: Post[], setSelectedPost: React.Dispatch<React.SetStateAction<number>>; }) {
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);

  const {
    allPosts
  } = usePanelContext();

  const handleClick = (x: number) => {
    setSelectedPost(x);
  }
  const coords = [];
  // const postMap = new Map<Post, number>();
  
  allPosts.forEach(
    (value: Post, index: number, array: Post[]) => {
      if(posts.some((post) => post.coordinate === value.coordinate)) {
        
      }
    }
  )

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
      const pointIndices = posts.map((_, i) => i);

      const trace1 = {
        x,
        y,  
        pointIndices,
        mode: "markers", // Include markers for points
        name: "points",
        marker: {
          color: "rgb(26,23,23)",
          size: 8,
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
          width: 0.5,
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

      // Add event listener for marker clicks
      document.getElementById("myDiv2").on("plotly_click", (data) => {
        const clickedPoint = data.points[0]; // Get the first clicked point
        const clicked = clickedPoint.pointIndices;

        // Set the clicked point coordinates in the state
        handleClick(clicked);

        // Optionally, you can log the clicked point
      });
    }
  }, [plotlyLoaded, coords]);

  return (
    <div>
      <div id="myDiv2" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default Mapers;

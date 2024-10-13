import { useEffect, useState } from "react";
import { Post } from "../(models)/db";
import { usePanelContext } from "../PanelContext";

// Helper function to compare two coordinate arrays
const compareCoordinates = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

function Mapers({ posts, setSelectedPost }: { posts: Post[], setSelectedPost: React.Dispatch<React.SetStateAction<number>>; }) {
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);

  const { allPosts } = usePanelContext();

  const postMap = new Map<string, number>();

  // Fill postMap with posts that exist in both allPosts and posts
  allPosts.forEach((value: Post, index: number) => {
    const postExists = posts.some((post) => compareCoordinates(post.coordinate, value.coordinate) && post.user_id == value.user_id); // Use deep comparison
    if (postExists) {
      console.log(value);
      postMap.set(value.coordinate[0] + " " + value.coordinate[1], index+1);
    }
  });
  
  const handleClick = (post: Post) => {
    if(!post) return;

    const val = postMap.get(post.coordinate[0] + " " + post.coordinate[1]);
    if (val !== undefined) {
      setSelectedPost(val);
    }
  };
  
  const coords = posts.map((value: Post) => value.coordinate);

  // Set the initial selected post
  useEffect(() => {
    if (posts.length > 0) {
      // Select the first post initially
      handleClick(posts[0]);
    }
  }, [posts]); // Run whenever posts change

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

      // Attach Post objects to each data point using `customdata`
      const customdata = posts.map((post) => post); 

      const trace1 = {
        x,
        y,
        customdata, // Attach custom Post data to each marker
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
        const clickedPost = clickedPoint.customdata; // Access the custom Post data from the clicked point

        // Set the clicked point coordinates in the state
        handleClick(clickedPost);
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

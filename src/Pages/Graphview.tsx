import { Box } from "@material-ui/core";
import React from "react";
import { GraphWrapper } from "../Components/Graph";

export const Graphview: React.FC<{}> = () => {
  return (
    <Box>
      {<GraphWrapper></GraphWrapper>}
      <img src="/graph1.png" style={{ width: "100vw" }}></img>
      <Box height="100vh"></Box>
      <img src="/graph2.png" style={{ width: "100vw" }}></img>
      <Box height="100vh"></Box>
    </Box>
  );
};

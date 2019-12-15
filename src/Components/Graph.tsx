import { Box } from "@material-ui/core";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import { Account } from "../fakedata";
import useWindowDimensions from "../Hooks/useWindowDimension";
import { Accounts } from "../App";
import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export const GraphWrapper: React.FC<{}> = () => {
  const { accounts } = Accounts.useContainer();
  useEffect(() => {});
  return (
    <Box width="100vw" height="80vh">
      <TestGraph accounts={accounts}></TestGraph>
    </Box>
  );
};

const color = d3.schemeCategory10;

const Node: React.FC<NodeType> = props => {
  return (
    <circle
      r={5}
      cx={props.x}
      cy={props.y}
      style={{
        stroke: "#fff",
        strokeWidth: "1.5px"
      }}
    >
      <image
        href={props.logo ? props.logo : ""}
        x="0"
        y="0"
        height="50px"
        width="50px"
      />
    </circle>
  );
};

const Link: React.FC<{ link: any }> = ({ link }) => {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      style={{
        stroke: "#999",
        strokeOpacity: 0.6
      }}
    />
  );
};

const TestGraph2: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  return <div></div>;
};

type NodeType = SimulationNodeDatum & Account;
type LinkType = SimulationLinkDatum<NodeType>;

const TestGraph: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const { height, width } = useWindowDimensions();

  const [nodes, setNodes] = useState(
    accounts.map((a, i) => ({
      index: i,
      x: 0,
      y: 0,
      ...a
    })) as NodeType[]
  );
  const [links, setLinks] = useState([
    { source: 1, target: 2 },
    { source: 5, target: 9 },
    { source: 5, target: 1 }
  ] as LinkType[]);

  const [simulation, setSimulation] = useState(
    d3
      .forceSimulation(nodes)
      .force(
        "charge",
        d3
          .forceManyBody()
          .distanceMin(50)
          .distanceMax(100)
      )
      .force("center", d3.forceCenter())
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(1)
          .strength(0.1)
      )
  );

  useEffect(() => {
    simulation.on("tick", () => {
      setNodes([...nodes]);
      setLinks([...links]);
    });
  }, [simulation]);

  return (
    <div>
      <div style={{ marginLeft: "20px", fontFamily: "Helvetica" }}></div>
      <svg
        style={{ border: "2px solid black" }}
        width={width}
        height={height}
        viewBox={`${-height / 2} ${-width / 2} ${height} ${width}`}
      >
        {nodes.map(node => (
          <Node {...node}></Node>
        ))}

        {links.map(link => (
          <Link link={link}></Link>
        ))}
      </svg>
    </div>
  );
};

/*

class Graph extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    var svgWidth = 900;
    var svgHeight = 900;
    var force = d3.forceSimulation();

    return {
      svgWidth: svgWidth,
      svgHeight: svgHeight,
      force: force,
      nodes: null,
      links: null
    };
  }
  componentDidMount() {
    var self = this;
    // refactor entire graph into sub component - force layout shouldn't be
    // manipulating props, though this works
    this.state.force
      .nodes(this.props.lesmis.nodes)
      .links(this.props.lesmis.links)
      .start();
    this.state.force.on("tick", function(tick, b, c) {
      self.forceUpdate();
    });
  }
  drawLinks() {
    var links = this.props.lesmis.links.map(function(link, index) {
      return <Link datum={link} key={index} />;
    });
    return <g>{links}</g>;
  }
  drawNodes() {
    var nodes = this.props.lesmis.nodes.map(function(node, index) {
      return <Node key={index} x={node.x} y={node.y} group={node.group} />;
    });
    return nodes;
  }
  render() {
    return (
      <div>
        <div style={{ marginLeft: "20px", fontFamily: "Helvetica" }}></div>
        <svg
          style={{ border: "2px solid black", margin: "20px" }}
          width={this.state.svgWidth}
          height={this.state.svgHeight}
        >
          {this.drawLinks()}
          {this.drawNodes()}
        </svg>
      </div>
    );
  }
}
*/

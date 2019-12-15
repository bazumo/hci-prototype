import { Box, Fab } from "@material-ui/core";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import { Account } from "../fakedata";
import useWindowDimensions from "../Hooks/useWindowDimension";
import { Accounts } from "../App";
import { SimulationNodeDatum, SimulationLinkDatum } from "d3";
import { useHistory } from "react-router-dom";

export const GraphWrapper: React.FC<{}> = () => {
  const { accounts } = Accounts.useContainer();
  useEffect(() => {});
  return (
    <Box>
      <TestGraph accounts={accounts}></TestGraph>
    </Box>
  );
};

const Node: React.FC<NodeType> = props => {
  const history = useHistory();
  return (
    <Fab
      style={{
        top: props.y,
        left: props.x,
        position: "absolute",
        backgroundImage: `url(${props.logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      size="large"
      onClick={() => history.push(`/account/${props.id}`)}
    ></Fab>
  );
};

const Link: React.FC<{ link: any }> = ({ link }) => {
  return (
    <line
      x1={link.source.x + 25}
      y1={link.source.y + 25}
      x2={link.target.x + 25}
      y2={link.target.y + 25}
      style={{
        stroke: "#900",
        strokeOpacity: 0,
        strokeWidth: 5
      }}
    />
  );
};

type NodeType = SimulationNodeDatum & Account;
type LinkType = SimulationLinkDatum<NodeType>;

const TestGraph: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const parentSize = useWindowDimensions();

  const height = parentSize.height * 2;
  const width = parentSize.width * 2;
  const [nodes, setNodes] = useState(
    accounts.map((a, i) => ({
      index: i,
      x: 0,
      y: 0,
      ...a
    })) as NodeType[]
  );

  const passwordDependencies: LinkType[] = [];

  accounts.forEach((a1, i) => {
    accounts.forEach((a2, j) => {
      if (i !== j && a1.twoFA === a2.twoFA) {
        passwordDependencies.push({ source: i, target: j });
      }
    });
  });

  const [links, setLinks] = useState(passwordDependencies);

  const [simulation, setSimulation] = useState(
    d3
      .forceSimulation(nodes)
      .force(
        "charge",
        d3
          .forceManyBody()
          .distanceMin(100)
          .distanceMax(200)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(100)
          .strength(0.01)
      )
      .alphaMin(0.2)
      .alphaDecay(0.05)
  );

  useEffect(() => {
    simulation.on("tick", () => {
      setNodes([...nodes]);
      setLinks([...links]);
    });
    window.scrollTo(width / 4, height / 4);
  }, [simulation]);

  const handleSwitchMode = () => {};

  return (
    <div>
      <svg style={{ position: "absolute" }} width={width} height={height}>
        {links.map(link => (
          <Link link={link}></Link>
        ))}
      </svg>
      <div
        style={{
          width,
          height,
          position: "relative"
        }}
      >
        {nodes.map(node => (
          <Node {...node}></Node>
        ))}
      </div>
      <Fab
        color="primary"
        aria-label="edit"
        //onClick={handleSwitchMode}
        style={{ position: "fixed", bottom: "80px", right: "20px" }}
      ></Fab>
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

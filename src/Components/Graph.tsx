import { Box, Fab, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import { Account, defaultData } from "../fakedata";
import useWindowDimensions from "../Hooks/useWindowDimension";
import { Accounts } from "../App";
import { SimulationNodeDatum, SimulationLinkDatum } from "d3";
import { useHistory } from "react-router-dom";
import { FilterButton } from "./FilterButton";

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
        top: props.y! - 25,
        left: props.x! - 25,
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
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      style={{
        stroke: "#900",
        strokeOpacity: 0,
        strokeWidth: 5
      }}
    />
  );
};

const Hull: React.FC<{ points: [number, number][] }> = ({ points }) => {
  return (
    <path
      d={"M" + points.join("L") + "Z"}
      style={{
        stroke: "#AAAAAA",
        fill: "#EEEEEE",
        fillOpacity: 0.5,
        strokeOpacity: 1,
        strokeWidth: 2
      }}
    />
  );
};

function SimluationFactory(
  nodes: NodeType[],
  links: LinkType[],
  width: number,
  height: number
) {
  return d3
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
    .alphaDecay(0.05);
}

export type Mode =
  | "email"
  | "username"
  | "password"
  | "2fa"
  | "last_login"
  | "created";

const filterMap: Record<Mode, (a: Account, b: Account) => boolean> = {
  email: (a, b) => a.email === b.email,
  username: (a, b) => a.username === b.username,
  password: (a, b) => a.password === b.password,
  "2fa": (a1, a2) =>
    a1.supportsTwoFA == a2.supportsTwoFA && a1.supportsTwoFA
      ? a1.twoFA === a2.twoFA
      : a1.supportsTwoFA == a2.supportsTwoFA,
  last_login: (a1, a2) =>
    a1.lastLoggedIn.getFullYear() == a2.lastLoggedIn.getFullYear() &&
    a1.lastLoggedIn.getMonth() == a2.lastLoggedIn.getMonth(),
  created: (a1, a2) => a1.created.getFullYear() == a2.created.getFullYear()
};

const partition: Record<Mode, (nodes: NodeType[]) => NodeType[][]> = {
  email: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.email] = groups[n.email] ? [...groups[n.email], n] : [n];
    });
    return Object.values(groups);
  },
  username: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.username] = groups[n.username]
        ? [...groups[n.username], n]
        : [n];
    });
    return Object.values(groups);
  },
  password: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.password] = groups[n.password]
        ? [...groups[n.password], n]
        : [n];
    });
    return Object.values(groups);
  },
  "2fa": nodes => [nodes],
  last_login: nodes => [nodes],
  created: nodes => [nodes]
};

type NodeType = SimulationNodeDatum & Account;
type LinkType = SimulationLinkDatum<NodeType>;

const TestGraph: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const parentSize = useWindowDimensions();

  const [mode, setMode] = React.useState("username" as Mode);

  const height = parentSize.height * 2;
  const width = parentSize.width * 2;

  const [links, setLinks] = useState([] as LinkType[]);
  const [nodes, setNodes] = useState(
    accounts.map((a, i) => ({
      index: i,
      x: 0,
      y: 0,
      ...a
    })) as NodeType[]
  );

  const [simulation, setSimulation] = useState(
    SimluationFactory(nodes, links, width, height)
  );

  useEffect(() => {
    const dependencyLinks: LinkType[] = [];

    accounts.forEach((a1, i) => {
      accounts.forEach((a2, j) => {
        if (i !== j) {
          if (filterMap[mode](a1, a2)) {
            dependencyLinks.push({ source: i, target: j });
          }
        }
      });
    });

    setLinks(dependencyLinks);
    setSimulation(SimluationFactory(nodes, links, width, height));
    window.scrollTo(width / 4, height / 4);
  }, [mode]);

  useEffect(() => {
    simulation.on("tick", () => {
      setNodes([...nodes]);
      setLinks([...links]);
    });
    window.scrollTo(width / 4, height / 4);
  }, [simulation]);

  const partitions = partition[mode](nodes);

  console.log(partitions);

  function get_point (n: NodeType, angle: number) {
    let radius = 40;
    return [n.x! + radius *  Math.cos(angle), n.y! + radius *  Math.sin(angle)]
  }

  function get_points (n: NodeType) {
    const STEPS = 18;
    let res = new Array(STEPS);
    for (let i = 0; i < STEPS; i++) {
      res[i] = get_point(n, i*2*Math.PI/STEPS);
    }
    return res;
  }

  const hulls = partitions.map((nodeSet: NodeType[]) =>
    d3.polygonHull(
      nodeSet
        .map(n => 
          get_points(n)
        )
        .flat() as any
    )
  );

  return (
    <div>
      <svg style={{ position: "absolute" }} width={width} height={height}>
        {hulls.map(hull => {
          if (hull) {
            return <Hull points={hull}></Hull>;
          }
        })}
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
      <FilterButton mode={mode} setMode={setMode}></FilterButton>
    </div>
  );
};

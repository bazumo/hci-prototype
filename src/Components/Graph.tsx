import { Avatar, Box, Fab } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import * as d3 from "d3";
import { SimulationLinkDatum, SimulationNodeDatum, Simulation } from "d3";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Accounts } from "../App";
import { Account } from "../fakedata";
import useWindowDimensions from "../Hooks/useWindowDimension";
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

(window as any).count = 0;

const Node: React.FC<NodeType> = ({ a, x, y }) => {
  return (
    <div
      style={{
        transform: `translate(${x! - 25}px, ${y! - 25}px)`
      }}
    >
      <InnerNode a={a}></InnerNode>
    </div>
  );
};

const _InnerNode: React.FC<{ a: Account }> = ({ a }) => {
  const history = useHistory();
  return (
    <Fab
      style={{
        position: "absolute",
        backgroundImage: `url(${a.logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      size="large"
      onClick={() => history.push(`/account/${a.id}`)}
    >
      {a.compromised && (
        <Avatar
          style={{
            width: "16px",
            height: "16px",
            transform: "translate(20px, -20px)"
          }}
        >
          <ErrorIcon color="secondary" />
        </Avatar>
      )}
    </Fab>
  );
};
const InnerNode = React.memo(_InnerNode);

const Link: React.FC<{ link: any }> = ({ link }) => {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      style={{
        stroke: "#900",
        strokeOpacity: 1,
        strokeWidth: 5
      }}
    />
  );
};

const Label: React.FC<{ points: [number, number][]; text: string }> = ({
  points,
  text
}) => {
  const p = points.reduce((max, point) => (max[1] > point[1] ? point : max), [
    Infinity,
    Infinity
  ]);
  // const p = d3.polygonCentroid(points);
  return (
    <text
      x={p[0] - 30}
      y={p[1] - 10}
      fill="rgba(0,0,0,0.4)"
      fontWeight="bold"
      fontSize="12px"
    >
      {text}
    </text>
  );
};

const Hull: React.FC<{ points: [number, number][]; color: string }> = ({
  points,
  color
}) => {
  return (
    <path
      d={"M" + points.join("L") + "Z"}
      style={{
        stroke: "#AAAAAA",
        fill: color,
        fillOpacity: 0.2,
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
  const attractForce = d3
    .forceManyBody()
    .strength(-300)
    .distanceMin(50)
    .distanceMax(100);

  const centerForce = d3.forceCenter(width / 2, height / 2);
  const linkForce = d3
    .forceLink(links)
    .distance(100)
    .strength(0.2);
  const collisionForce = d3.forceCollide(35).strength(0.2);

  return d3
    .forceSimulation(nodes)
    .force("charge", attractForce)
    .force("center", centerForce)
    .force("collisionForce", collisionForce)
    .force("link", linkForce);
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
  last_login: (a1, a2) => {
    return (
      a1.lastLoggedIn.getFullYear() === a2.lastLoggedIn.getFullYear() &&
      a1.lastLoggedIn.getMonth() === a2.lastLoggedIn.getMonth()
    );
  },
  created: (a1, a2) => a1.created.getFullYear() == a2.created.getFullYear()
};

const partition: Record<Mode, (nodes: NodeType[]) => [string, NodeType[]][]> = {
  email: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.a.email] = groups[n.a.email] ? [...groups[n.a.email], n] : [n];
    });
    return Object.entries(groups);
  },
  username: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.a.username] = groups[n.a.username]
        ? [...groups[n.a.username], n]
        : [n];
    });
    return Object.entries(groups);
  },
  password: nodes => {
    const groups = {};
    nodes.forEach(n => {
      groups[n.a.password] = groups[n.a.password]
        ? [...groups[n.a.password], n]
        : [n];
    });
    return Object.entries(groups);
  },
  "2fa": nodes => {
    const groups = {};
    nodes.forEach(n => {
      const key = !n.a.supportsTwoFA
        ? "does not support 2FA"
        : n.a.twoFA
        ? "has 2FA enabled"
        : "does not use 2FA";
      groups[key] = groups[key] ? [...groups[key], n] : [n];
    });
    return Object.entries(groups);
  },
  last_login: nodes => {
    const groups = {};
    nodes.forEach(n => {
      const key =
        n.a.lastLoggedIn.getFullYear() + "/" + n.a.lastLoggedIn.getMonth();
      groups[key] = groups[key] ? [...groups[key], n] : [n];
    });
    return Object.entries(groups);
  },
  created: nodes => {
    const groups = {};
    nodes.forEach(n => {
      const key = n.a.created.getFullYear();
      groups[key] = groups[key] ? [...groups[key], n] : [n];
    });
    return Object.entries(groups);
  }
};

type NodeType = SimulationNodeDatum & { a: Account };
type LinkType = SimulationLinkDatum<NodeType>;

const TestGraph: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const parentSize = useWindowDimensions();

  const [mode, setMode] = React.useState<Mode>("username");

  const height = parentSize.height * 2;
  const width = parentSize.width * 2;

  const [simulation, setSimulation] = useState<
    Simulation<NodeType, LinkType>
  >();

  const links = useRef<LinkType[]>([]);

  useEffect(() => {
    // Todo handle changing accounts
    const nodes = simulation
      ? simulation.nodes()
      : accounts.map((a, i) => ({
          index: i,
          x: width / 2,
          y: height / 2,
          a
        }));

    links.current = [];

    accounts.forEach((a1, i) => {
      accounts.forEach((a2, j) => {
        if (i !== j) {
          if (filterMap[mode](a1, a2)) {
            links.current.push({ source: i, target: j });
          }
        }
      });
    });
    const sim = SimluationFactory(nodes, links.current, width, height);

    setSimulation(sim);
    window.scrollTo(width / 4, height / 4);

    return () => {
      sim.stop();
    };
  }, [mode, accounts]);

  const [frameCount, setFrameCount] = useState(0);
  useEffect(() => {
    if (!simulation) {
      return;
    }

    let running = true;

    // (function loop() {
    //   setFrameCount(s => s + 1);

    //   if (running) {
    //     requestAnimationFrame(loop);
    //   }
    // })();

    simulation.on("tick", function onEnd() {
      if (running) {
        setFrameCount(s => s + 1);
      }
    });

    simulation.on("end", function onEnd() {
      running = false;
    });

    window.scrollTo(width / 4, height / 4);

    return () => {
      running = false;
    };
  }, [simulation, setFrameCount]);

  if (!simulation) {
    return null;
  }

  const partitions = partition[mode](simulation.nodes());

  function get_point(n: NodeType, angle: number) {
    let radius = 40;
    return [n.x! + radius * Math.cos(angle), n.y! + radius * Math.sin(angle)];
  }

  function get_points(n: NodeType) {
    const STEPS = 18;
    let res = new Array(STEPS);
    for (let i = 0; i < STEPS; i++) {
      res[i] = get_point(n, (i * 2 * Math.PI) / STEPS);
    }
    return res;
  }

  const hulls = partitions.map(
    ([label, nodeSet]) =>
      [
        label,
        d3.polygonHull(nodeSet.map(n => get_points(n)).flat() as any)
      ] as any
  );

  return (
    <div>
      <svg style={{ position: "absolute" }} width={width} height={height}>
        {hulls.map(([label, hull], i) => {
          if (hull) {
            return (
              <Hull
                points={hull}
                color={d3.interpolateRainbow(i / hulls.length)}
              ></Hull>
            );
          }
        })}
        {links.current.map(link => (
          <Link link={link}></Link>
        ))}
      </svg>
      <div style={{ position: "absolute" }}>
        <div
          style={{
            width,
            height,
            position: "relative"
          }}
        >
          {simulation.nodes().map(node => (
            <Node {...node}></Node>
          ))}
        </div>
      </div>

      <svg
        style={{ position: "absolute", pointerEvents: "none" }}
        width={width}
        height={height}
      >
        {hulls.map(([label, hull]) => {
          if (hull && mode != "password") {
            return <Label points={hull} text={label}></Label>;
          }
        })}
      </svg>
      <FilterButton mode={mode} setMode={setMode}></FilterButton>
    </div>
  );
};

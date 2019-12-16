import { Box, Fab, Dialog, DialogTitle, TextField, DialogContent, MenuItem, Input, InputLabel, FormControl, DialogActions, Select, Button } from "@material-ui/core";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import { Account, defaultData } from "../fakedata";
import useWindowDimensions from "../Hooks/useWindowDimension";
import { Accounts } from "../App";
import { SimulationNodeDatum, SimulationLinkDatum } from "d3";
import { useHistory } from "react-router-dom";
import FilterIcon from "@material-ui/icons/FilterList";

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
    ></Fab>)
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

  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(1);

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
      if (i !== j) {
        let b: boolean = mode == 0 && a1.password === a2.password;
        b = b || (mode == 1 && a1.email === a2.email);
        b = b || (mode == 2 && a1.username === a2.username);
        b = b || (mode == 3 && ((a1.supportsTwoFA == a2.supportsTwoFA && a1.supportsTwoFA) ? a1.twoFA === a2.twoFA : a1.supportsTwoFA == a2.supportsTwoFA));
        b = b || (mode == 4 && a1.lastLoggedIn.getFullYear() == a2.lastLoggedIn.getFullYear() && a1.lastLoggedIn.getMonth() == a2.lastLoggedIn.getMonth());
        b = b || (mode == 5 && a1.created.getFullYear() == a2.created.getFullYear());
        if (b) {
          passwordDependencies.push({ source: i, target: j });
        }
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

  useEffect(() => {
    window.scrollTo(width / 4, height / 4);
    // update graph
  }, [mode]);

  const handleSwitchMode = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={() => {setOpen(false)}}
      >
        <DialogTitle>Choose Graph view</DialogTitle>
        <DialogContent style={{ minWidth: "350px" }}>
          <form>
            <FormControl>
              <InputLabel id="mode-label">Sort by</InputLabel>
                <Select
                  labelId="mode-label"
                  id="mode-select"
                  value={mode}
                  onChange={e => setMode(e.target.value as any)}
                  input={<Input />}
                >
                  <MenuItem value={0}>password</MenuItem>
                  <MenuItem value={1}>email</MenuItem>
                  <MenuItem value={2}>username</MenuItem>
                  <MenuItem value={3}>2FA</MenuItem>
                  <MenuItem value={4}>Last log-in (Month)</MenuItem>
                  <MenuItem value={5}>Created (Year)</MenuItem>
                </Select>
              </FormControl>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="edit"
        onClick={handleSwitchMode}
        style={{ position: "fixed", bottom: "80px", right: "20px" }}
      >
        <FilterIcon />
      </Fab>
    </div>
  );
};
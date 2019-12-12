import { ReactNode } from "react";

interface Account {
  id: string;
  score: number;
  url: string;

  username: string;
  email: string;
  password: string;

  created: Date;
  lastLoggedIn: Date;

  backgroundImage: ReactNode;
  logo: ReactNode;

  twoFA: boolean;
  compromised: boolean;
  loggedIn: boolean;

  loginGraph: number[];
}

const defaultData: Account = {
  id: "Account Name",
  score: 100,
  url: "",
  username: "",
  email: "",
  password: "",
  created: new Date(),
  lastLoggedIn: new Date(),

  backgroundImage: "",
  logo: "",

  twoFA: false,
  compromised: false,
  loggedIn: false,
  loginGraph: []
};

export const accounts: Account[] = [
  {
    ...defaultData,
    id: "Spotify",
    score: 78,
    url: "https://www.spotify.com/"
  },
  {
    ...defaultData,
    id: "Netflix",
    score: 69,
    url: "https://www.netflix.com/",
  },
  {
    ...defaultData,
    id: "Github",
    score: 92,
    url: "https://github.com/",
  }
];

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
  logo: string;

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
    logo: "http://cdn.osxdaily.com/wp-content/uploads/2019/03/spotify-icon.jpg",
    url: "https://www.spotify.com/"
  },
  {
    ...defaultData,
    id: "Netflix",
    score: 69,
    logo: "https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png",
    url: "https://www.netflix.com/",
  },
  {
    ...defaultData,
    id: "Github",
    score: 92,
    logo: "https://cdn1.iconfinder.com/data/icons/social-media-vol-1-1/24/_github-512.png",
    url: "https://github.com/",
  }
];

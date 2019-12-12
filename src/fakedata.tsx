import React, { ReactNode } from "react";

export interface Account {
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
    url: "https://www.spotify.com/",
    
    logo: "http://cdn.osxdaily.com/wp-content/uploads/2019/03/spotify-icon.jpg",
    backgroundImage: "https://images.squarespace-cdn.com/content/v1/570cfbc03c44d852f486e4e0/1504205354001-1TAN0QAQ89NMK2YIUU2R/ke17ZwdGBToddI8pDm48kKJzE3KqgVtfFOyy_lTwba57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UVdC42Jt7zbM4PNSRpOLpYJen8TLv0eRVom9R8iZNzktZDqXZYzu2fuaodM4POSZ4w/SPOTIFY+BANNER.png",
    twoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [3, 4, 7, 8, 12, 2, 3]
  },
  {
    ...defaultData,
    id: "Netflix",
    score: 69,
    url: "https://www.netflix.com/",
    username: "saic4nfly",
    email: "saimurray@gmail.com",
    password: "4e_bgafopwmn8",
    created: new Date(2019, 1, 2),
    lastLoggedIn: new Date(2019, 12, 8),
    logo:"https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1474467529/zlaaxu2whczitkpkxxk9.jpg",
    backgroundImage: "",
    twoFA: true,
    compromised: false,
    loggedIn: false,
    loginGraph: [0, 2, 0, 5, 1, 0, 0],
  },
  {
    ...defaultData,
    id: "Github",
    score: 92,
    url: "https://github.com/",
    username: "saicode",
    email: "mursai@student.in",
    password: "3txezkgnibqj7",
    created: new Date(2019, 11, 31),
    lastLoggedIn: new Date(2016, 8, 17),
    logo:"https://icon-library.net/images/github-icon-png/github-icon-png-22.jpg",
    backgroundImage: "",
    twoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2],
  },
  {
    ...defaultData,
    id: "Google",
    score: 92,
    url: "https://google.com/",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "x1fn0q2rcgw",
    created: new Date(2009, 6, 11),
    lastLoggedIn: new Date(2019, 12, 12),
    logo: "http://steverenner.com/wp-content/uploads/2018/10/256px-Google__G__Logo.svg_.png",
    backgroundImage: "",
    twoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2],
  },
  {
    ...defaultData,
    id: "WhatsApp",
    score: 92,
    url: "https://www.whatsapp.com/",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "",
    created: new Date(2015, 3, 12),
    lastLoggedIn: new Date(2019, 12, 12),
    logo: "https://lh3.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180",
    backgroundImage: "",
    twoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2],
  },
  {
    ...defaultData,
    id: "Steam",
    score: 92,
    url: "https://store.steampowered.com/",
    username: "saic4anfly",
    email: "saimurray@gmail.com",
    password: "S4SdVAU5RGfk",
    created: new Date(2016, 1, 1),
    lastLoggedIn: new Date(2019, 11, 27),
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png",
    backgroundImage: "",
    twoFA: true,
    compromised: false,
    loggedIn: false,
    loginGraph: [1, 5, 0, 6, 20, 8, 2],
  },
  {
    ...defaultData,
    id: "Reddit",
    score: 92,
    url: "https://www.reddit.com/",
    username: "murrycurry420",
    email: "saimurray@gmail.com",
    password: "dElkmdEXqzDL",
    created: new Date(2012, 1, 1),
    lastLoggedIn: new Date(2019, 12, 11),
    logo: "https://pbs.twimg.com/profile_images/1197561676393926656/KUZlGyLX_400x400.jpg",
    backgroundImage: "",
    twoFA: false,
    compromised: false,
    loggedIn: false,
    loginGraph: [1, 5, 0, 6, 20, 8, 2],
  }
];

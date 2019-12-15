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

  backgroundImage: string;
  logo: string;

  twoFA: boolean;
  supportsTwoFA: boolean;
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
  supportsTwoFA: false,
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
    username: "say96",
    email: "saimurray@gmail.com",
    logo: "http://cdn.osxdaily.com/wp-content/uploads/2019/03/spotify-icon.jpg",
    backgroundImage:
      "https://images.squarespace-cdn.com/content/v1/570cfbc03c44d852f486e4e0/1504205354001-1TAN0QAQ89NMK2YIUU2R/ke17ZwdGBToddI8pDm48kKJzE3KqgVtfFOyy_lTwba57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UVdC42Jt7zbM4PNSRpOLpYJen8TLv0eRVom9R8iZNzktZDqXZYzu2fuaodM4POSZ4w/SPOTIFY+BANNER.png",
    twoFA: true,
    supportsTwoFA: true,
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
    logo:
      "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1474467529/zlaaxu2whczitkpkxxk9.jpg",
    backgroundImage:
      "https://ewscripps.brightspotcdn.com/dims4/default/6980664/2147483647/strip/true/crop/0x0+0+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fsharing.abc15.com%2Fsharekmgh%2Fphoto%2F2012%2F10%2F30%2Fnetflix%20logo_1351612626078_319439_ver1.0_640_480.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: false,
    loginGraph: [0, 2, 0, 5, 1, 0, 0]
  },
  {
    ...defaultData,
    id: "Github",
    score: 92,
    url: "https://github.com/",
    username: "saicode",
    email: "mursai@student.in",
    password: "3txezkgnibqj7",
    created: new Date(2016, 8, 17),
    lastLoggedIn: new Date(2019, 11, 31),
    logo:
      "https://icon-library.net/images/github-icon-png/github-icon-png-22.jpg",
    backgroundImage:
      "https://portswigger.net/cms/images/54/14/6efb9bc5d143-article-190612-github-body-text.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
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
    logo:
      "http://steverenner.com/wp-content/uploads/2018/10/256px-Google__G__Logo.svg_.png",
    backgroundImage:
      "https://sites.google.com/a/bpnschool.ac.th/banpongnoi/_/rsrc/1463994273976/home/download.png",
    twoFA: false,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
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
    logo:
      "https://lh3.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180",
    backgroundImage:
      "https://static.facebook.com/images/whatsapp/www/whatsapp-promo.png",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
  },
  {
    ...defaultData,
    id: "Steam",
    score: 92,
    url: "https://store.steampowered.com/",
    username: "saic4nfly",
    email: "saimurray@gmail.com",
    password: "S4SdVAU",
    created: new Date(2016, 1, 1),
    lastLoggedIn: new Date(2019, 11, 27),
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png",
    backgroundImage:
      "https://cdn.images.express.co.uk/img/dynamic/143/590x/Steam-down-1199456.jpg?r=1572784780272",
    twoFA: true,
    compromised: false,
    supportsTwoFA: true,
    loggedIn: false,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
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
    logo:
      "https://pbs.twimg.com/profile_images/1197561676393926656/KUZlGyLX_400x400.jpg",
    backgroundImage:
      "https://www.slashgear.com/wp-content/uploads/2019/09/reddit_logo_main-1280x720.jpg",
    twoFA: false,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: false,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
  },
  {
    ...defaultData,
    id: "BBC",
    score: 92,
    url: "https://www.bbc.com/",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "dElkmdEXqzDL",
    created: new Date(2016, 4, 2),
    lastLoggedIn: new Date(2019, 12, 9),
    logo:
      "https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png",
    backgroundImage:
      "https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/2.5.2/bbc_news_logo.png",
    twoFA: false,
    compromised: false,
    supportsTwoFA: false,
    loggedIn: false,
    loginGraph: [1, 5, 0, 6, 20, 8, 2]
  },
  {
    ...defaultData,
    id: "Alibaba",
    score: 92,
    url: "https://www.alibaba.com/",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "S4SdVAU",
    created: new Date(2019, 7, 1),
    lastLoggedIn: new Date(2019, 10, 2),
    logo:
      "https://sc01.alicdn.com/kf/UTB80jcUjiaMiuJk43PTq6ySmXXag/Alibaba-com-membership.jpg",
    backgroundImage:
      "http://nasilsilerim.com/wp-content/uploads/alibaba-account-closure.png",
    twoFA: false,
    supportsTwoFA: false,
    compromised: true,
    loggedIn: false,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Coursera",
    score: 92,
    url: "https://www.coursera.org/",
    username: "saicode",
    email: "mursai@student.in",
    password: "ada243AD",
    created: new Date(2016, 4, 8),
    lastLoggedIn: new Date(2019, 7, 3),
    logo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-logo-square.png",
    backgroundImage:
      "https://cdn.muckrock.com/news_images/2016/06/08/CourSeraCov.jpg.1200x400_q85.jpg",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: false,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Instagram",
    score: 92,
    url: "https://www.instagram.com",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "rwre242SFwqd",
    created: new Date(2018, 4, 19),
    lastLoggedIn: new Date(2019, 12, 8),
    logo: "https://stmedia.stimg.co/1573268068_10069381+1ig110919.JPG",
    backgroundImage:
      "https://www.dpreview.com/files/p/articles/9831559128/main.png",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Twitter",
    score: 92,
    url: "https://www.twitter.com",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "S4SdVAU",
    created: new Date(2014, 9, 22),
    lastLoggedIn: new Date(2019, 12, 9),
    logo:
      "https://pbs.twimg.com/profile_images/1111729635610382336/_65QFl7B.png",
    backgroundImage:
      "https://musically.com/wp-content/uploads/2019/02/twitter-logo.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Apple Id",
    score: 92,
    url: "https://www.apple.com",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "fsfsf24224ad",
    created: new Date(2012, 9, 22),
    lastLoggedIn: new Date(2019, 7, 2),
    logo:
      "https://pbs.twimg.com/profile_images/1110319067280269312/iEqpsbUA_400x400.png",
    backgroundImage:
      "https://www.glitched.africa/wp-content/uploads/2018/11/og-default.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Amazon",
    score: 92,
    url: "https://www.amazon.com",
    username: "saimurr",
    email: "saimurray@outlook.com",
    password: "adasdmlmalkdbajlnd",
    created: new Date(2014, 2, 14),
    lastLoggedIn: new Date(2019, 10, 29),
    logo:
      "https://static1.squarespace.com/static/5481bc79e4b01c4bf3ceed80/5487687ce4b0988260050b6b/59a45776579fb313d6f3906e/1503942573678/amazon.jpg",
    backgroundImage:
      "https://imgix.bustle.com/uploads/image/2019/11/1/cb730e8b-8d42-4c72-a1ba-1eb3677f8c14-amazon-logo.png",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "New York Times",
    score: 92,
    url: "www.nytimes.com/",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "hackedpassword",
    created: new Date(2011, 6, 18),
    lastLoggedIn: new Date(2017, 11, 23),
    logo:
      "https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR.png",
    backgroundImage:
      "https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "SBB",
    score: 92,
    url: "https://www.sbb.ch",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "fsfsf24224ad",
    created: new Date(2018, 2, 3),
    lastLoggedIn: new Date(2019, 12, 8),
    logo:
      "https://worldsummit.ai/wp-content/uploads/sites/4/2019/06/SBB-logo.png",
    backgroundImage:
      "https://scholtysik.ch/wp_website/wp-content/uploads/2019/05/scholtysik_sbb_logo_rot.png",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "UBS",
    score: 92,
    url: "https://www.ubs.com",
    username: "sai murray",
    email: "saimurray@gmail.com",
    password: "adkaldkandklandkja",
    created: new Date(2012, 9, 22),
    lastLoggedIn: new Date(2019, 12, 10),
    logo:
      "https://cdn.nashvillepost.com/files/base/scomm/nvp/image/2015/06/640w/ubs.jpg  ",
    backgroundImage:
      "https://scholtysik.ch/wp_website/wp-content/uploads/2019/01/scholtysik_ubs_header_01.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Outlook",
    score: 92,
    url: "https://outlook.live.com",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "hackedpassw",
    created: new Date(2007, 3, 19),
    lastLoggedIn: new Date(2019, 10, 12),
    logo:
      "https://images.techhive.com/images/article/2014/09/outlook-logo-100457446-large.jpg",
    backgroundImage:
      "https://cdn.windowsreport.com/wp-content/uploads/2017/12/Outlook.jpg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: true,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Linkedin",
    score: 92,
    url: "https://www.linkedin.com",
    username: "sai69",
    email: "saimurray@outlook.com",
    password: "hackedpassw",
    created: new Date(2017, 8, 12),
    lastLoggedIn: new Date(2019, 10, 23),
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/768px-Linkedin.svg.png",
    backgroundImage:
      "https://shieldapp.ai/wp-content/uploads/2019/10/LinkedIn.jpg",
    twoFA: false,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Facebook",
    score: 92,
    url: "www.facebook.com/‎",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "hackedpassw",
    created: new Date(2013, 9, 22),
    lastLoggedIn: new Date(2019, 9, 2),
    logo: "https://www.facebook.com/images/fb_icon_325x325.png",
    backgroundImage:
      "https://about.fb.com/wp-content/uploads/2018/11/fb-hero-image-001.jpeg",
    twoFA: true,
    supportsTwoFA: true,
    compromised: false,
    loggedIn: false,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Skype",
    score: 92,
    url: "https://www.skype.com",
    username: "sai murray",
    email: "saimurray@outlook.com",
    password: "fsfsf24224ad",
    created: new Date(2006, 12, 3),
    lastLoggedIn: new Date(2008, 2, 2),
    logo:
      "https://marketplace.mypurecloud.com/1ef04974-73f9-4c17-abb3-b663fa424d3b/applogo_cc6b5891.png",
    backgroundImage:
      "https://ichef.bbci.co.uk/news/660/media/images/82774000/jpg/_82774476_8650a7c3-e8f7-4786-b062-55eef528519b.jpg",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Telegram",
    score: 92,
    url: "https://telegram.org",
    username: "sai murray",
    email: "",
    password: "ladhkajhdnkajsdnkadbkjkdajks",
    created: new Date(2015, 9, 22),
    lastLoggedIn: new Date(2019, 12, 12),
    logo: "https://telegram.org/img/t_logo.png",
    backgroundImage:
      "https://miro.medium.com/max/3840/1*wFihz619ZQpIBjGXKasHkQ.png",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    ...defaultData,
    id: "Youtube",
    score: 92,
    url: "https://youtube.com",
    username: "Mr sai",
    email: "saimurray@gmail.com",
    password: "fsfsf24224ad",
    created: new Date(2012, 9, 22),
    lastLoggedIn: new Date(2019, 7, 2),
    logo:
      "https://www.tubefilter.com/wp-content/uploads/2018/03/youtube-picture-in-picture.jpg",
    backgroundImage: "https://www.youtube.com/yts/img/yt_1200-vflhSIVnY.png",
    twoFA: false,
    supportsTwoFA: false,
    compromised: false,
    loggedIn: true,
    loginGraph: [0, 0, 0, 0, 0, 0, 0]
  }
];

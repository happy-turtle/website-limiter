const LAST_RESET = "LAST_RESET";
const LIMITED_SITES = "LIMITED_SITES";
const NUM_SUGGESTIONS = 6;
const RESOURCES = [
   {
      name: "LibriVox",
      image: "https://cdn.stocksnap.io/img-thumbs/960w/ANC5ACJ7V0.jpg",
      url: "https://librivox.org/"
   },
   {
      name: "Wait But Why",
      image:
         "https://28oa9i1t08037ue3m1l0i861-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/Logo-sometimes-Pixelmator-577.png",
      url: "https://waitbutwhy.com/"
   },
   {
      name: "Bartleby",
      image: "https://cdn.stocksnap.io/img-thumbs/960w/RXY5YRZYUE.jpg",
      url: "http://www.bartleby.com/"
   },
   {
      name: "TED",
      image:
         "https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo-fb.png?v=wAff13s?",
      url: "https://www.ted.com/"
   },
   {
      name: "TEDEd",
      image:
         "https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo-fb.png?v=wAff13s?",
      url: "http://ed.ted.com/"
   },
   {
      name: "MIT Videos",
      image:
         "https://yt3.ggpht.com/a-/AJLlDp0P9kY0OaOvEk0Iug-5TcrpWTcvca0ygJMrZg=s900-mo-c-c0xffffffff-rj-k-no",
      url: "http://video.mit.edu/"
   },
   {
      name: "The Smithsonian Channel",
      image:
         "https://images.unsplash.com/photo-1506717774818-488ff8834fc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6370820c6e116e34f20568dd74d31e64&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
      url: "https://www.youtube.com/user/smithsonianchannel"
   },
   {
      name: "The Royal Institution",
      image:
         "https://yt3.ggpht.com/a-/AJLlDp1Casnxvkig2LO3660K_a_l-7aHAaw0BES6Mg=s900-mo-c-c0xffffffff-rj-k-no",
      url: "https://www.youtube.com/user/TheRoyalInstitution"
   },
   {
      name: "Star Talk Radio",
      image:
         "https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6835a9662eef0b0322a3ef6a1092ef33&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
      url: "https://www.startalkradio.net/"
   },
   {
      name: "Udemy",
      image:
         "https://www.udemy.com/staticx/udemy/images/v6/default-meta-image.png",
      url: "https://www.udemy.com/"
   },
   {
      name: "Khan Academy",
      image: "https://cdn.kastatic.org/images/khan-logo-dark-background.png",
      url: "https://www.khanacademy.org/"
   },
   {
      name: "uReddit",
      image:
         "https://cnet4.cbsistatic.com/img/0BFM-SQSyAP9l193XxgPQ4WFm68=/2017/08/01/0097dc40-883d-4017-b92d-8250a89d469f/reddit-logo.png",
      url: "http://ureddit.com/"
   },
   {
      name: "MIT Open Courseware",
      image: "https://ocw.mit.edu/images/MIT_dome.jpg",
      url: "https://ocw.mit.edu/index.htm"
   },
   {
      name: "Master Class",
      image:
         "https://d3e9iqx18mbphw.cloudfront.net/images/442/original/1510845162-FB_Share_V1_no_logo.jpg?1510845162",
      url: "https://www.masterclass.com/"
   },
   {
      name: "Instructables",
      image:
         "https://cdn.instructables.com/static/image/instructables-robot.svg",
      url: "http://www.instructables.com/"
   },
   {
      name: "Codecademy",
      image:
         "https://production.cdmycdn.com/assets/logo-codecademy-social-abfd8450722d675bddedde689f8af624.png",
      url: "https://www.codecademy.com/"
   },
   {
      name: "Free Code Camp",
      image:
         "https://s3.amazonaws.com/freecodecamp/curriculum-diagram-full.jpg",
      url: "https://www.freecodecamp.com/"
   },
   {
      name: "Code Wars",
      image: "http://www.codewars.com/assets/logos/logo-square-paper-bg.jpg",
      url: "https://www.codewars.com/"
   },
   {
      name: "Hacker Rank",
      image: "https://hrcdn.net/og/default.jpg",
      url: "https://www.hackerrank.com/"
   },
   {
      name: "Duolingo",
      image: "https://www.duolingo.com/images/facebook/duo200.png",
      url: "https://www.duolingo.com/"
   },
   {
      name: "EDX",
      image:
         "https://www.edx.org/sites/default/files/edx_courses1200x630_v2-1.png",
      url: "https://www.edx.org/"
   },
   {
      name: "Academic Earth",
      image:
         "https://images.unsplash.com/photo-1472121779802-43c68a9f405f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be253c1f1153006c77ee6c75fec47ac1&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
      url: "http://academicearth.org/"
   },
   {
      name: "Archive",
      image:
         "https://images.unsplash.com/photo-1504355080015-bba52674577b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=090323df2e679b3b5df56edc7f2629cb&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
      url: "https://archive.org/"
   },
   {
      name: "Brightstorm",
      image: "https://d1kk77jy37m3hf.cloudfront.net/02-12-12-04-1001_md.jpg",
      url: "https://www.brightstorm.com/"
   },
   {
      name: "Wikipedia Random",
      image:
         "https://upload.wikimedia.org/wikipedia/commons/d/dd/Laura-Kamhuber-Album.jpg",
      url: "http://en.wikipedia.org/wiki/Special:Randompage"
   },
   {
      name: "Kurzgesagt",
      image:
         "https://yt3.ggpht.com/a-/AJLlDp0ChIUIvGTYhCbsFDCiIUkC4Y1pmFJGAguMXw=s900-mo-c-c0xffffffff-rj-k-no",
      url: "https://www.youtube.com/user/Kurzgesagt"
   }
];

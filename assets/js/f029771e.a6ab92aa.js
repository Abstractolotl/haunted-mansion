"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[146],{9450:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=t(4848),o=t(8453);const s={sidebar_position:3},i="File Structure",a={id:"filestructure",title:"File Structure",description:"In this section we will explain the file structure of a game. This will help you to understand how to organize your game and where to put your files.",source:"@site/docs/filestructure.md",sourceDirName:".",slug:"/filestructure",permalink:"/docs/filestructure",draft:!1,unlisted:!1,editUrl:"https://github.com/Abstractolotl/haunted-mansion/tree/main/docs/docs/filestructure.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/getting-started"},next:{title:"Components",permalink:"/docs/category/components"}},c={},l=[{value:"game.json",id:"gamejson",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"file-structure",children:"File Structure"})}),"\n",(0,r.jsx)(n.p,{children:"In this section we will explain the file structure of a game. This will help you to understand how to organize your game and where to put your files."}),"\n",(0,r.jsx)(n.p,{children:"Below is an example of a file structure for a game:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-plaintext",children:"my-game/                        # Root directory of the game\r\n\u251c\u2500\u2500 assets/                     # Contains all the assets of the game\r\n\u2502   \u251c\u2500\u2500 items/\r\n\u2502   \u2502   \u251c\u2500\u2500 item1.txt\r\n\u2502   \u2502   \u2514\u2500\u2500 item2.txt\r\n\u2502   \u251c\u2500\u2500 objects/\r\n\u2502   \u2502   \u251c\u2500\u2500 object1.txt\r\n\u2502   \u2502   \u2514\u2500\u2500 object2.txt\r\n\u2502   \u251c\u2500\u2500 background1.txt\r\n\u2502   \u2514\u2500\u2500 background2.txt\r\n\u2502\r\n\u2514\u2500\u2500 config/                     # Contains all the configuration files\r\n    \u251c\u2500\u2500 game.json\r\n    \u251c\u2500\u2500 index.json\r\n    \u251c\u2500\u2500 rooms/\r\n    \u2502   \u251c\u2500\u2500 room1.json\r\n    \u2502   \u2514\u2500\u2500 room2.json\r\n    \u251c\u2500\u2500 items/\r\n    \u2502   \u251c\u2500\u2500 item1.json\r\n    \u2502   \u2514\u2500\u2500 item2.json\r\n    \u2514\u2500\u2500 notes/\r\n        \u251c\u2500\u2500 note1.json\r\n        \u2514\u2500\u2500 note2.json\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Please note that this is just an example and you can organize your game files in any way you like. Just make sure configuration files are in the ",(0,r.jsx)(n.code,{children:"config"})," directory and assets are in the ",(0,r.jsx)(n.code,{children:"assets"})," directory."]}),"\n",(0,r.jsx)(n.p,{children:"However, it is recommended to keep a consistent structure to make it easier to navigate and maintain your game."}),"\n",(0,r.jsx)(n.h2,{id:"gamejson",children:"game.json"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"game.json"})," file is the main configuration file for the game. It contains general information about the game such as the title, description, author, and other settings."]}),"\n",(0,r.jsxs)(n.p,{children:["Here is an example of a ",(0,r.jsx)(n.code,{children:"game.json"})," file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "author": [\r\n    {\r\n      "name": "<AUTHOR_NAME>",\r\n      "email": "<EMAIL>",\r\n      "website": "<URL>"\r\n    }, ...\r\n  ],\r\n\r\n  "title": "<GAME_TITLE>",\r\n  "description": "<GAME_DESCRIPTION>",\r\n  "version": "1.0",\r\n  "tags": ["adventure", "puzzle", "ascii"],\r\n  \r\n  "settings": {\r\n    "indexPath": "index.json",\r\n    "entryRoomId": "entrance",\r\n    "startingItems": [],\r\n    "interface": {\r\n      "scene": [124, 10],\r\n      "actionLog": 32,\r\n      "padding": 5,\r\n      "inventory": {\r\n        "rows": 2,\r\n        "columns": 5,\r\n        "slotSize": [5, 3]\r\n      }\r\n    }\r\n  }\r\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);
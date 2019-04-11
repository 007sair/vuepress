module.exports = {
  title: "chan的学习笔记",
  description: "This is a Zeit Now 2.0 example",
  themeConfig: {
    nav: [
      {
        text: "React",
        link: "/react/",
        items: [
          { text: "官方文档笔记", link: "/react/doc-note/main-concepts" },
          { text: "react-router翻译", link: "/react/react-router/" }
        ]
      },
      { text: "笔记", link: "/note/" }
    ],
    sidebar: {
      "/react/doc-note/": ["main-concepts", "advanced-guides"],
      "/react/react-router/": [
        {
          title: "API",
          children: [
            "BrowserRouter",
            "HashRouter",
            "history",
            "Link",
            "location",
            "match",
            "matchPath",
            "MemoryRouter",
            "NavLink",
            "Prompt",
            "Redirect",
            "Route",
            "Router",
            "Switch",
            "withRouter"
          ].map(name => `api/${name}`)
        },
        {
          title: "GUIDES",
          children: [
            "Basic Components",
            "Code Splitting",
            "Dealing with Update Blocking",
            "Philosophy",
            "Quick Start",
            "Redux Integration",
            "Scroll Restoration",
            "Server Rendering",
            "Static Routes",
            "Testing"
          ].map(name => `guides/${name}`)
        }
      ]
      // "/react/": [
      //   "",
      //   {
      //     title: "官方笔记",
      //     collapsable: true,
      //     children: ["doc-note/main-concepts", "doc-note/advanced-guides"]
      //   }
      // ],
      // "/note/": [""]
    }
  }
};

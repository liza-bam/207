/* 207 HouseKeeping — icon set (functional UI line icons + check) */
(function () {
  const P = (d, key) => React.createElement("path", { d, key, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" });

  const PATHS = {
    phone: ["M3 5.5C3 4.1 4.1 3 5.5 3H7c.5 0 .9.3 1 .8l.9 3.2c.1.4 0 .9-.4 1.2L7 9.5a13 13 0 0 0 6 6l1.3-1.5c.3-.3.8-.5 1.2-.4l3.2.9c.5.1.8.5.8 1V17c0 1.4-1.1 2.5-2.5 2.5A13.5 13.5 0 0 1 3 5.5Z"],
    message: ["M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.3-5.3A8 8 0 1 1 21 12Z", "M8.5 11h7M8.5 14h4"],
    mail: ["M3 6.5h18v11H3z", "M3.5 7l8.5 6 8.5-6"],
    wand: ["M5 19l9-9", "M14.5 4.5 16 6M18 8l1.5 1.5M9 4l.8 1.6L11.5 6l-1.7.7L9 8.5l-.8-1.8L6.5 6l1.7-.4ZM18.5 13l.6 1.3 1.4.4-1.4.5-.6 1.3-.6-1.3-1.4-.5 1.4-.4Z"],
    arrow: ["M5 12h14", "M13 6l6 6-6 6"],
    check: ["M5 12.5l4.5 4.5L19 7"],
    sparkle: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z", "M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z"],
    leaf: ["M5 19c0-7 5-12 14-12 0 9-5 14-12 14a6 6 0 0 1-2-2Z", "M9 15c2-2 4-3 6-3.5"],
    spray: ["M7 9h6v11H7z", "M13 12h3l2-2V7", "M9 4h2v3H9z", "M13 5h.01M16 4h.01M15 7h.01"],
    anchor: ["M12 7v13", "M5 13a7 7 0 0 0 14 0", "M5 13H3l1.5-2M19 13h2l-1.5-2", "M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
    key: ["M14 8a4 4 0 1 1-5 5l-5 5v-2H2v-2l6-6a4 4 0 0 1 6-4Z", "M15.5 8.5h.01"],
    megaphone: ["M4 10v4l11 5V5L4 10Z", "M4 10H3v4h1M18 9a3 3 0 0 1 0 6"],
    facebook: ["M14 8.5h2.2M13 21V8.8C13 6.7 14.3 6 16 6h1.5M11 12.5h5"],
    star: ["M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z"],
    clock: ["M12 7v5l3 2", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"],
    shield: ["M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z", "M9 12l2 2 4-4"],
    pin: ["M12 21c4-4 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 3 7 7 11Z", "M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
    home: ["M4 11l8-7 8 7", "M6 10v9h12v-9", "M10 19v-5h4v5"],
    box: ["M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z", "M3.5 7.5 12 12l8.5-4.5M12 12v9"],
    tag: ["M4 13 11 6h7v7l-7 7-7-7Z", "M14.5 9.5h.01"],
    calendar: ["M4 6h16v15H4z", "M4 10h16M8 3v4M16 3v4"],
    wrench: ["M14.5 6.5a3.5 3.5 0 0 0-4.6 4.3l-5.6 5.6a1.5 1.5 0 0 0 2.1 2.1l5.6-5.6a3.5 3.5 0 0 0 4.3-4.6l-2 2-1.9-.5-.5-1.9 2-2Z"],
  };

  function Icon({ name, size = 24, style, className }) {
    const segs = PATHS[name] || [];
    return React.createElement(
      "svg",
      { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true" },
      segs.map((d, i) => P(d, i))
    );
  }

  window.Icon = Icon;
})();

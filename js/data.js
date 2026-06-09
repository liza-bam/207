/* 207 HouseKeeping — content data (plain JS, attached to window)
   MODEL: full-service Maine vacation-rental care across FOUR services:
   1) Housekeeping subscription  2) Tuning (projects)  3) Booking & Marketing  4) À la carte */
(function () {
  const PHONE_DISPLAY = "(207) 749-8348";
  const PHONE_TEL = "+12077498348";
  const EMAIL = "info@207housekeeping.com";
  const FB_URL = "https://www.facebook.com/housekeeping207/";

  /* =========================================================
     SERVICES OVERVIEW — the four pillars (shown up top)
     ========================================================= */
  const SERVICES = [
    {
      id: "housekeeping",
      icon: "sparkle",
      name: "Housekeeping",
      tag: "Subscription",
      price: "From $1,200/mo",
      blurb: "Turnovers, lawn, restocking, guest care \u2014 your whole monthly rhythm, one flat price.",
      anchor: "#housekeeping",
    },
    {
      id: "tuning",
      icon: "wand",
      name: "Tuning",
      tag: "Projects",
      price: "Consult $250",
      blurb: "From livable to booked solid \u2014 we scope it, quote it flat, and make it happen.",
      anchor: "#tuning",
    },
    {
      id: "marketing",
      icon: "megaphone",
      name: "Booking & Marketing",
      tag: "From $99/mo",
      price: "3 flat tiers",
      blurb: "Listing, pricing, guest messaging & marketing \u2014 flat monthly, never a percentage.",
      anchor: "#marketing",
    },
    {
      id: "alacarte",
      icon: "tag",
      name: "\u00c0 la carte",
      tag: "Per job",
      price: "No commitment",
      blurb: "Book any single service on its own \u2014 cleaning, handyman, lawn, exterior, and more.",
      anchor: "#alacarte",
    },
  ];

  /* =========================================================
     1) HOUSEKEEPING SUBSCRIPTION
     ========================================================= */
  const PLAN = {
    name: "Housekeeping Subscription",
    price: 1200,
    founding: 1000,
    foundingSpots: 5,
    tagline: "Your home, handled \u2014 for one flat monthly price.",
    note: "No percentage of your earnings. No surprise invoices. Everything below, every month.",
  };

  const INCLUDED = [
    { id: "turnover", icon: "sparkle", name: "Your turnovers", short: "Up to 8 bedroom-cleans a month",
      desc: "For a typical 2-bedroom, that's about 4 full guest-ready turnovers, every month \u2014 included." },
    { id: "lawn", icon: "leaf", name: "Your lawn", short: "Mowed & trimmed, four times a month",
      desc: "So the curb appeal is always there for that all-important first guest photo." },
    { id: "restock", icon: "box", name: "Restocking", short: "Four times a month",
      desc: "Coffee, paper, soap, the little things \u2014 so guests never open an empty cupboard." },
    { id: "emergencies", icon: "key", name: "The little emergencies", short: "Up to 4 quick visits a month",
      desc: "Forgotten keys, lockouts, and the \u201ccan you just check on it?\u201d moments." },
    { id: "guests", icon: "message", name: "Your guests", short: "Messaging, calls & coordination",
      desc: "We handle the back-and-forth, so you're not answering your phone at 10pm." },
    { id: "handyman", icon: "wrench", name: "Handyman visit", short: "Once a month, up to one hour",
      desc: "A loose hinge, a leaky faucet, a picture to hang \u2014 the small fixes, handled in a monthly visit." },
  ];

  const VALUE_ROWS = [
    { service: "Turnover cleaning (2-bedroom)", payg: "$150 / turnover", plan: "Up to 4 turnovers", value: "$600" },
    { service: "Lawn \u2014 mow & trim (\u00bd acre)", payg: "$50 / visit", plan: "4\u00d7 a month", value: "$200" },
    { service: "Restocking", payg: "$75 / visit", plan: "4\u00d7 a month", value: "$300" },
    { service: "Quick visits (keys, lockouts, checks)", payg: "$50 each", plan: "Up to 4 a month", value: "$200" },
    { service: "Guest messaging & coordination", payg: "$250 / month", plan: "Included", value: "$250" },
    { service: "Handyman visit (up to 1 hour)", payg: "$150 / visit", plan: "1\u00d7 a month", value: "$150" },
  ];
  const VALUE_TOTAL = "$1,700";
  const VALUE_PAY = "$1,200";

  const EXTRAS = [
    { icon: "leaf", name: "Extra lawn", unit: "per \u00bd acre / month", price: 75,
      desc: "Bigger lot? Add another half-acre of mowing & trimming to your monthly rhythm." },
    { icon: "home", name: "Extra bedroom", unit: "per bedroom / month", price: 300,
      desc: "Scales your turnovers and cleaning for homes larger than a standard 2-bedroom." },
    { icon: "wrench", name: "Handyman subscription", unit: "per month", price: 200, featured: true,
      desc: "Upgrade from one visit to four one-hour visits a month \u2014 $600 of work for $200." },
  ];

  /* =========================================================
     2) TUNING (project-based)
     ========================================================= */
  const TUNING = {
    consult: 250,
    visualization: 250,
    steps: [
      { n: "1", title: "Consult \u2014 $250", desc: "We walk your property, learn your goals and budget, and hand you a clear written plan plus one flat quote. Move ahead and the $250 comes off your project cost." },
      { n: "2", title: "The work", desc: "We bring in the crew and get it done \u2014 one flat quote, no hourly surprises, start to finish." },
    ],
    paths: [
      { icon: "sparkle", title: "Make it desirable", desc: "Your place works, but it's not wow. We elevate it \u2014 styling, fixes, the details guests notice and photos love \u2014 so it stands out and books." },
      { icon: "wand", title: "Flip it on a dime", desc: "Need it guest-ready fast without overspending? We make the high-impact, budget-smart changes that get you listed and earning quickly." },
    ],
    viz: "Want to see it before you commit? Our designer creates mock photos of roughly how your place will look, plus one round of changes to match your taste. A standalone design service, paid to the designer.",
  };

  /* =========================================================
     3) BOOKING & MARKETING (3 flat tiers)
     ========================================================= */
  const MARKETING_TIERS = [
    { name: "Basic", price: 99, pitch: "Get listed, get priced right.",
      features: ["Listing setup & optimization", "Smart, seasonal pricing"] },
    { name: "Standard", price: 199, popular: true, pitch: "We handle the guests, you relax.",
      features: ["Everything in Basic", "All guest messaging, inquiry to checkout", "Calendar management & sync"] },
    { name: "Premium", price: 299, pitch: "Fully hands-off, fully marketed.",
      features: ["Everything in Standard", "Social media marketing", "Monthly owner reporting"] },
  ];
  const WHY_FLAT = {
    title: "Why flat, not a percentage",
    body: "Most managers take 20% or more of everything you earn. We don't. You pay one predictable price and keep the rest \u2014 so the better your place does, the more you keep.",
    pairs: "Pairs with housekeeping. We handle your listing and your guests; our housekeeping team keeps the property guest-ready. Run them together for full coverage, or take either on its own.",
  };

  /* =========================================================
     4) À LA CARTE (per job)
     ========================================================= */
  const ALACARTE = [
    { group: "Cleaning", icon: "sparkle", items: [
      { name: "Turnover cleaning", price: "$75 / bed", desc: "A full guest-ready turnover: clean, fresh linens, restock, and staging between guests." },
      { name: "Deep / seasonal clean", price: "From $500", desc: "The big one \u2014 opening the season or closing it down. Varies by property size and condition." },
      { name: "Campers & mobile homes \u2014 deep clean", price: "From $1,000", desc: "Full interior deep clean for campers, RVs, and mobile homes." },
    ]},
    { group: "Handyman & repairs", icon: "wrench", items: [
      { name: "Handyman & repairs", price: "From $100 / visit", desc: "Locks, bulbs, breakers, screens, Ring doorbells, faucets, and the like. Odd jobs, fixes, and the small stuff that piles up. One-hour minimum." },
      { name: "Renovations", price: "By quote", desc: "Drywall, paint, fixtures, and small-to-medium renovation work. We scope it and give you one price." },
    ]},
    { group: "Lawn & landscaping", icon: "leaf", items: [
      { name: "Lawn \u2014 mow & trim", price: "$75 / visit", desc: "Up to \u00bd acre. Larger lots quoted." },
      { name: "Seasonal landscaping", price: "From $250", desc: "Spring open-up, fall clean-up, leaf removal, flower beds, brush clearing. By quote." },
    ]},
    { group: "Property & exterior", icon: "home", items: [
      { name: "Gutter cleaning", price: "From $125", desc: "Cleared, flushed, and checked." },
      { name: "Power washing", price: "By quote", desc: "Decks, docks, buildings, boats, kayaks, paddle boats." },
      { name: "Dock service", price: "By quote", desc: "Seasonal placing and removal, priced by size and location." },
      { name: "Seasonal open / close", price: "From $500", desc: "Get the property opened for the season or buttoned up for winter." },
    ]},
    { group: "Other", icon: "key", items: [
      { name: "Emergency lockout", price: "$125 / $200", desc: "$125 in Central, Midcoast & Western Maine; $200 in Northern, Rangeley & Southern Maine." },
      { name: "Social media advertising", price: "$75 / week", desc: "Peak-season exposure, February through August." },
    ]},
  ];
  const ALACARTE_NOTES = [
    "Materials are billed at cost plus 20%.",
    "Owners cover third-party professional costs (licensed electrical, plumbing, dock placement) \u2014 we manage and facilitate the work for you.",
    "\u201cBy quote\u201d items vary too much to flat-price, so we'll give you a clear number before any work begins.",
  ];

  /* =========================================================
     WIZARD — route across services
     ========================================================= */
  const WIZARD_NEEDS = [
    { id: "housekeeping", icon: "sparkle", title: "Ongoing housekeeping", sub: "Turnovers, lawn, restocking", serviceId: "housekeeping" },
    { id: "marketing", icon: "megaphone", title: "Booking & marketing", sub: "Listing, pricing, guests", serviceId: "marketing" },
    { id: "tuning", icon: "wand", title: "Tune up my property", sub: "Styling, fixes, fast flips", serviceId: "tuning" },
    { id: "cleaning", icon: "spray", title: "A one-time clean", sub: "Turnover or deep clean", serviceId: "alacarte" },
    { id: "handyman", icon: "wrench", title: "Handyman or repairs", sub: "Fixes, small projects", serviceId: "alacarte" },
    { id: "exterior", icon: "home", title: "Lawn or exterior", sub: "Mowing, gutters, docks", serviceId: "alacarte" },
  ];
  const PROPERTY_TYPES = ["Short-term rental", "Seasonal / vacation home", "Primary residence", "Multiple properties"];
  const TURNOVER_VOLUME = ["1\u20132 a month", "3\u20134 a month", "5\u20136 a month", "Seasonal only", "Not sure yet"];

  /* =========================================================
     SOCIAL PROOF
     ========================================================= */
  const REVIEWS = [
    { name: "Sarah M.", meta: "Rangeley \u00b7 Seasonal rental", stars: 5, color: "#007F7A",
      text: "One flat price and my whole month is handled. Turnovers, lawn, restocking \u2014 I don't think about any of it anymore. The welcome touches are such a nice bonus." },
    { name: "Dave & Linda P.", meta: "Midcoast \u00b7 Vacation home", stars: 5, color: "#005C58",
      text: "They handle our listing AND the cleaning, and we keep the percentage a big manager would've taken. No surprise invoices, no chasing anyone down." },
    { name: "Megan R.", meta: "Central Maine \u00b7 Airbnb host", stars: 5, color: "#07A3A2",
      text: "The tuning crew restyled our cabin and it books solid now. They scoped it, gave one flat quote, and just made it happen." },
    { name: "Tom B.", meta: "Western Maine \u00b7 Homeowner", stars: 5, color: "#00B589",
      text: "Reliable, friendly, and fair pricing. They show up when they say they will \u2014 which around here is harder to find than you'd think." },
  ];

  const BEFORE_AFTER = [
    { before: "photos/ba-kitchen-before.jpg", after: "photos/ba-kitchen-after.jpg", label: "Full kitchen reset",
      desc: "A cluttered, lived-in kitchen brought back to spotless and staged \u2014 ready for the next guest photo." },
    { before: "photos/ba-tile-before.jpg", after: "photos/ba-tile-after.jpg", label: "Floor & stove deep clean",
      desc: "Years of grime lifted off the tile and range until the whole room shines like new." },
    { before: "photos/ba-bedroom-before.jpg", after: "photos/ba-bedroom-after.jpg", label: "Hardwood floor revival",
      desc: "A dull, worn bedroom floor cleaned and refinished to a warm, guest-ready glow." },
  ];

  window.DATA = {
    PHONE_DISPLAY, PHONE_TEL, EMAIL, FB_URL,
    SERVICES,
    PLAN, INCLUDED, VALUE_ROWS, VALUE_TOTAL, VALUE_PAY, EXTRAS,
    TUNING, MARKETING_TIERS, WHY_FLAT, ALACARTE, ALACARTE_NOTES,
    WIZARD_NEEDS, PROPERTY_TYPES, TURNOVER_VOLUME,
    REVIEWS, BEFORE_AFTER,
  };
})();

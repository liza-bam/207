/* 207 HouseKeeping — content data (plain JS, attached to window)
   MODEL: full-service Maine vacation-rental care across FOUR services:
   1) Housekeeping subscription  2) Tuning (projects)  3) Booking & Marketing  4) À la carte */
(function () {
  const PHONE_DISPLAY = "(207) 598-9215";
  const PHONE_TEL = "+12075989215";
  const EMAIL = "support@207housekeeping.com";
  const FB_URL = "https://www.facebook.com/housekeeping207/";

  // Form delivery via our Cloudflare Worker (worker/contact.js).
  // The Worker holds the Brevo API key and routes both Contact and Wizard.
  const FORM_ENDPOINT = "https://207housekeeping-forms.alexandra-tayts.workers.dev/";

  /* =========================================================
     SERVICE AREA — single source of truth.
     Core (actively serve): Central Maine — Androscoggin & Cumberland,
     plus parts of Oxford & Franklin. Beyond: select spots by arrangement.
     ========================================================= */
  const SERVICE_AREA = {
    region: "Central Maine",
    towns: ["Portland", "Augusta", "Farmington", "Windham"],
    counties: "Androscoggin & Cumberland \u2014 plus parts of Oxford & Franklin",
    line: "Central Maine \u2014 Portland \u00b7 Augusta \u00b7 Farmington \u00b7 Windham",
    beyond: "Select spots beyond \u2014 like Rangeley & Old Orchard Beach \u2014 by arrangement.",
  };

  /* =========================================================
     SERVICES OVERVIEW — the four pillars (shown up top)
     ========================================================= */
  const SERVICES = [
    {
      id: "housekeeping",
      icon: "sparkle",
      theme: "teal",
      name: "Housekeeping",
      tag: "Subscription",
      price: "From $1,200/mo",
      blurb: "Turnovers, lawn, restocking, guest care \u2014 your whole monthly rhythm, one flat price.",
      anchor: "#housekeeping",
    },
    {
      id: "tuning",
      icon: "wand",
      theme: "lagoon",
      name: "Staging & renovation",
      tag: "Projects",
      price: "Consult $250",
      blurb: "Make it desirable or flip it on a dime \u2014 we scope it, quote it flat, and make it happen.",
      anchor: "#tuning",
    },
    {
      id: "marketing",
      icon: "megaphone",
      theme: "neon",
      name: "Booking & Marketing",
      tag: "From $99/mo",
      price: "3 flat tiers",
      blurb: "Listing, pricing, guest messaging & marketing \u2014 flat monthly, never a percentage.",
      anchor: "#marketing",
    },
    {
      id: "alacarte",
      icon: "tag",
      theme: "lemon",
      name: "Single Services",
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
    price: 2000,
    founding: 1000,
    foundingSpots: 5,
    tagline: "Your home, handled \u2014 for one flat monthly price.",
    note: "No percentage of your earnings. No surprise invoices. Everything below, every month.",
  };

  const INCLUDED = [
    { id: "lawn", icon: "leaf", name: "Lawn mowing & trim", short: "5 hours a month", value: "$500 value",
      desc: "Taking care of your lawn, 5 hours a month, so the curb appeal is always there." },
    { id: "guestsvc", icon: "gift", name: "Guest services", short: "5\u00d7 a month \u00b7 Supplies included", value: "$1,000 value",
      desc: "Restocking and gift baskets \u2014 coffee, TP, shampoo, soap, and a warm welcome basket that earns five-star reviews." },
    { id: "guestmgmt", icon: "message", name: "Guest Management", short: "5 visits \u00b7 Unlimited comms", value: "$1,000 value",
      desc: "House visits and communication \u2014 keys, lockouts, check-ins, and all the guest back-and-forth, so you're never answering your phone at 10pm." },
  ];

  const VALUE_ROWS = [
    { service: "Lawn \u2014 mow & trim", qty: "5", amount: "$500" },
    { service: "Guest services (restocking & gift baskets)", qty: "5", amount: "$1,000" },
    { service: "Guest Management (house visits & comms)", qty: "5", amount: "$1,000" },
  ];
  const VALUE_TOTAL = "$2,500";
  const VALUE_PAY = "$2,000";
  const VALUE_SAVINGS = "$500";

  const EXTRAS = [
    { icon: "sparkle", name: "Turnovers", unit: "base rate, two beds", price: 180, was: 200 },
    { icon: "home", name: "Extra beds", unit: "per bed", price: 50, was: 75 },
    { icon: "leaf", name: "Extra lawn care", unit: "/ hour", price: 90, was: 100 },
    { icon: "gift", name: "Guest services", unit: "per visit", price: 150, was: 200 },
  ];

  /* =========================================================
     2) TUNING (project-based)
     ========================================================= */
  const TUNING = {
    consult: 250,
    paths: [
      { id: "staging", title: "Staging", sub: "Make it desirable",
        desc: "Your place works, but it's not wow. We elevate it \u2014 styling, fixes, the details guests notice and photos love \u2014 so it stands out and books." },
      { id: "reno", title: "Renovation", sub: "Flip it on a dime",
        desc: "Need it guest-ready fast without overspending? We make the high-impact, budget-smart changes that get you listed and earning quickly." },
    ],
    timeline: [
      { n: "1", title: "Consultation", price: "$250", book: true,
        desc: "We walk your property, learn your goals and budget, and hand you a clear written plan plus one flat quote. Move ahead and the $250 comes off your project cost." },
      { n: "2", title: "Visualization",
        desc: "See it before the work begins \u2014 we create mock photos of roughly how your place will look, plus one round of changes to match your taste." },
      { n: "3", title: "The work",
        desc: "We bring in the crew and get it done \u2014 one flat quote, no hourly surprises. Our goal is to keep it as affordable as possible, start to finish." },
    ],
  };

  /* =========================================================
     3) BOOKING & MARKETING (3 flat tiers)
     ========================================================= */
  const MARKETING_TIERS = [
    { name: "Basic", price: 99, setup: 250, pitch: "Get listed, get priced right.",
      features: ["Listing setup & optimization", "Smart, seasonal pricing"] },
    { name: "Standard", price: 199, setup: 300, popular: true, pitch: "We handle the guests, you relax.",
      features: ["Everything in Basic", "All guest messaging, inquiry to checkout", "Calendar management & sync"] },
    { name: "Premium", price: 500, setup: 500, pitch: "Fully hands-off, fully marketed.",
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
      { name: "Turnover cleaning", price: "$200 + $75/bed", desc: "A full guest-ready turnover: clean, fresh linens, restock, and staging between guests. Base covers 1\u20132 beds; $75 per additional bed." },
      { name: "Deep / seasonal clean", price: "From $500", desc: "The big one \u2014 opening the season or closing it down. Varies by property size and condition." },
      { name: "Campers & mobile homes \u2014 deep clean", price: "From $1,000", desc: "Full interior deep clean for campers, RVs, and mobile homes." },
    ]},
    { group: "Handyman & repairs", icon: "wrench", items: [
      { name: "Handyman & repairs", price: "From $100 / visit", desc: "Locks, bulbs, breakers, screens, Ring doorbells, faucets, and the like. Odd jobs, fixes, and the small stuff that piles up. One-hour minimum." },
      { name: "Renovations", price: "By quote", desc: "Drywall, paint, fixtures, and small-to-medium renovation work. We scope it and give you one price." },
    ]},
    { group: "Lawn & landscaping", icon: "leaf", items: [
      { name: "Lawn \u2014 mow & trim", price: "$100 / hour", desc: "One-hour minimum." },
      { name: "Seasonal landscaping", price: "From $250", desc: "Spring open-up, fall clean-up, leaf removal, flower beds, brush clearing. By quote." },
    ]},
    { group: "Property & exterior", icon: "home", items: [
      { name: "Gutter cleaning", price: "From $125", desc: "Cleared, flushed, and checked." },
      { name: "Power washing", price: "By quote", desc: "Decks, docks, buildings, boats, kayaks, paddle boats." },
      { name: "Dock service", price: "By quote", desc: "Seasonal placing and removal, priced by size and location." },
      { name: "Seasonal open / close", price: "From $500", desc: "Get the property opened for the season or buttoned up for winter." },
    ]},
    { group: "Guest & property care", icon: "gift", items: [
      { name: "Quick visit", price: "$100 / visit", desc: "A check-in on your property: walk-through, security check, photos sent to you. Travel included across our Central Maine core." },
      { name: "Restocking", price: "$200 / visit", desc: "We shop, deliver, and put away \u2014 paper goods, coffee, soaps, and standard essentials. Supplies included. One trip, one price, nothing to think about." },
      { name: "Welcome gift baskets", price: "$75 each", desc: "Maine-made treats, arranged and placed before check-in. Your guests' first impression, handled." },
    ]},
    { group: "Other", icon: "key", items: [
      { name: "Lockout \u2014 Central Maine", price: "$125", desc: "Lockouts and quick rescues across our Central Maine core." },
      { name: "Lockout \u2014 Rangeley & OOB", price: "$200", desc: "Select areas farther out, like Rangeley & Old Orchard Beach. Outside these areas? Ask \u2014 we'll do our best." },
      { name: "Social media setup", price: "$500", desc: "Instagram and Facebook page setup \u2014 branded profile, starter posts, link-in-bio. One-time." },
      { name: "Social media advertising", price: "$300 / month", desc: "Feb\u2013Aug. We build, run, and tune your ad campaigns through peak booking season. Ad budget is yours \u2014 most owners start at $100\u2013200/month, billed directly to your card by Meta." },
    ]},
  ];
  const ALACARTE_NOTES = [
    "Outside our Central Maine core? Reach out \u2014 we'll do our best to get to you.",
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
    { name: "Dave & Linda P.", meta: "Windham \u00b7 Vacation home", stars: 5, color: "#005C58",
      text: "They handle our listing AND the cleaning, and we keep the percentage a big manager would've taken. No surprise invoices, no chasing anyone down." },
    { name: "Megan R.", meta: "Augusta \u00b7 Airbnb host", stars: 5, color: "#07A3A2",
      text: "The tuning crew restyled our cabin and it books solid now. They scoped it, gave one flat quote, and just made it happen." },
    { name: "Tom B.", meta: "Farmington \u00b7 Homeowner", stars: 5, color: "#00B589",
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

  /* Hero gallery strip — real cleans, scrolls in a loop near the top.
     All images are rendered at the same height (CSS); width is whatever
     each photo's aspect ratio gives. */
  const GALLERY = [
    "photos/gallery-01.jpg",
    "photos/gallery-02.jpg",
    "photos/gallery-03.jpg",
    "photos/gallery-04.jpg",
    "photos/gallery-05.jpg",
    "photos/gallery-06.jpg",
    "photos/gallery-07.jpg",
    "photos/gallery-08.jpg",
    "photos/gallery-09.jpg",
    "photos/gallery-10.jpg",
  ];

  window.DATA = {
    PHONE_DISPLAY, PHONE_TEL, EMAIL, FB_URL, FORM_ENDPOINT, SERVICE_AREA,
    SERVICES,
    PLAN, INCLUDED, VALUE_ROWS, VALUE_TOTAL, VALUE_PAY, VALUE_SAVINGS, EXTRAS,
    TUNING, MARKETING_TIERS, WHY_FLAT, ALACARTE, ALACARTE_NOTES,
    WIZARD_NEEDS, PROPERTY_TYPES, TURNOVER_VOLUME,
    REVIEWS, BEFORE_AFTER, GALLERY,
  };
})();

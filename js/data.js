/* 207 HouseKeeping — content data (plain JS, attached to window) */
(function () {
  const PHONE_DISPLAY = "(207) 749-8348";
  const PHONE_TEL = "+12077498348";
  const EMAIL = "207housekeeping@gmail.com";
  const FB_URL = "https://www.facebook.com/housekeeping207/";

  // ---- 3 management tiers (4 originals consolidated, plain English) ----
  const TIERS = [
    {
      id: "self",
      name: "Self-Service",
      fee: 10,
      tag: "You run the show — we back you up",
      desc:
        "You handle the listing, pricing, guest messages, cleaning and upkeep yourself. We step in on-site to line up and oversee the pros whenever you need a hand.",
      features: [
        "We coordinate plumbers, electricians & dock crews on your behalf",
        "On-site oversight of any service or repair visit",
        "24/7 guest lockout assistance",
        "You keep your own marketing & advertising",
      ],
      popular: false,
    },
    {
      id: "half",
      name: "Half Service",
      fee: 25,
      tag: "We split the work — your way",
      desc:
        "Also called hybrid management. You keep the parts you enjoy and hand off the rest. Typically we run the listing, pricing and guest communication while you arrange cleaning and maintenance — or flip it however suits you.",
      features: [
        "Listing management & smart pricing",
        "All guest communication, start to finish",
        "You arrange cleaning & maintenance (or we can)",
        "A flexible middle ground that grows with you",
      ],
      popular: true,
    },
    {
      id: "full",
      name: "Full Service",
      fee: 35,
      tag: "Completely hands-off, always guest-ready",
      desc:
        "Built by an Airbnb host, for hosts. We handle everything on-site and behind the scenes so you never lift a finger — including our specialty seasonal care for Maine rentals.",
      features: [
        "Listing, pricing, guest communication & financials",
        "Turnover cleaning, deep cleans & seasonal open/close",
        "Lawn, landscaping, flower beds & power washing",
        "Small repairs: plumbing, bulbs, breakers, locks, screens & Ring doorbells",
        "Welcome baskets, guest essentials & inventory tracking",
        "24/7 guest contact, lockouts & social media marketing",
      ],
      popular: false,
    },
  ];

  // ---- à la carte individual services ----
  const INDIVIDUAL = [
    {
      id: "cleaning",
      name: "Cleaning",
      desc: "Turnover, opening deep cleans & closing cleans.",
      price: "From $50",
      unit: "varies by property",
      icon: "sparkle",
    },
    {
      id: "lawn",
      name: "Lawn care",
      desc: "Opening season, fall clean-up & summer maintenance.",
      price: "Quote",
      unit: "varies by property",
      icon: "leaf",
    },
    {
      id: "wash",
      name: "Power washing",
      desc: "Decks, buildings, docks, paddle boats, kayaks & boats.",
      price: "Quote",
      unit: "varies by job",
      icon: "spray",
    },
    {
      id: "docks",
      name: "Dock service",
      desc: "Seasonal placing & removal of your dock.",
      price: "Quote",
      unit: "varies by size & location",
      icon: "anchor",
    },
    {
      id: "lockout",
      name: "Emergency lockouts",
      desc: "Central, Midcoast & Western Maine · Northern, Rangeley & Southern Maine.",
      price: "$125 / $200",
      unit: "by region",
      icon: "key",
    },
    {
      id: "social",
      name: "Social media advertising",
      desc: "Maximum exposure through peak season, February–August.",
      price: "$75",
      unit: "per week",
      icon: "megaphone",
    },
  ];

  const SAME_DAY_NOTE =
    "Same-day turnaround clean: +$50 (up to 3 bed / 2 bath), +$75 (4+ bed or 3+ bath). Owners cover all third-party professional costs (electrical, plumbing, dock placement) — we manage and facilitate the work for you.";

  // ---- wizard service options ----
  const WIZARD_SERVICES = [
    { id: "turnover", title: "Turnover cleaning", sub: "Between every guest" },
    { id: "deep", title: "Deep / seasonal clean", sub: "Opening or closing" },
    { id: "lawn", title: "Lawn & landscaping", sub: "Mow, beds, clean-up" },
    { id: "wash", title: "Power washing", sub: "Decks, docks, siding" },
    { id: "dock", title: "Dock placement", sub: "Put in / take out" },
    { id: "repairs", title: "Small repairs", sub: "Plumbing, locks, bulbs" },
    { id: "guest", title: "Guest communication", sub: "Messages & bookings" },
    { id: "marketing", title: "Listing & marketing", sub: "Pricing + social" },
  ];

  const PROPERTY_TYPES = ["Short-term rental", "Seasonal / vacation home", "Primary residence", "Multiple properties"];
  const FREQUENCIES = ["One-time", "Per turnover", "Weekly", "Bi-weekly", "Seasonal"];

  // ---- reviews (real FB page + clearly-swappable placeholders) ----
  const REVIEWS = [
    {
      name: "Sarah M.",
      meta: "Rangeley · Seasonal rental",
      stars: 5,
      text:
        "Rebekka and her team turn our lake house around between guests like clockwork. Spotless every single time and the welcome baskets are such a nice touch.",
      color: "#007F7A",
    },
    {
      name: "Dave & Linda P.",
      meta: "Midcoast · Vacation home",
      stars: 5,
      text:
        "They opened the camp for the season, handled the dock, and even met the plumber for us. One call and everything was just done. Worth every penny.",
      color: "#005C58",
    },
    {
      name: "Megan R.",
      meta: "Central Maine · Airbnb host",
      stars: 5,
      text:
        "Switched to full-service management last summer and my reviews have never been higher. Guests always mention how clean and stocked the place is.",
      color: "#07A3A2",
    },
    {
      name: "Tom B.",
      meta: "Western Maine · Homeowner",
      stars: 5,
      text:
        "Reliable, friendly, and fair pricing. They show up when they say they will — which around here is harder to find than you'd think.",
      color: "#00B589",
    },
  ];

  // ---- facebook feed (placeholder, swap with real posts) ----
  const FB_POSTS = [
    {
      meta: "2 days ago",
      text: "Another turnover done and guest-ready in the Rangeley region! Sweep up the savings.",
      img: "photos/bedroom-2.jpg",
      likes: 34,
      comments: 5,
    },
    {
      meta: "1 week ago",
      text: "Docks are going in across the lakes this week — book your placement before the season fills up.",
      img: "photos/dock.jpg",
      likes: 41,
      comments: 8,
    },
    {
      meta: "2 weeks ago",
      text: "Before & after on this seasonal opening deep clean. What a difference a day makes!",
      img: "photos/ba-floor-2.jpg",
      likes: 67,
      comments: 12,
    },
  ];

  const BEFORE_AFTER = [
    { img: "photos/ba-floor-1.jpg", label: "Floor restoration", where: "Seasonal opening" },
    { img: "photos/ba-floor-2.jpg", label: "Deep clean", where: "Kitchen turnover" },
    { img: "photos/ba-floor-3.jpg", label: "Floor refinish", where: "Camp open-up" },
  ];

  window.DATA = {
    PHONE_DISPLAY, PHONE_TEL, EMAIL, FB_URL,
    TIERS, INDIVIDUAL, SAME_DAY_NOTE,
    WIZARD_SERVICES, PROPERTY_TYPES, FREQUENCIES,
    REVIEWS, FB_POSTS, BEFORE_AFTER,
  };
})();

// ============================================================
//  婚禮網站內容設定 — 改這個檔案就能更新整個網站
// ============================================================

export const wedding = {
  // ---- 新人 ----
  coupleShort: "Coco & Sunny",
  coupleLong: "Coco & Sunny",

  // ---- 日期 / 地點 ----
  location: "Whistler, BC",
  dateText: "September 9–12, 2027",
  // 倒數計時目標（第一場活動）
  countdownTarget: "2027-09-09T17:00:00-07:00",

  heroImage:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
  // 首頁主視覺上方小字；留空 "" 則不顯示
  heroEyebrow: "Together with their families",

  // 密碼（GitHub Pages 靜態站：在瀏覽器端驗證，僅防 casual 訪客）
  // 也可用 GitHub Actions secret: NEXT_PUBLIC_SITE_PASSWORD
  sitePassword: "whistler2027",

  // ---- 四天活動流程 ----
  schedule: [
    {
      day: "Day 1",
      date: "Thursday · September 9",
      title: "Sangeet Evening",
      venue: "Whistler Sliding Centre",
      time: "Evening",
      coach: true,
      note: "An evening of music, high-energy dance performances, and celebration to welcome the wedding weekend.",
      noteItalic: "Get ready to hit the dance floor!",
      dressCode:
        "Festive Indian attire or cocktail wear in bright, celebratory colours.",
    },
    {
      day: "Day 2",
      date: "Friday · September 10",
      title: "Baraat, Wedding & Tea Ceremony",
      venue: "Riverland Equestrian Centre",
      time: "Morning – Afternoon",
      coach: true,
      note: "Weather permitting, the groom kicks off the Baraat with an epic skydiving entrance. Join the lively procession, followed by the Indian wedding and Taiwanese tea ceremony.",
      dressCode:
        "Traditional Indian attire or formal daytime wear. Bright colours encouraged.",
    },
    {
      day: "Day 3",
      date: "Saturday · September 11",
      title: "Reception",
      venue: "CN Roundhouse",
      time: "6:00 PM – 6:00 AM",
      coach: true,
      coachDetail:
        "Return coaches to the Hilton depart every hour from 11:00 PM.",
      note: "Dinner, drinks and dancing — music goes till dawn.",
      dressCode:
        "Black-tie / formal. Indian or Western formalwear both perfect.",
    },
    {
      day: "Day 4",
      date: "Sunday · September 12",
      title: "Goodbye Breakfast",
      venue: "The Hilton",
      time: "Morning",
      coach: false,
      note: "One last gathering together before we say our goodbyes.",
      dressCode: "Casual & Cozy — PJs are legally allowed.",
    },
  ],

  // ---- 接駁說明 ----
  coachNote:
    "A coach will run from the Hilton to each event and back. Detailed pick-up times will be shared closer to the date.",

  // ---- 交通 ----
  gettingToWhistler: {
    title: "Getting to Whistler",
    intro:
      "Fly into Vancouver International Airport (YVR), then continue up the scenic Sea-to-Sky Highway. You can rent a car, take a scheduled coach bus, or book a door-to-door shuttle — most journeys take about 1.5 to 2.5 hours.",
    operators: [
      {
        name: "Epic Rides",
        route: "Downtown Vancouver ↔ Whistler Village",
        fare: "From $33.50 CAD one-way ($44 round-trip)",
        highlights:
          "Direct non-stop coach · free skis & bikes · washrooms onboard",
        url: "https://epicrides.ca/",
      },
      {
        name: "YVR Skylynx",
        route: "YVR Airport & Downtown Vancouver ↔ Whistler",
        fare: "From ~$35 CAD downtown · from ~$60 CAD at YVR",
        highlights:
          "Large coaches · Wi-Fi & power outlets · washrooms onboard",
        url: "https://yvrskylynx.com/",
      },
      {
        name: "Whistler Shuttle",
        route: "YVR Airport ↔ Whistler hotels",
        fare: "From $79 CAD one-way",
        highlights:
          "Door-to-door hotel drop-off · scheduled around flight arrivals",
        url: "https://www.whistlershuttle.com/",
      },
    ],
    pickups: [
      "Downtown Vancouver — Melville Street, outside the Hyatt Regency (near Burrard SkyTrain)",
      "YVR Airport — YVR Skylynx kiosk at International Arrivals; coaches use Bus Bay 9",
      "Whistler — Gateway Bus Loop in Whistler Village (most coaches)",
    ],
    fareNote:
      "Fares are approximate and vary by season and service level. Please check each operator for current schedules and booking.",
  },

  // ---- 住宿 ----
  // Hilton 為你們的住宿；hotels 裡其他飯店為「周邊參考」可隨時增刪
  whereToStay: {
    intro:
      "Hilton Whistler Resort & Spa is our home base — Day 4 breakfast and all coaches depart from here. We've secured a group rate for our guests.",
    roomBlock: "Coco & Sunny Wedding",
    groupCode: "TBD",
    note:
      "We'd love for everyone to stay with us, but your presence matters most. Feel free to book any accommodation in the village that suits you.",
  },
  hotels: [
    {
      id: 1,
      name: "Hilton Whistler Resort & Spa",
      lat: 50.115,
      lng: -122.9483,
      distance: "Home Base",
      rating: 4.5,
      price: 289,
      currency: "CAD",
      priceNote: "Group rate · per night",
      isHostHotel: true,
      groupCode: "TBD",
      bookingUrl: "https://www.hilton.com/en/hotels/ywhwawa-hilton-whistler-resort-and-spa/",
      mapUrl:
        "https://www.google.com/maps/search/Hilton+Whistler+Resort+%26+Spa",
      images: [
        "https://www.hilton.com/im/en/YWSVRHF/17140968/untitled-design.png?impolicy=crop&cw=4000&ch=2239&gravity=NorthWest&xposition=0&yposition=380&rw=1200&rh=750",
        "https://images.trvl-media.com/lodging/1000000/30000/28000/27997/83170d5e.jpg?impolicy=resizecrop&rw=1200&ra=fit",
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFLskAP5PSzpKvkXefBU6NSCw8s_nrqOJ9tUEndLeSC3uvfboEELmghH2JPMvvPvnM5qyxRSN9XvygSu6yS2zES6pjRHqQkG7A5JrUEjSvkLUinoguP5b1mvN-_-cE96Pz0EcdHnSHK7okb=w1200-h765-k-no",
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG3Er4_xxCw-ROyTc6-D3T-ulPxlRw4ZJWeP_f15D_pokwxNMfXca5o87q1ydhDMhB0Ho0GSwpryuCtvPHD8jnwTH-ziDgQ4HwXPgPFF7oBagaM1MKiAYRVUYMqvtTboIkpM7qYEwxkQ4A=w1200-h803-k-no",
      ],
    },
  ],

  // ---- 旅遊景點 ----
  exploreIntro:
    "We'd love for you to make a trip of it. If you're staying a few extra days, here are some popular spots in and around Whistler that guests often enjoy.",
  activities: [
    {
      name: "Peak 2 Peak Gondola",
      desc: "Ride between Whistler and Blackcomb mountains with breathtaking alpine views.",
    },
    {
      name: "Scandinave Spa",
      desc: "Outdoor Nordic baths tucked into the forest — pure relaxation.",
    },
    {
      name: "Lost Lake & Trails",
      desc: "Easy lakeside walks, swimming, and miles of biking trails.",
    },
    {
      name: "Whistler Village",
      desc: "Boutique shopping, patios, and après-ski energy year round.",
    },
    {
      name: "Brandywine Falls",
      desc: "A short drive to a stunning 70-metre waterfall lookout.",
    },
    {
      name: "Sea to Sky Highway",
      desc: "One of the world's most scenic drives between Vancouver and Whistler.",
    },
  ],

  // ---- Registry ----
  registryIntro:
    "Your presence is the greatest gift of all. For those who have asked, we've put together a registry — details will be added here soon.",
  registries: [
    { name: "Registry details coming soon", url: "" },
  ],

  // ---- FAQ ----
  faqs: [
    {
      q: "Can I bring a plus-one?",
      a: "We're keeping the celebration intimate, so plus-ones are by invitation only. When you RSVP, the website will show exactly who is included in your party.",
    },
    {
      q: "Are children welcome?",
      a: "We love your little ones! Please let us know in your RSVP so we can plan accordingly.",
    },
    {
      q: "How do I get to Whistler?",
      a: "Most guests fly into Vancouver (YVR) and drive or shuttle ~2 hours up the scenic Sea to Sky Highway. See the Hotel & Travel section for details.",
    },
    {
      q: "Will there be transportation between events?",
      a: "Yes — a coach runs from the Hilton to each event and back. Times will be shared closer to the date.",
    },
    {
      q: "What should I wear?",
      a: "Each event has a dress code — see the Schedule section. Most guests wear Indian traditional attire, but Western formalwear is always welcome.",
    },
    {
      q: "New to Indian attire?",
      a: "A few friendly pointers for our guests who'd like some guidance.",
      list: [
        "Not sure where to start? For women, a saree, lehenga, or anarkali works beautifully; for men, a kurta or sherwani.",
        "You can rent or buy online (search “lehenga rental” or “kurta set”) or visit an Indian boutique in your city — staff are happy to help you choose.",
        "When in doubt, jewel tones and bright colours are always a safe, joyful choice. Please avoid white and ivory (reserved for the couple) and all-black for daytime events.",
        "Reach out to us anytime — we're more than happy to help you pick something!",
      ],
    },
    {
      q: "What's the weather like in September?",
      a: "Early September in Whistler is mild — roughly 18°C / 64°F in the day and cooler at night. Bring a layer for the evenings.",
    },
  ],

  // ---- RSVP ----
  rsvpDeadline: "July 1, 2027",
  rsvpNameExample:
    "Ex. Jordan Lee (not The Lee Family or Dr. & Mr. Lee)",
  rsvpSelectPrompt: "Select your info below or try searching again.",
  rsvpSelectHelp:
    "If none of these are you, please reach out to the couple to see exactly how they entered your details.",
  rsvpSelectTrouble:
    "Still having trouble? Reach out to the couple and request access to their RSVP page.",
  rsvpContact: {
    label: "Can't find your name? Contact us",
    emails: ["chiajung1996@gmail.com", "sunnya97@gmail.com"],
  },

  // ---- 導覽列 ----
  nav: [
    { href: "#home", label: "Home" },
    { href: "#schedule", label: "Schedule" },
    { href: "#travel", label: "Hotel & Travel" },
    { href: "#explore", label: "Explore" },
    { href: "#registry", label: "Registry" },
    { href: "#rsvp", label: "RSVP" },
    { href: "#faqs", label: "FAQs" },
  ],
};

export type Wedding = typeof wedding;

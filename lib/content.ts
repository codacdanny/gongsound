// Single source of truth for Gongsound's site copy — lifted from the brand flier.
// Edit here; every section reads from this file.

export const SITE = {
  name: "Gongsound",
  full: "Gongsound Entertainment",
  location: "Benin City, Edo State",
  country: "Nigeria",
  email: "3point6@gongsoundentertainment.com",
  social: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

export const NAV = [
  { label: "Home", id: "home", href: "/" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Artists", id: "artists", href: "/#artists" },
  { label: "Music", id: "music", href: "/#music" },
  { label: "Events & Tours", id: "tours", href: "/tours" },
  { label: "News", id: "news", href: "/news" },
  { label: "Contact", id: "contact", href: "/#contact" },
] as const;

export const HERO = {
  eyebrow: "We amplify culture",
  line1: "Make a",
  line2: "Difference",
  intro:
    "Gongsound Entertainment is a culturally rooted entertainment company committed to discovering, developing and delivering world-class talent and experiences that celebrate who we are.",
  firstTourLabel: "Our first tours",
  firstTour: "Benin City, Edo State",
  firstTourNote: "The journey begins at home.",
  cta: "Discover more",
} as const;

// The four words orbiting the logo on the flier.
export const PILLARS_WORDS = ["Culture", "Identity", "Sound", "Legacy"] as const;

export const ABOUT = {
  kicker: "Who we are",
  headline: "A movement born in Benin City, built to carry our culture to the world.",
  body: [
    "We discover raw talent and develop it with intention — pairing timeless songwriting with world-class production so that the music we release outlives the moment it was made in.",
    "From the studio to the stage, every release and every show is engineered to celebrate who we are. This is not just entertainment. It is identity, sound, and legacy moving as one.",
  ],
  ceoName: "Vincent Agbonilahor",
  ceoRole: "Chief Executive Officer (CEO)",
  ceoQuote:
    "We are not chasing trends. We are building a legacy that begins at home and travels far.",
  stats: [
    { value: "01", label: "Home — Benin City" },
    { value: "10", label: "Artists on the debut album" },
    { value: "05", label: "Pillars of the business" },
    { value: "∞", label: "Culture to amplify" },
  ],
} as const;

export const SERVICES = [
  {
    no: "01",
    title: "Record Label",
    desc: "Nurturing raw talent and releasing timeless music rooted in our culture.",
    cta: "View artists",
  },
  {
    no: "02",
    title: "Artist Management",
    desc: "Building careers and managing success with purpose.",
    cta: "Learn more",
  },
  {
    no: "03",
    title: "Music Production",
    desc: "Professional production that brings visions to life with authentic sound.",
    cta: "Our services",
  },
  {
    no: "04",
    title: "Events & Tours",
    desc: "Creating unforgettable experiences that celebrate culture and connect people.",
    cta: "View tours",
  },
  {
    no: "05",
    title: "News & Updates",
    desc: "Stay connected with our latest news, stories and cultural moments.",
    cta: "Read more",
  },
] as const;

export const ARTISTS = [
  "Akobe",
  "Influence Akaba",
  "Maleke",
  "Jacky Sula",
  "Lars-K",
  "Kabaka",
  "Ire",
  "Finn",
  "Alaska Agho",
  "Jaytunes",
] as const;

export const ALBUM = {
  badge: "Featured on the album",
  artist: "3Point6",
  title: "Legendary",
  subtitle: "The debut album",
  blurb:
    "Twelve voices, one movement. Legendary is the sound of Benin City taking its place on the world stage — produced, performed and released with intention.",
  cta: "Stream / Pre-save",
  featuring: ARTISTS,
} as const;

export const TOURS: ReadonlyArray<{
  day: string;
  month: string;
  title: string;
  place: string;
  note: string;
  venue?: string;
  time?: string;
  ticketUrl?: string;
}> = [
  {
    day: "24",
    month: "Aug",
    title: "Gongsound Live in Benin City",
    place: "Benin City, Edo State",
    note: "The movement begins at home.",
    venue: "Livespot Festival Grounds",
    time: "7:00 PM - 11:00 PM WAT",
    ticketUrl: "#contact",
  },
  {
    day: "21",
    month: "Sep",
    title: "Culture in Motion Tour",
    place: "Lagos, Nigeria",
    note: "Music. Culture. Connection.",
    venue: "Eko Hotel & Suites",
    time: "6:00 PM - 10:30 PM WAT",
    ticketUrl: "#contact",
  },
  {
    day: "15",
    month: "Oct",
    title: "Legendary World Tour Kick-Off",
    place: "Accra, Ghana",
    note: "West African expansion begins.",
    venue: "Adom Pavilion",
    time: "8:00 PM WAT",
    ticketUrl: "#contact",
  },
];

export const NEWS: ReadonlyArray<{
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body?: string;
  author?: string;
  image?: string;
}> = [
  {
    tag: "Release",
    date: "Aug 2025",
    title: "3Point6 announces debut album 'Legendary'",
    excerpt:
      "The label's flagship project brings twelve artists together for a record rooted in culture and built for the world.",
    body: "Gongsound is thrilled to announce the release of 3Point6's debut album 'Legendary' — a bold statement of artistry, culture, and intent. Featuring twelve of West Africa's most compelling voices, the album showcases the depth and range of the Gongsound vision: raw talent, refined production, and timeless songwriting. From introspective ballads to dancefloor moments, Legendary is a masterclass in contemporary African music.",
    author: "Gongsound Team",
  },
  {
    tag: "Tour",
    date: "Aug 2025",
    title: "Gongsound Live returns to Benin City",
    excerpt:
      "Our first headline experience comes home — a night of sound, identity and legacy where the movement began.",
    body: "The journey that began in Benin City is coming full circle. Gongsound Live will bring the complete roster of artists, producers, and collaborators home for a night of celebration. Expect an immersive experience: live performances, visual design, and a soundscape that honors the culture we amplify. This is where it all started. This is where we return.",
    author: "Gongsound Presents",
  },
  {
    tag: "Studio",
    date: "Jul 2025",
    title: "Inside the Gongsound production house",
    excerpt:
      "A look at how raw talent becomes timeless music inside the rooms where the Gongsound sound is made.",
    body: "Behind every release is a meticulous process. We sat down with our production team to explore the sonic philosophy that defines Gongsound. From pre-production sessions to final mastering, discover how we balance artistic vision with technical excellence. The studio isn't just a room — it's a sanctuary where culture becomes sound.",
    author: "Studio Insights",
  },
  {
    tag: "Artist",
    date: "Jul 2025",
    title: "Meet the roster: Gongsound's debut artists",
    excerpt:
      "Twelve artists, one movement. Get to know the voices behind Legendary.",
    body: "Each artist on the Gongsound roster brings a distinct voice and vision. From Akobe's lyrical precision to Alaska Agho's genre-bending approach, we celebrate the diversity and depth of our family. These are not just musicians — they are storytellers, innovators, and keepers of culture.",
    author: "Artist Spotlight",
  },
  {
    tag: "News",
    date: "Jun 2025",
    title: "Gongsound Entertainment officially launches",
    excerpt:
      "A new vision for African entertainment begins today.",
    body: "Today marks the official launch of Gongsound Entertainment. Founded with a mission to discover, develop, and deliver world-class talent and experiences, Gongsound is a commitment to authenticity in entertainment. We are rooted in our culture, ambitious in our vision, and intentional in every move we make. The journey begins at home. Welcome to the movement.",
    author: "Founder Statement",
  },
] as const;

export const CONTACT = {
  kicker: "Let's build something legendary",
  headline: "Tell us your sound.",
  body: "Artists, partners and press — reach out. The journey begins at home, but it never stays there.",
  cta: "Start a conversation",
} as const;

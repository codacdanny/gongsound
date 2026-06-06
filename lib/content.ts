// Single source of truth for Gongsound's site copy — lifted from the brand flier.
// Edit here; every section reads from this file.

export const SITE = {
  name: "Gongsound",
  full: "Gongsound Entertainment",
  location: "Benin City, Edo State",
  country: "Nigeria",
  email: "hello@gongsound.com",
  social: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

export const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Artists", id: "artists" },
  { label: "Music", id: "music" },
  { label: "Events & Tours", id: "tours" },
  { label: "News", id: "news" },
  { label: "Contact", id: "contact" },
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
  ceoName: "Chairman Crexus",
  ceoRole: "Founder & Chief Executive",
  ceoQuote:
    "We are not chasing trends. We are building a legacy that begins at home and travels far.",
  stats: [
    { value: "01", label: "Home — Benin City" },
    { value: "12", label: "Artists on the debut album" },
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
  "Stanley Yonwaan",
  "Ire",
  "Kingpin",
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

export const TOURS = [
  {
    day: "24",
    month: "Aug",
    title: "Gongsound Live in Benin City",
    place: "Benin City, Edo State",
    note: "The movement begins at home.",
  },
  {
    day: "21",
    month: "Sep",
    title: "Culture in Motion Tour",
    place: "Benin City, Edo State",
    note: "Music. Culture. Connection.",
  },
] as const;

export const NEWS = [
  {
    tag: "Release",
    date: "Aug 2025",
    title: "3Point6 announces debut album 'Legendary'",
    excerpt:
      "The label's flagship project brings twelve artists together for a record rooted in culture and built for the world.",
  },
  {
    tag: "Tour",
    date: "Aug 2025",
    title: "Gongsound Live returns to Benin City",
    excerpt:
      "Our first headline experience comes home — a night of sound, identity and legacy where the movement began.",
  },
  {
    tag: "Studio",
    date: "Jul 2025",
    title: "Inside the Gongsound production house",
    excerpt:
      "A look at how raw talent becomes timeless music inside the rooms where the Gongsound sound is made.",
  },
] as const;

export const CONTACT = {
  kicker: "Let's build something legendary",
  headline: "Tell us your sound.",
  body: "Artists, partners and press — reach out. The journey begins at home, but it never stays there.",
  cta: "Start a conversation",
} as const;

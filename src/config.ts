/* ============================================================================
   WEDDING PLANNER — CONFIG FILE  (src/config.ts)
   ----------------------------------------------------------------------------
   THIS is the only file you need to touch to make the site yours.
   Everything else (app.ts, index.html, style.css) just reads what's in here.

   YOU DO NOT NEED TO UNDERSTAND TYPESCRIPT TO EDIT THIS FILE.
   The lines like ": string" or ": CustomVariable[]" are just labels that help
   catch typos — you can ignore them. Just change the text inside the quotes
   "" and, for lists, copy/paste an existing line and edit the text.

   WHEN YOU'RE DONE EDITING:
     git add -A
     git commit -m "Update wedding details"
     git push
   GitHub will automatically rebuild and publish the site for you.
   (Full steps are in README.md if you've never used git before.)
   ============================================================================ */

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS — describe the "shape" of each kind of data below.
// You don't need to edit this section.
// ---------------------------------------------------------------------------
interface Couple {
  partner1: string;
  partner2: string;
  tagline: string;
  heroPhoto: string; // URL to a photo, or "" for none. See media/ folder.
  hashtag: string;
}

interface CustomVariable {
  label: string;
  value: string;
}

interface MediaItem {
  url: string;
  caption: string;
}

interface TimelineTask {
  id: string;        // unique, short, no spaces — never reuse an id
  date: string;       // "YYYY-MM-DD" — the target date to have this done by
  category: string;   // must match a key in CATEGORIES below
  title: string;       // short task name
  notes?: string;      // optional longer description
  link?: string;        // optional URL (vendor site, contract, Pinterest board, etc.)
  mediaUrl?: string;     // optional image URL for this task
}

// ---------------------------------------------------------------------------
// 1) THE BIG DATE
// Format: "YYYY-MM-DDTHH:MM:SS" (24-hour clock). This drives the countdown.
// ---------------------------------------------------------------------------
const WEDDING_DATE: string = "2028-06-17T17:00:00";

// ---------------------------------------------------------------------------
// 2) THE COUPLE
// ---------------------------------------------------------------------------
const COUPLE: Couple = {
  partner1: "Partner One",
  partner2: "Partner Two",
  tagline: "are getting married!",
  heroPhoto: "", // e.g. "media/engagement.jpg" or a full https:// URL
  hashtag: "#OurWedding2028"
};

// ---------------------------------------------------------------------------
// 3) CUSTOM VARIABLES
// Add or remove ANY row you want to track. The site automatically displays
// every row you put here in the "At a Glance" panel — no other file needs
// to change.
// ---------------------------------------------------------------------------
const CUSTOM_VARIABLES: CustomVariable[] = [
  { label: "Guest Count Target", value: "150–300" },
  { label: "Budget", value: "$20,000 – $50,000" },
  { label: "Wedding Style", value: "Classic / Traditional" },
  { label: "Location", value: "Local / Hometown (venue TBD)" },
  { label: "Venue", value: "Not booked yet" },
  { label: "Color Palette", value: "TBD" }
  // Examples of other things you could track:
  // { label: "Photographer", value: "Jane Doe Photography" },
  // { label: "Officiant", value: "TBD" },
  // { label: "RSVP Deadline", value: "2028-05-08" },
];

// ---------------------------------------------------------------------------
// 4) MEDIA GALLERY
// Add photos here — engagement photos, venue shots, inspiration pictures.
// url can be a full https:// link, OR a file you drop into the media/ folder,
// referenced like "media/your-photo.jpg".
// ---------------------------------------------------------------------------
const MEDIA_GALLERY: MediaItem[] = [
  // { url: "media/engagement-1.jpg", caption: "Engagement photo, Spring 2026" },
  // { url: "https://example.com/venue.jpg", caption: "Dream venue inspiration" },
];

// ---------------------------------------------------------------------------
// 5) CATEGORIES & COLORS
// Every task's "category" field below must match one of these keys exactly.
// You can rename categories or change colors (any CSS hex color works).
// ---------------------------------------------------------------------------
const CATEGORIES: Record<string, string> = {
  "Foundations": "#6b7280",
  "Legal & Financial": "#7c3aed",
  "Guests & Stationery": "#2563eb",
  "Venue & Vendors": "#16a34a",
  "Attire & Beauty": "#db2777",
  "Logistics & Details": "#ea580c",
  "Ceremony & Vows": "#b91c1c",
  "Post-Wedding": "#0d9488"
};

// ---------------------------------------------------------------------------
// 6) THE TIMELINE — every key task, in chronological order.
// Feel free to: edit dates/titles/notes, delete tasks that don't apply,
// or copy a line and change the id/date/title to add a brand new task.
// ---------------------------------------------------------------------------
const TIMELINE_TASKS: TimelineTask[] = [
  { id: "t001", date: "2026-07-20", category: "Foundations", title: "Announce the engagement & celebrate", notes: "Share the news with close family and friends." },
  { id: "t002", date: "2026-07-27", category: "Legal & Financial", title: "Set the overall wedding budget", notes: "Agree on a target ($20k–$50k) and how it will be funded or split." },
  { id: "t003", date: "2026-08-03", category: "Guests & Stationery", title: "Draft the initial guest list", notes: "Rough headcount estimate: 150–300 guests." },
  { id: "t004", date: "2026-08-10", category: "Foundations", title: "Agree on wedding vision, style & color palette", notes: "Classic / traditional look and feel." },
  { id: "t005", date: "2026-08-17", category: "Foundations", title: "Decide on the wedding party", notes: "Bridesmaids, groomsmen, and officiant candidates." },
  { id: "t006", date: "2026-08-24", category: "Venue & Vendors", title: "Research & shortlist local venues", notes: "Ceremony + reception, capacity for 150–300 guests." },
  { id: "t007", date: "2026-09-07", category: "Venue & Vendors", title: "Tour top venue choices", notes: "Confirm availability for Summer 2028." },
  { id: "t008", date: "2026-09-21", category: "Venue & Vendors", title: "Book ceremony & reception venue", notes: "Pay deposit; lock in the date & time." },
  { id: "t009", date: "2026-09-28", category: "Venue & Vendors", title: "Decide whether to hire a wedding planner/coordinator", notes: "" },
  { id: "t010", date: "2026-10-05", category: "Venue & Vendors", title: "Book officiant", notes: "" },
  { id: "t011", date: "2026-10-19", category: "Venue & Vendors", title: "Research & book photographer", notes: "Popular local photographers get booked far in advance." },
  { id: "t012", date: "2026-11-02", category: "Venue & Vendors", title: "Research & book videographer", notes: "" },
  { id: "t013", date: "2026-11-16", category: "Attire & Beauty", title: "Start wedding dress shopping", notes: "Ordering + alterations can take 6–9 months." },
  { id: "t014", date: "2026-12-07", category: "Attire & Beauty", title: "Start groom/groomsmen attire research", notes: "" },
  { id: "t015", date: "2027-01-04", category: "Attire & Beauty", title: "Order the wedding dress", notes: "" },
  { id: "t016", date: "2027-01-18", category: "Venue & Vendors", title: "Book caterer & schedule tasting", notes: "Skip if catering is included with the venue." },
  { id: "t017", date: "2027-02-01", category: "Venue & Vendors", title: "Book florist", notes: "" },
  { id: "t018", date: "2027-02-15", category: "Venue & Vendors", title: "Book band/DJ & other entertainment", notes: "" },
  { id: "t019", date: "2027-03-01", category: "Venue & Vendors", title: "Book baker & schedule cake tasting", notes: "" },
  { id: "t020", date: "2027-03-15", category: "Guests & Stationery", title: "Create wedding website & gift registry", notes: "" },
  { id: "t021", date: "2027-04-05", category: "Guests & Stationery", title: "Send save-the-dates", notes: "Especially important with a large, local-but-large guest list." },
  { id: "t022", date: "2027-04-19", category: "Logistics & Details", title: "Start planning the honeymoon", notes: "Book flights/lodging early for better rates." },
  { id: "t023", date: "2027-05-03", category: "Logistics & Details", title: "Book hotel room blocks for out-of-town guests", notes: "" },
  { id: "t024", date: "2027-05-17", category: "Attire & Beauty", title: "Order bridesmaid dresses", notes: "" },
  { id: "t025", date: "2027-05-31", category: "Attire & Beauty", title: "Order groomsmen suits/tuxes", notes: "" },
  { id: "t026", date: "2027-06-14", category: "Attire & Beauty", title: "Book hair & makeup artist(s)", notes: "Consider a trial run closer to the date." },
  { id: "t027", date: "2027-06-28", category: "Venue & Vendors", title: "Reserve rental items", notes: "Tables, chairs, linens, tent — if the venue doesn't supply them." },
  { id: "t028", date: "2027-07-12", category: "Guests & Stationery", title: "Design & order the invitation suite", notes: "" },
  { id: "t029", date: "2027-07-26", category: "Legal & Financial", title: "Buy the wedding rings", notes: "" },
  { id: "t030", date: "2027-08-09", category: "Logistics & Details", title: "Book wedding-day transportation", notes: "Limo, party bus, or other transport." },
  { id: "t031", date: "2027-08-23", category: "Attire & Beauty", title: "First dress fitting", notes: "" },
  { id: "t032", date: "2027-09-06", category: "Logistics & Details", title: "Plan the rehearsal dinner", notes: "Venue + guest list." },
  { id: "t033", date: "2027-09-20", category: "Legal & Financial", title: "Purchase wedding/event insurance", notes: "" },
  { id: "t034", date: "2027-10-04", category: "Ceremony & Vows", title: "Finalize ceremony structure, readings & vows outline", notes: "Work with your officiant." },
  { id: "t035", date: "2027-10-18", category: "Venue & Vendors", title: "Menu tasting & finalize catering choices", notes: "" },
  { id: "t036", date: "2027-11-01", category: "Legal & Financial", title: "Research marriage license requirements", notes: "Rules & timing windows vary by jurisdiction — check your local office." },
  { id: "t037", date: "2027-11-15", category: "Ceremony & Vows", title: "Finalize music picks", notes: "Processional/recessional, first dance, reception playlist." },
  { id: "t038", date: "2027-11-29", category: "Attire & Beauty", title: "Second dress fitting", notes: "" },
  { id: "t039", date: "2027-12-13", category: "Legal & Financial", title: "Confirm all vendor contracts & payment schedules", notes: "" },
  { id: "t040", date: "2028-01-10", category: "Logistics & Details", title: "Order favors, signage & decor details", notes: "" },
  { id: "t041", date: "2028-02-07", category: "Logistics & Details", title: "Draft the day-of timeline", notes: "Share with the wedding party and every vendor." },
  { id: "t042", date: "2028-03-06", category: "Guests & Stationery", title: "Mail invitations", notes: "~14 weeks before, to give a large/local guest list time to plan." },
  { id: "t043", date: "2028-03-20", category: "Logistics & Details", title: "Finalize gifts for wedding party & parents", notes: "" },
  { id: "t044", date: "2028-04-03", category: "Guests & Stationery", title: "Draft the seating chart", notes: "" },
  { id: "t045", date: "2028-04-17", category: "Legal & Financial", title: "Apply for the marriage license", notes: "Double-check your local timing window before applying." },
  { id: "t046", date: "2028-05-01", category: "Attire & Beauty", title: "Final dress fitting & bustle practice", notes: "" },
  { id: "t047", date: "2028-05-08", category: "Guests & Stationery", title: "RSVP deadline", notes: "" },
  { id: "t048", date: "2028-05-15", category: "Guests & Stationery", title: "Finalize seating chart & headcount for caterer/venue", notes: "" },
  { id: "t049", date: "2028-05-22", category: "Logistics & Details", title: "Confirm final details with every vendor", notes: "Arrival times, contacts, day-of phone numbers." },
  { id: "t050", date: "2028-05-29", category: "Venue & Vendors", title: "Final venue walkthrough", notes: "" },
  { id: "t051", date: "2028-06-05", category: "Legal & Financial", title: "Pick up license, rings & attire; pack for the honeymoon", notes: "" },
  { id: "t052", date: "2028-06-10", category: "Logistics & Details", title: "Delegate day-of tasks", notes: "Emergency kit, tip envelopes, a designated point person." },
  { id: "t053", date: "2028-06-16", category: "Ceremony & Vows", title: "Rehearsal & rehearsal dinner", notes: "" },
  { id: "t054", date: "2028-06-17", category: "Ceremony & Vows", title: "WEDDING DAY!", notes: "Enjoy every second of it." },
  { id: "t055", date: "2028-06-24", category: "Post-Wedding", title: "Return rentals; begin preserving dress/flowers", notes: "" },
  { id: "t056", date: "2028-07-01", category: "Post-Wedding", title: "Send thank-you cards", notes: "" },
  { id: "t057", date: "2028-07-15", category: "Post-Wedding", title: "Complete name-change paperwork", notes: "If applicable." },
  { id: "t058", date: "2028-08-01", category: "Post-Wedding", title: "Leave reviews for vendors", notes: "" },
  { id: "t059", date: "2028-09-17", category: "Post-Wedding", title: "Pick up the final wedding album", notes: "" }
];

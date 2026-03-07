export const WHATSAPP_NUMBER = "94719201718"
export const PHONE_NUMBER = "+1 (234) 567-890"
export const EMAIL = "info@luxecraft.com"
export const ADDRESS = "123 Artisan Boulevard, Design District, NY 10001"
export const WORKING_HOURS = "Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM"

export interface CategoryGroup {
  id: string
  name: string
  subcategories: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  groupId: string
}

export interface Product {
  id: string
  name: string
  code: string
  description: string
  shortDescription: string
  price: number
  priceRange?: string
  images: string[]
  categoryGroupId: string
  subcategoryId: string
  woodType: string
  finishType: string
  dimensions: string
  usageType: "Residential" | "Commercial / Office" | "Outdoor"
  inStock: boolean
  woodOptions: string[]
  sizeOptions: string[]
  polishOptions: string[]
  rating: number
  reviewCount: number
}

export interface Project {
  id: string
  title: string
  location: string
  description: string
  shortDescription: string
  completionYear: number
  clientType: string
  images: string[]
  beforeImages: string[]
  afterImages: string[]
  productsUsed: string[]
  testimonial?: {
    text: string
    author: string
    role: string
  }
}

export interface QuoteRequest {
  id: string
  customerName: string
  phone: string
  email: string
  productName: string
  productCode: string
  woodType: string
  size: string
  address: string
  message: string
  status: "New" | "In Progress" | "Quoted" | "Confirmed" | "Closed"
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  text: string
  date: string
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: "seating",
    name: "Seating",
    subcategories: [
      { id: "sofas", name: "Sofas", groupId: "seating" },
      { id: "sectional-sofas", name: "Sectional Sofas", groupId: "seating" },
      { id: "armchairs", name: "Armchairs", groupId: "seating" },
      { id: "recliners", name: "Recliners", groupId: "seating" },
      { id: "stools", name: "Stools", groupId: "seating" },
      { id: "ottomans", name: "Ottomans", groupId: "seating" },
      { id: "benches", name: "Benches", groupId: "seating" },
      { id: "dining-chairs", name: "Dining Chairs", groupId: "seating" },
    ],
  },
  {
    id: "sleeping",
    name: "Sleeping & Resting",
    subcategories: [
      { id: "beds", name: "Beds", groupId: "sleeping" },
      { id: "mattress-sets", name: "Mattress Sets", groupId: "sleeping" },
      { id: "headboards", name: "Headboards", groupId: "sleeping" },
      { id: "daybeds", name: "Daybeds", groupId: "sleeping" },
      { id: "bunk-beds", name: "Bunk Beds", groupId: "sleeping" },
    ],
  },
  {
    id: "storage",
    name: "Storage & Organization",
    subcategories: [
      { id: "dressers", name: "Dressers", groupId: "storage" },
      { id: "chests", name: "Chests of Drawers", groupId: "storage" },
      { id: "bookcases", name: "Bookcases", groupId: "storage" },
      { id: "cabinets", name: "Cabinets", groupId: "storage" },
      { id: "armoires", name: "Armoires", groupId: "storage" },
      { id: "wardrobes", name: "Wardrobes", groupId: "storage" },
      { id: "shelves", name: "Shelves", groupId: "storage" },
    ],
  },
  {
    id: "tables",
    name: "Tables & Surfaces",
    subcategories: [
      { id: "dining-tables", name: "Dining Tables", groupId: "tables" },
      { id: "coffee-tables", name: "Coffee Tables", groupId: "tables" },
      { id: "end-tables", name: "End Tables", groupId: "tables" },
      { id: "nightstands", name: "Nightstands", groupId: "tables" },
      { id: "consoles", name: "Consoles", groupId: "tables" },
      { id: "desks", name: "Desks", groupId: "tables" },
    ],
  },
  {
    id: "office",
    name: "Office Furniture",
    subcategories: [
      { id: "office-desks", name: "Office Desks", groupId: "office" },
      { id: "ergonomic-chairs", name: "Ergonomic Chairs", groupId: "office" },
      { id: "file-cabinets", name: "File Cabinets", groupId: "office" },
      { id: "bookshelves", name: "Bookshelves", groupId: "office" },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Furniture",
    subcategories: [
      { id: "patio-sets", name: "Patio Sets", groupId: "outdoor" },
      { id: "outdoor-seating", name: "Outdoor Seating", groupId: "outdoor" },
      { id: "chaise-lounges", name: "Chaise Lounges", groupId: "outdoor" },
      { id: "hammocks", name: "Hammocks", groupId: "outdoor" },
    ],
  },
  {
    id: "accent",
    name: "Accent Furniture",
    subcategories: [
      { id: "accent-chairs", name: "Accent Chairs", groupId: "accent" },
      { id: "console-tables", name: "Console Tables", groupId: "accent" },
      { id: "mirrors", name: "Mirrors", groupId: "accent" },
      { id: "bar-carts", name: "Bar Carts", groupId: "accent" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment Furniture",
    subcategories: [
      { id: "tv-stands", name: "TV Stands", groupId: "entertainment" },
      { id: "media-consoles", name: "Media Consoles", groupId: "entertainment" },
    ],
  },
]

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Milano Sectional Sofa",
    code: "MLN-SEC-001",
    description: "Experience unparalleled comfort with our handcrafted Milano Sectional Sofa. Upholstered in premium grey fabric with deep cushioning, this modular piece adapts to your living space with effortless elegance. Solid oak frame ensures lasting durability.",
    shortDescription: "Handcrafted grey fabric sectional with deep cushioning and oak frame.",
    price: 4500,
    images: ["/images/product-1.jpg"],
    categoryGroupId: "seating",
    subcategoryId: "sectional-sofas",
    woodType: "Oak",
    finishType: "Natural Matte",
    dimensions: "120\" W x 90\" D x 34\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Oak", "Walnut", "Teak"],
    sizeOptions: ["Standard", "Large", "Extra Large"],
    polishOptions: ["Natural Matte", "Semi-Gloss", "Dark Stain"],
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "prod-002",
    name: "Windsor Leather Armchair",
    code: "WND-ARM-002",
    description: "The Windsor Armchair embodies timeless British craftsmanship. Deep-tufted cognac leather upholstery over a solid walnut frame creates an heirloom-quality piece that only improves with age. Brass-capped legs add a distinguished finishing touch.",
    shortDescription: "Tufted cognac leather armchair with walnut frame and brass accents.",
    price: 2800,
    images: ["/images/product-2.jpg"],
    categoryGroupId: "seating",
    subcategoryId: "armchairs",
    woodType: "Walnut",
    finishType: "Hand-Rubbed Oil",
    dimensions: "32\" W x 36\" D x 38\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Walnut", "Cherry", "Mahogany"],
    sizeOptions: ["Standard", "Oversized"],
    polishOptions: ["Hand-Rubbed Oil", "Dark Walnut", "Espresso"],
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: "prod-003",
    name: "Artisan Dining Table",
    code: "ART-DIN-003",
    description: "Our signature Artisan Dining Table is crafted from a single slab of solid walnut, hand-selected for its natural grain pattern. Seats six comfortably with a clean mid-century silhouette that anchors any dining room.",
    shortDescription: "Solid walnut slab dining table seating six, mid-century design.",
    price: 3800,
    priceRange: "$3,800 - $5,200",
    images: ["/images/product-3.jpg"],
    categoryGroupId: "tables",
    subcategoryId: "dining-tables",
    woodType: "Walnut",
    finishType: "Clear Coat",
    dimensions: "84\" W x 42\" D x 30\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Walnut", "Oak", "Maple"],
    sizeOptions: ["6-Seater", "8-Seater", "10-Seater"],
    polishOptions: ["Clear Coat", "Natural Matte", "Dark Walnut"],
    rating: 4.7,
    reviewCount: 31,
  },
  {
    id: "prod-004",
    name: "Serenity King Bed",
    code: "SRN-BED-004",
    description: "Drift into luxury with the Serenity King Bed. A plush upholstered headboard in serene blue fabric crowns a solid hardwood platform frame. Thoughtful details like hidden storage and cable management make this bed as practical as it is beautiful.",
    shortDescription: "Upholstered king bed in blue fabric with solid hardwood platform frame.",
    price: 3200,
    images: ["/images/product-4.jpg"],
    categoryGroupId: "sleeping",
    subcategoryId: "beds",
    woodType: "Maple",
    finishType: "Lacquer White",
    dimensions: "80\" W x 86\" D x 52\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Maple", "Oak", "Birch"],
    sizeOptions: ["Queen", "King", "California King"],
    polishOptions: ["Lacquer White", "Natural", "Grey Wash"],
    rating: 4.8,
    reviewCount: 15,
  },
  {
    id: "prod-005",
    name: "Nordic Bookcase",
    code: "NRD-BKC-005",
    description: "Scandinavian simplicity meets artisan craftsmanship. Five open shelves provide generous display and storage space, while the warm oak finish adds natural beauty to any room. Adjustable shelves accommodate books, art, and collectibles.",
    shortDescription: "Five-shelf oak bookcase with Scandinavian-inspired clean lines.",
    price: 1600,
    images: ["/images/product-5.jpg"],
    categoryGroupId: "storage",
    subcategoryId: "bookcases",
    woodType: "Oak",
    finishType: "Light Oak",
    dimensions: "36\" W x 14\" D x 72\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Oak", "Birch", "Pine"],
    sizeOptions: ["Standard", "Wide", "Narrow"],
    polishOptions: ["Light Oak", "Natural", "White Wash"],
    rating: 4.6,
    reviewCount: 22,
  },
  {
    id: "prod-006",
    name: "Carrara Coffee Table",
    code: "CRR-COF-006",
    description: "Italian-inspired elegance for your living space. A genuine Carrara marble top rests on a minimalist black iron base, creating a striking focal point. Each table features unique natural veining, making every piece one of a kind.",
    shortDescription: "Carrara marble top coffee table with black iron minimalist base.",
    price: 2200,
    images: ["/images/product-6.jpg"],
    categoryGroupId: "tables",
    subcategoryId: "coffee-tables",
    woodType: "Iron/Marble",
    finishType: "Polished",
    dimensions: "48\" W x 24\" D x 18\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Black Iron", "Brass", "Chrome"],
    sizeOptions: ["Round 36\"", "Oval 48\"", "Rectangle 54\""],
    polishOptions: ["Polished", "Matte", "Antiqued"],
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: "prod-007",
    name: "ErgoMax Office Chair",
    code: "ERG-CHR-007",
    description: "Engineered for all-day comfort, the ErgoMax features a breathable mesh back, adjustable lumbar support, and a synchronized tilt mechanism. Chrome accents and clean lines make it as stylish as it is functional.",
    shortDescription: "Ergonomic mesh office chair with adjustable lumbar and chrome base.",
    price: 950,
    images: ["/images/product-7.jpg"],
    categoryGroupId: "office",
    subcategoryId: "ergonomic-chairs",
    woodType: "Chrome/Mesh",
    finishType: "Polished Chrome",
    dimensions: "27\" W x 27\" D x 42-46\" H",
    usageType: "Commercial / Office",
    inStock: true,
    woodOptions: ["Chrome", "Matte Black", "Brushed Nickel"],
    sizeOptions: ["Standard", "Tall"],
    polishOptions: ["Polished Chrome", "Matte Black", "Brushed"],
    rating: 4.5,
    reviewCount: 42,
  },
  {
    id: "prod-008",
    name: "Heritage Nightstand",
    code: "HRT-NGT-008",
    description: "The Heritage Nightstand brings warmth and functionality to your bedside. Two spacious drawers with solid brass handles offer elegant storage, while the warm oak finish complements any bedroom decor.",
    shortDescription: "Two-drawer oak nightstand with solid brass handles.",
    price: 680,
    images: ["/images/product-8.jpg"],
    categoryGroupId: "tables",
    subcategoryId: "nightstands",
    woodType: "Oak",
    finishType: "Warm Oak",
    dimensions: "24\" W x 18\" D x 26\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Oak", "Walnut", "Cherry"],
    sizeOptions: ["Standard", "Wide"],
    polishOptions: ["Warm Oak", "Natural", "Dark Stain"],
    rating: 4.7,
    reviewCount: 19,
  },
  {
    id: "prod-009",
    name: "Riviera Patio Set",
    code: "RVR-PAT-009",
    description: "Bring resort-style luxury to your outdoor space. This premium wicker set includes a three-seat sofa, two armchairs, and a matching coffee table, all with weather-resistant white cushions that resist fading and moisture.",
    shortDescription: "Premium wicker patio set with weather-resistant white cushions.",
    price: 3600,
    images: ["/images/product-9.jpg"],
    categoryGroupId: "outdoor",
    subcategoryId: "patio-sets",
    woodType: "Synthetic Wicker",
    finishType: "Natural Weave",
    dimensions: "Set: Sofa 72\" W, Chairs 30\" W, Table 42\" W",
    usageType: "Outdoor",
    inStock: true,
    woodOptions: ["Natural", "Dark Brown", "Grey"],
    sizeOptions: ["4-Piece Set", "5-Piece Set", "6-Piece Set"],
    polishOptions: ["Natural Weave", "Dark Espresso", "Coastal Grey"],
    rating: 4.6,
    reviewCount: 14,
  },
  {
    id: "prod-010",
    name: "Velvet Media Console",
    code: "VLT-MED-010",
    description: "A sophisticated media center in rich dark walnut. Three generous compartments with cable management keep electronics organized, while adjustable shelves adapt to your equipment. Soft-close doors ensure quiet operation.",
    shortDescription: "Dark walnut media console with soft-close doors and cable management.",
    price: 1900,
    images: ["/images/product-10.jpg"],
    categoryGroupId: "entertainment",
    subcategoryId: "media-consoles",
    woodType: "Walnut",
    finishType: "Dark Walnut",
    dimensions: "72\" W x 18\" D x 24\" H",
    usageType: "Residential",
    inStock: true,
    woodOptions: ["Walnut", "Oak", "Teak"],
    sizeOptions: ["60\"", "72\"", "84\""],
    polishOptions: ["Dark Walnut", "Natural", "Espresso"],
    rating: 4.8,
    reviewCount: 21,
  },
  {
    id: "prod-011",
    name: "Provence Recliner",
    code: "PRV-RCL-011",
    description: "Sink into the embrace of our Provence Recliner. Premium Italian leather covers a solid hardwood frame with power reclining functionality. The gentle push-back mechanism ensures smooth, effortless reclining.",
    shortDescription: "Italian leather power recliner with solid hardwood frame.",
    price: 2400,
    images: ["/images/product-2.jpg"],
    categoryGroupId: "seating",
    subcategoryId: "recliners",
    woodType: "Hardwood",
    finishType: "Ebony",
    dimensions: "34\" W x 38\" D x 40\" H",
    usageType: "Residential",
    inStock: false,
    woodOptions: ["Hardwood", "Oak"],
    sizeOptions: ["Standard", "Wide"],
    polishOptions: ["Ebony", "Natural", "Cognac"],
    rating: 4.7,
    reviewCount: 12,
  },
  {
    id: "prod-012",
    name: "Executive Oak Desk",
    code: "EXC-DSK-012",
    description: "Command your workspace with the Executive Oak Desk. A generous work surface, built-in drawer organizers, and integrated cable routing combine functionality with stunning aesthetics in solid quarter-sawn oak.",
    shortDescription: "Quarter-sawn oak executive desk with integrated cable management.",
    price: 2800,
    images: ["/images/product-3.jpg"],
    categoryGroupId: "office",
    subcategoryId: "office-desks",
    woodType: "Oak",
    finishType: "Quarter-Sawn Natural",
    dimensions: "72\" W x 36\" D x 30\" H",
    usageType: "Commercial / Office",
    inStock: true,
    woodOptions: ["Oak", "Walnut", "Cherry"],
    sizeOptions: ["Standard 60\"", "Large 72\""],
    polishOptions: ["Quarter-Sawn Natural", "Dark Stain", "Light Finish"],
    rating: 4.9,
    reviewCount: 8,
  },
]

export const projects: Project[] = [
  {
    id: "proj-001",
    title: "Modern Villa Living Space",
    location: "Manhattan, New York",
    description: "A complete living space transformation for a luxury penthouse overlooking Central Park. We designed and installed custom sectional sofas, marble coffee tables, and bespoke entertainment consoles that complement the panoramic city views.",
    shortDescription: "Complete luxury penthouse living space with custom furniture throughout.",
    completionYear: 2025,
    clientType: "Residential",
    images: ["/images/project-1.jpg"],
    beforeImages: ["/images/project-2.jpg"],
    afterImages: ["/images/project-1.jpg"],
    productsUsed: ["prod-001", "prod-006", "prod-010"],
    testimonial: {
      text: "LuxeCraft transformed our penthouse into a masterpiece. Every piece feels like it was made specifically for our space.",
      author: "Alexandra Chen",
      role: "Homeowner",
    },
  },
  {
    id: "proj-002",
    title: "Corporate Executive Suite",
    location: "Chicago, Illinois",
    description: "Furnished a 5,000 sq ft executive suite for a Fortune 500 company. Custom oak desks, ergonomic seating, and bespoke conference room furniture created a workspace that inspires productivity and impresses clients.",
    shortDescription: "Fortune 500 executive suite with custom desks and conference furniture.",
    completionYear: 2025,
    clientType: "Corporate",
    images: ["/images/project-2.jpg"],
    beforeImages: ["/images/project-3.jpg"],
    afterImages: ["/images/project-2.jpg"],
    productsUsed: ["prod-007", "prod-012"],
    testimonial: {
      text: "The quality and attention to detail exceeded our expectations. Our team and clients are consistently impressed.",
      author: "Michael Torres",
      role: "CEO, Torres Holdings",
    },
  },
  {
    id: "proj-003",
    title: "Boutique Hotel Lobby",
    location: "Miami, Florida",
    description: "Designed and produced 40+ custom furniture pieces for a boutique hotel lobby and lounge area. Handcrafted sofas, accent tables, and a stunning reception desk create an unforgettable first impression.",
    shortDescription: "Boutique hotel lobby furnished with 40+ custom handcrafted pieces.",
    completionYear: 2024,
    clientType: "Hospitality",
    images: ["/images/project-3.jpg"],
    beforeImages: ["/images/project-1.jpg"],
    afterImages: ["/images/project-3.jpg"],
    productsUsed: ["prod-001", "prod-002", "prod-006"],
    testimonial: {
      text: "Our guests constantly compliment the furniture. LuxeCraft understood our brand and delivered beyond our vision.",
      author: "Sofia Martinez",
      role: "Hotel Manager",
    },
  },
  {
    id: "proj-004",
    title: "Private Residence Master Suite",
    location: "Beverly Hills, California",
    description: "Complete master suite redesign including a custom king bed with upholstered headboard, matching nightstands, walk-in closet system, and a reading nook with built-in shelving.",
    shortDescription: "Master suite redesign with custom bed, closet system, and reading nook.",
    completionYear: 2024,
    clientType: "Residential",
    images: ["/images/project-4.jpg"],
    beforeImages: ["/images/project-5.jpg"],
    afterImages: ["/images/project-4.jpg"],
    productsUsed: ["prod-004", "prod-008"],
    testimonial: {
      text: "The master suite is now my sanctuary. Every detail, from the headboard stitching to the drawer hardware, is perfect.",
      author: "James & Linda Park",
      role: "Homeowners",
    },
  },
  {
    id: "proj-005",
    title: "Fine Dining Restaurant",
    location: "San Francisco, California",
    description: "Furnished a Michelin-star restaurant with custom dining tables, upholstered chairs, and bar seating. The warm walnut and leather palette creates an intimate dining atmosphere.",
    shortDescription: "Michelin-star restaurant furnished with custom dining and bar seating.",
    completionYear: 2024,
    clientType: "Commercial",
    images: ["/images/project-5.jpg"],
    beforeImages: ["/images/project-6.jpg"],
    afterImages: ["/images/project-5.jpg"],
    productsUsed: ["prod-003"],
  },
  {
    id: "proj-006",
    title: "Oceanfront Villa Terrace",
    location: "Malibu, California",
    description: "Created a resort-inspired outdoor living space with custom teak and wicker furniture, weather-resistant cushions, and a dining area for twelve overlooking the Pacific Ocean.",
    shortDescription: "Oceanfront terrace with custom teak furniture and outdoor dining for twelve.",
    completionYear: 2025,
    clientType: "Residential",
    images: ["/images/project-6.jpg"],
    beforeImages: ["/images/project-4.jpg"],
    afterImages: ["/images/project-6.jpg"],
    productsUsed: ["prod-009"],
    testimonial: {
      text: "The outdoor space is now the heart of our home. The furniture has withstood ocean conditions beautifully.",
      author: "David & Maria Reeves",
      role: "Homeowners",
    },
  },
]

export const reviews: Review[] = [
  { id: "rev-001", productId: "prod-001", author: "Sarah M.", rating: 5, text: "Absolutely stunning sofa. The craftsmanship is incredible and it's so comfortable.", date: "2025-11-15" },
  { id: "rev-002", productId: "prod-001", author: "Robert K.", rating: 5, text: "Worth every penny. The quality of the fabric and the frame is exceptional.", date: "2025-10-28" },
  { id: "rev-003", productId: "prod-002", author: "Elena P.", rating: 5, text: "The leather has developed a beautiful patina. A true statement piece.", date: "2025-09-20" },
  { id: "rev-004", productId: "prod-003", author: "James L.", rating: 4, text: "Beautiful walnut grain. Minor delivery delay but the table is magnificent.", date: "2025-08-12" },
  { id: "rev-005", productId: "prod-004", author: "Amanda C.", rating: 5, text: "The most comfortable bed I've ever owned. The headboard fabric is luxurious.", date: "2025-07-05" },
  { id: "rev-006", productId: "prod-006", author: "Mark D.", rating: 5, text: "The marble veining is gorgeous. Exactly what our living room needed.", date: "2025-06-18" },
  { id: "rev-007", productId: "prod-007", author: "Lisa T.", rating: 4, text: "Great chair for long work days. Excellent lumbar support.", date: "2025-05-22" },
  { id: "rev-008", productId: "prod-010", author: "Kevin R.", rating: 5, text: "Perfect media console. The cable management is brilliant.", date: "2025-04-10" },
]

export const mockQuoteRequests: QuoteRequest[] = [
  {
    id: "qt-001",
    customerName: "John Smith",
    phone: "+1 555-0123",
    email: "john@example.com",
    productName: "Milano Sectional Sofa",
    productCode: "MLN-SEC-001",
    woodType: "Oak",
    size: "Large",
    address: "456 Park Ave, New York, NY",
    message: "Interested in custom fabric options for the Milano sectional.",
    status: "New",
    createdAt: "2026-02-28",
  },
  {
    id: "qt-002",
    customerName: "Maria Garcia",
    phone: "+1 555-0456",
    email: "maria@example.com",
    productName: "Artisan Dining Table",
    productCode: "ART-DIN-003",
    woodType: "Walnut",
    size: "8-Seater",
    address: "789 Oak St, Chicago, IL",
    message: "Need a custom size to fit our dining room. Can you accommodate 96 inches?",
    status: "In Progress",
    createdAt: "2026-02-25",
  },
  {
    id: "qt-003",
    customerName: "Robert Johnson",
    phone: "+1 555-0789",
    email: "robert@example.com",
    productName: "Serenity King Bed",
    productCode: "SRN-BED-004",
    woodType: "Maple",
    size: "California King",
    address: "321 Elm Dr, Beverly Hills, CA",
    message: "Would like to see fabric swatches before ordering.",
    status: "Quoted",
    createdAt: "2026-02-20",
  },
  {
    id: "qt-004",
    customerName: "Emily Davis",
    phone: "+1 555-0321",
    email: "emily@example.com",
    productName: "Windsor Leather Armchair",
    productCode: "WND-ARM-002",
    woodType: "Mahogany",
    size: "Oversized",
    address: "654 Maple Ln, San Francisco, CA",
    message: "Interested in a pair for my study. Any discount for bulk?",
    status: "Confirmed",
    createdAt: "2026-02-15",
  },
]

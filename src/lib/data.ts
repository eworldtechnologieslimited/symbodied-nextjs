export const stats = [
  { value: "500+", label: "Vendors" },
  { value: "10,000+", label: "Products" },
  { value: "₦50M+", label: "Donated" },
  { value: "25+", label: "Communities" },
];

export const programs = [
  { slug: "agriculture", name: "Agriculture", icon: "Leaf", desc: "Indigenous farming methods & an agri-marketplace for farm produce." },
  { slug: "medicine", name: "Medicine", icon: "Heart", desc: "Traditional & herbal medicine documentation and health access." },
  { slug: "technology", name: "Technology", icon: "LayoutGrid", desc: "Digital empowerment, tech education, and innovation for communities." },
  { slug: "textile", name: "Textile", icon: "Package", desc: "Artisan textiles, traditional weaving, and indigenous-fabric fashion." },
];

export const products = [
  { id: "p1", slug: "abakaliki-rice-50kg", category: "Agriculture", name: "Premium Abakaliki Rice — 50kg bag", vendor: "Ngozi Farms", price: 48000, unit: "bag", location: "Abakaliki, Ebonyi", seed: 0, image: "/images/products/img_68430d9ed1e0c.webp" },
  { id: "p2", slug: "handwoven-akwete-cloth", category: "Textile", name: "Handwoven Akwete Cloth — Royal Indigo", vendor: "Akwete Weavers Guild", price: 32500, unit: "piece", location: "Aba, Abia", seed: 3, image: "/images/products/img_684311659c135.webp" },
  { id: "p3", slug: "organic-palm-oil-25l", category: "Agriculture", name: "Organic Palm Oil — 25L keg", vendor: "Delta Greens", price: 28000, unit: "keg", location: "Warri, Delta", seed: 1, image: "/images/products/img_6843124136d42.webp" },
  { id: "p4", slug: "utazi-bitterleaf-bundle", category: "Medicine", name: "Dried Utazi & Bitterleaf Bundle", vendor: "Herbal Roots Co.", price: 6500, unit: "bundle", location: "Nsukka, Enugu", seed: 2, image: "/images/products/img_6843131043049.webp" },
  { id: "p5", slug: "yellow-garri-premium-10kg", category: "Agriculture", name: "Yellow Garri — Premium Sieve, 10kg", vendor: "Ife Staples", price: 12000, unit: "bag", location: "Ile-Ife, Osun", seed: 5, image: "/images/products/img_684456b1d3804.webp" },
  { id: "p6", slug: "adire-eleko-fabric-6yards", category: "Textile", name: "Adire Eleko Fabric — 6 yards", vendor: "Ìbàdàn Indigo", price: 18500, unit: "set", location: "Ibadan, Oyo", seed: 4, image: "/images/products/img_6844589446e3d.webp" },
  { id: "p7", slug: "solar-drying-kit", category: "Technology", name: "Solar Drying Kit for Smallholders", vendor: "BrightField Tech", price: 95000, unit: "kit", location: "Jos, Plateau", seed: 1, image: "/images/products/img_6844595e50774.webp" },
  { id: "p8", slug: "black-seed-oil-500ml", category: "Medicine", name: "Cold-Pressed Black Seed Oil — 500ml", vendor: "Sahel Naturals", price: 9800, unit: "bottle", location: "Kano, Kano", seed: 2, image: "/images/products/img_68445ac882443.webp" },
];

export const blogs = [
  { id: "b1", category: "Medicine", title: "The Dibia Pharmacopoeia: Documenting Igbo Herbal Knowledge", excerpt: "How communities are preserving centuries of botanical medicine for the next generation of healers.", author: "Dr. Ada Eze", date: "Jun 12, 2026", readTime: "6 min read", seed: 2, image: "/images/blogs/img_683c8bdbbd0ec.webp" },
  { id: "b2", category: "Agriculture", title: "Reviving Yam Barns: Storage Traditions That Still Work", excerpt: "Pre-colonial storage techniques are outperforming modern silos in humid climates.", author: "Chidi Nwosu", date: "Jun 8, 2026", readTime: "4 min read", seed: 0, image: "/images/blogs/img_683c97d33a54b.webp" },
  { id: "b3", category: "Textile", title: "From Loom to Runway: The Akwete Resurgence", excerpt: "A new generation of weavers is taking heritage cloth global without losing its soul.", author: "Ngozi Okafor", date: "Jun 2, 2026", readTime: "5 min read", seed: 3, image: "/images/blogs/img_683c9cfac47b4.webp" },
];

export const projects = [
  { id: "pr1", category: "Agriculture", name: "Cassava Processing Hub — Enugu", summary: "A shared mill so 40 smallholder farms can add value to their harvest locally.", raised: 3200000, target: 5000000, creator: "Enugu Farmers Co-op", daysLeft: 18, seed: 1, image: "/images/projects/img_684b4d4f7539a.webp" },
  { id: "pr2", category: "Technology", name: "Rural Cold-Storage Network", summary: "Solar-powered cold rooms to cut post-harvest losses across three states.", raised: 7800000, target: 12000000, creator: "BrightField Tech", daysLeft: 31, seed: 4, image: "/images/projects/img_684b4ebe13678.webp" },
  { id: "pr3", category: "Textile", name: "Akwete Weavers Training Centre", summary: "Equipping 120 young weavers with looms and market access.", raised: 1450000, target: 2500000, creator: "Weavers Guild", daysLeft: 9, seed: 3, image: "/images/projects/img_684b4ef8e74c6.webp" },
];

export const events = [
  { id: "e1", day: "24", month: "AUG", theme: "Cultural Programming", name: "Igbo Heritage & Agritech Summit", venue: "Eko Convention Centre", location: "Lagos", slotsLeft: 42, seed: 0 },
  { id: "e2", day: "07", month: "SEP", theme: "Marketplace", name: "Diaspora Vendor Expo 2026", venue: "Landmark Centre", location: "Lagos", slotsLeft: 15, seed: 5 },
  { id: "e3", day: "19", month: "SEP", theme: "Medicine", name: "Traditional Medicine Symposium", venue: "UNN Conference Hall", location: "Nsukka", slotsLeft: 88, seed: 2 },
];

export const navLinks = ["Home", "Shop", "Programs", "Blog", "Projects", "Events"];

export const footerCols = [
  {
    heading: "Marketplace",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Agriculture", href: "/shop?category=Agriculture" },
      { label: "Medicine", href: "/shop?category=Medicine" },
      { label: "Textile", href: "/shop?category=Textile" },
      { label: "Technology", href: "/shop?category=Technology" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Events", href: "/events" },
      { label: "Blog", href: "/blog" },
      { label: "Solidarity", href: "/solidarity" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

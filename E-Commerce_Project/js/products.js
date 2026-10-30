// Aurora Luxe - Comprehensive Product Catalog Database

const productsData = [
  {
    id: 1,
    name: "Aura SoundMax Pro Wireless ANC Headphones",
    tagline: "Studio-Grade Acoustic Precision with 60h Battery Life",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 249.99,
    originalPrice: 329.99,
    discount: "24% OFF",
    rating: 4.9,
    reviewsCount: 342,
    badge: "Bestseller",
    badgeType: "hot",
    isTrending: true,
    isHotDeal: true,
    stock: 8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight Obsidian", hex: "#0f172a" },
      { name: "Silver Lunar", hex: "#cbd5e1" },
      { name: "Titanium Blue", hex: "#1e3a8a" }
    ],
    sizes: [],
    shortDesc: "Experience uncompromising high-fidelity audio with hybrid active noise cancellation, custom 45mm beryllium drivers, and aerospace-grade ergonomic memory cushions.",
    description: "The Aura SoundMax Pro sets a new benchmark in wireless high-resolution audio. Featuring custom engineered 45mm neodymium dynamic drivers, dual-chamber acoustic architecture, and cutting-edge hybrid active noise cancellation capable of dampening up to 42dB of environmental rumble. With 60 hours of play time and ultra-fast USB-C fast charging (5 hours in 10 minutes), stay immersed wherever life takes you.",
    features: [
      "Hybrid Active Noise Cancellation (ANC) with Transparency Mode",
      "Custom 45mm Beryllium-coated dynamic drivers",
      "Up to 60 hours of continuous playback per charge",
      "Multi-point Bluetooth 5.3 with LDAC, AAC & aptX HD support",
      "Ergonomic aerospace memory foam with breathable protein leather"
    ],
    specs: {
      "Driver Size": "45mm Dynamic Beryllium",
      "Battery Life": "Up to 60 Hours (ANC Off) / 45 Hours (ANC On)",
      "Charging": "USB-C Quick Charge (10 mins = 5 hrs)",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.3 + 3.5mm Aux",
      "Warranty": "2 Years Global Limited Warranty"
    }
  },
  {
    id: 2,
    name: "Chronos Apex Ultra Titanium Smartwatch",
    tagline: "Rugged Aerospace Titanium with Dual-Band GPS & AMOLED Display",
    category: "electronics",
    categoryLabel: "Smart Electronics",
    price: 399.00,
    originalPrice: 479.00,
    discount: "17% OFF",
    rating: 4.8,
    reviewsCount: 218,
    badge: "Trending",
    badgeType: "trending",
    isTrending: true,
    isHotDeal: false,
    stock: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Raw Titanium", hex: "#94a3b8" },
      { name: "Space Black", hex: "#18181b" },
      { name: "Alpine Orange", hex: "#f97316" }
    ],
    sizes: ["42mm", "46mm"],
    shortDesc: "Sculpted from Grade 5 aerospace titanium, boasting an ultra-bright 2000 nits sapphire crystal display, offline maps, and medical-grade bio-sensors.",
    description: "Built for adventurers, executives, and fitness purists. The Chronos Apex Ultra features precision dual-frequency GNSS tracking, 100-meter water resistance, and ECG/blood oxygen diagnostics. With an unprecedented 14-day battery life on a single magnetic charge, you are always connected and informed.",
    features: [
      "Grade 5 aerospace titanium case with sapphire crystal glass",
      "Ultra-bright 1.43-inch AMOLED display (2,000 nits peak brightness)",
      "Multi-band L1/L5 dual-frequency satellite GPS tracking",
      "Comprehensive biosensor suite: ECG, SpO2, HRV, Stress & Sleep tracking",
      "100m (10 ATM) dive-certified water resistance"
    ],
    specs: {
      "Display": "1.43'' Sapphire AMOLED (466x466 px)",
      "Case Material": "Grade 5 Aerospace Titanium",
      "Water Resistance": "10 ATM / 100 Meters",
      "Battery Life": "14 Days Typical Use, 48h Full GPS Mode",
      "Sensors": "Optical Heart Rate, ECG, Pulse Oximeter, Barometer",
      "Weight": "56g (without strap)"
    }
  },
  {
    id: 3,
    name: "CyberKnit Cyberdeck Cyberpunk Bomber Jacket",
    tagline: "Waterproof Weatherproof Technical Fabric with Modular Pockets",
    category: "fashion",
    categoryLabel: "Urban Fashion",
    price: 189.50,
    originalPrice: 240.00,
    discount: "21% OFF",
    rating: 4.7,
    reviewsCount: 154,
    badge: "New Arrival",
    badgeType: "new",
    isTrending: true,
    isHotDeal: false,
    stock: 5,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Stealth Black", hex: "#09090b" },
      { name: "Cyber Olive", hex: "#3f4f34" },
      { name: "Cyber Violet", hex: "#4c1d95" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    shortDesc: "A masterclass in futuristic streetwear. Featuring waterproof DWR membrane, Fidlock magnetic closures, and hidden RFID-blocking device compartments.",
    description: "Merging haute couture aesthetics with technical utility. Crafted using 3-layer breathable micro-ripstop Cordura nylon fabric that repels torrential rains while maintaining breathable thermal regulation. Designed with articulated sleeves for total freedom of motion.",
    features: [
      "3-Layer breathable waterproof laminate (20,000mm rating)",
      "German-engineered Fidlock quick-release magnetic buckles",
      "Concealed internal pockets with RFID radiation shielding",
      "Reflective accents for high visibility in low-light environments",
      "Removable modular storm hood with bungee adjustments"
    ],
    specs: {
      "Fabric": "Cordura Ripstop Nylon + Teflon DWR",
      "Zippers": "YKK AquaGuard Waterproof Zips",
      "Lining": "Antimicrobial Silver-ion Mesh",
      "Care": "Machine wash cold, air dry",
      "Origin": "Designed in Milan"
    }
  },
  {
    id: 4,
    name: "Nebula Velocity Phantom Carbon Sneakers",
    tagline: "Propulsive Carbon-Fiber Plate & Nitrogen-Infused Cushioning",
    category: "fashion",
    categoryLabel: "Urban Fashion",
    price: 159.00,
    originalPrice: 199.00,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 420,
    badge: "Popular",
    badgeType: "trending",
    isTrending: true,
    isHotDeal: true,
    stock: 14,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Crimson Blaze", hex: "#dc2626" },
      { name: "Neon Cyber", hex: "#06b6d4" },
      { name: "Onyx Shadow", hex: "#111827" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    shortDesc: "Engineered for explosive energy return. Full-length curved carbon plate fused with supercritical nitrogen foam for an effortless, floating stride.",
    description: "The Nebula Velocity Phantom combines cutting-edge marathon engineering with sleek futuristic street silhouette. The breathable engineered monomesh upper molds like a second skin, while the multi-traction rubber outsole grips any urban surface wet or dry.",
    features: [
      "Full-length thermo-molded responsive carbon-fiber plate",
      "Supercritical nitrogen-infused dual-density midsole foam",
      "Breathable seamless aero-mesh upper prevents friction hotspots",
      "Laser-cut zonal ventilation for superior airflow",
      "Reinforced TPU heel counter for lateral lockdown stability"
    ],
    specs: {
      "Weight": "210g (Size 9)",
      "Drop": "8mm Heel-to-Toe Drop",
      "Plate": "Full 3K Carbon Composite",
      "Sole": "High-Abrasion Continental-Grade Rubber"
    }
  },
  {
    id: 5,
    name: "Lumina Minimalist Ergonomic Mechanical Keyboard",
    tagline: "Gasket-Mounted CNC Aluminum Chassis with Hot-Swappable Switches",
    category: "electronics",
    categoryLabel: "Smart Electronics",
    price: 179.99,
    originalPrice: 220.00,
    discount: "18% OFF",
    rating: 5.0,
    reviewsCount: 189,
    badge: "5.0 Rated",
    badgeType: "hot",
    isTrending: false,
    isHotDeal: false,
    stock: 9,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Anodized Silver", hex: "#e2e8f0" },
      { name: "Cosmic Charcoal", hex: "#1e293b" },
      { name: "Rose Quartz", hex: "#f43f5e" }
    ],
    sizes: ["75% Layout", "TKL (80%)"],
    shortDesc: "Silky acoustic typing profile, tri-mode wireless connectivity (2.4Ghz/BT5.1/USB-C), south-facing per-key RGB, and pre-lubed mechanical switches.",
    description: "Forged out of a solid block of 6063 aerospace aluminum, the Lumina Keyboard offers sublime acoustic dampening with five layers of sound absorption (Poron foam, IXPE switch pads, and silicone bottom gasket). Enjoy seamless multi-device switching between Mac, Windows, and iPad.",
    features: [
      "Full CNC anodized aluminum case with brass weight bar",
      "Gasket-mounted plate design for flexible, comfortable typing feel",
      "Hot-swappable 5-pin PCB compatible with Cherry, Gateron & Kailh",
      "Tri-mode: Bluetooth 5.1, low-latency 2.4G wireless, detachable USB-C",
      "Double-shot PBT dye-sublimated keycaps that resist finger oils"
    ],
    specs: {
      "Form Factor": "75% Compact (82 Keys + Rotary Dial)",
      "Battery": "4000mAh Rechargeable Lithium-ion (200h without RGB)",
      "Switches": "Factory-Lubricated Linear Crystal switches",
      "Weight": "1.85 kg (Pure Solid Aluminum)"
    }
  },
  {
    id: 6,
    name: "AeroGlide Artisan Minimalist Leather Messenger",
    tagline: "Handcrafted Full-Grain Tuscan Leather with Magnetic Quick Latch",
    category: "accessories",
    categoryLabel: "Luxury Accessories",
    price: 215.00,
    originalPrice: 280.00,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 97,
    badge: "Handcrafted",
    badgeType: "new",
    isTrending: false,
    isHotDeal: true,
    stock: 6,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Cognac Amber", hex: "#92400e" },
      { name: "Espresso Brown", hex: "#451a03" },
      { name: "Sleek Black", hex: "#0f172a" }
    ],
    sizes: ["14-inch Laptop", "16-inch Laptop"],
    shortDesc: "Timeless Italian craftsmanship meets modern executive functionality. Features a padded microfiber laptop cradle and quick-access magnetic pocket.",
    description: "Vegetable-tanned full-grain leather that matures with an illustrious personal patina over years of journeys. Equipped with custom gunmetal brass hardware, luggage pass-through sleeve, and dedicated compartments for tablets, chargers, and passport.",
    features: [
      "Vegetable-tanned full-grain leather sourced ethically from Tuscany",
      "Shock-absorbing microfiber sleeve fits up to 16'' MacBook Pro",
      "Solid cast zinc-alloy brass hardware with matte PVD coating",
      "Detachable ergonomic shoulder strap with contoured leather pad",
      "Rear trolley sleeve easily secures to luggage handle"
    ],
    specs: {
      "Dimensions": "39cm x 29cm x 9cm",
      "Capacity": "12 Liters",
      "Material": "100% Full Grain Tuscan Cowhide",
      "Hardware": "Matte Gunmetal Antique Brass"
    }
  },
  {
    id: 7,
    name: "Verve Horizon Studio ANC Earbuds",
    tagline: "Spatial Audio with Dynamic Head Tracking & Wireless Charging Case",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 139.00,
    originalPrice: 179.00,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 512,
    badge: "Top Seller",
    badgeType: "hot",
    isTrending: true,
    isHotDeal: true,
    stock: 22,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Pearl White", hex: "#f8fafc" },
      { name: "Graphite Dark", hex: "#1e293b" },
      { name: "Sage Mist", hex: "#84cc16" }
    ],
    sizes: [],
    shortDesc: "Pristine sound, adaptive noise cancellation, and crystal-clear 6-mic beamforming calls packed into an ergonomic, featherweight wireless earbud.",
    description: "Engineered with 11mm graphene dynamic drivers and high-definition LDAC codec support, the Verve Horizon Earbuds deliver studio-quality richness. Features seamless touch controls, IPX5 sweat-proofing, and Qi wireless charging compatibility.",
    features: [
      "Real-time Adaptive Noise Cancellation automatically adjusts to environment",
      "360° Spatial Audio immersion with gyroscope head tracking",
      "6-Microphone array with AI background noise suppression for crystal calls",
      "8 Hours playtime per bud, 36 hours total with aluminum Qi case",
      "IPX5 water & sweat resistant for intense workouts"
    ],
    specs: {
      "Codec Support": "LDAC, AAC, SBC",
      "Driver": "11mm Custom Graphene",
      "Case Charging": "USB-C + Qi Wireless Charging",
      "Water Resistance": "IPX5 Certified"
    }
  },
  {
    id: 8,
    name: "Solis Obsidian Ceramic Smart Temperature Mug",
    tagline: "App-Controlled Precision Heating Keeps Drinks at Exact Temperature",
    category: "home",
    categoryLabel: "Minimalist Living",
    price: 119.00,
    originalPrice: 149.00,
    discount: "20% OFF",
    rating: 4.7,
    reviewsCount: 164,
    badge: "Smart Home",
    badgeType: "new",
    isTrending: false,
    isHotDeal: false,
    stock: 11,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Ceramic Pure White", hex: "#f4f4f5" },
      { name: "Copper Rose", hex: "#b45309" }
    ],
    sizes: ["10 oz (295ml)", "14 oz (414ml)"],
    shortDesc: "Never drink cold coffee or tea again. Solis keeps your hot beverage precisely between 120°F and 145°F for up to 3 hours on battery or all day on the coaster.",
    description: "Crafted with scratch-resistant medical grade ceramic coating over an intelligent stainless core. Integrates with iOS and Android via Bluetooth to customize beverage presets, LED halo color, and track your daily caffeine intake.",
    features: [
      "Precise temperature control between 120°F - 145°F (48°C - 63°C)",
      "Smart auto-sleep sensor detects when mug is empty or motionless",
      "Scratch-resistant food-safe multi-coat ceramic finish",
      "Includes sleek minimalist charging coaster with braided cable",
      "Full iOS & Android companion app for customized presets"
    ],
    specs: {
      "Capacity": "14 oz (414 ml)",
      "Battery Life": "3 Hours off coaster, all day on coaster",
      "Connectivity": "Bluetooth Low Energy",
      "Waterproofing": "IPX7 Submersible up to 1 meter (hand wash)"
    }
  },
  {
    id: 9,
    name: "Eclipse Heritage Skeleton Mechanical Timepiece",
    tagline: "Exhibition Sapphire Dial with 72-Hour Automatic Movement",
    category: "accessories",
    categoryLabel: "Luxury Accessories",
    price: 549.00,
    originalPrice: 699.00,
    discount: "21% OFF",
    rating: 4.9,
    reviewsCount: 88,
    badge: "Limited Edition",
    badgeType: "hot",
    isTrending: true,
    isHotDeal: false,
    stock: 4,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Rose Gold & Black", hex: "#78350f" },
      { name: "Pure Stainless Silver", hex: "#94a3b8" }
    ],
    sizes: ["40mm Case"],
    shortDesc: "Watchmaking artistry at its peak. Open-worked skeleton dial showcases 28,800 vph intricate Swiss-caliber automatic movements behind anti-reflective sapphire.",
    description: "Constructed from surgical 316L stainless steel with hand-beveled bridges and blued screws visible from both the front and exhibition caseback. Complete with an Italian alligator-grain leather strap and butterfly deployment clasp.",
    features: [
      "Custom 24-Jewel self-winding mechanical automatic movement",
      "72-Hour extended power reserve with bi-directional winding rotor",
      "Scratch-proof double-domed sapphire crystal with anti-reflective AR coating",
      "5 ATM / 50m water resistance against rain and splashes",
      "Supple interchangeable genuine Italian calfskin leather band"
    ],
    specs: {
      "Case Diameter": "40 mm",
      "Case Thickness": "11.2 mm",
      "Jewels": "24 Synthetic Rubies",
      "Power Reserve": "72 Hours",
      "Frequency": "28,800 vibrations per hour (4Hz)"
    }
  },
  {
    id: 10,
    name: "Komorebi Sculptural Ambient Smart Desk Lamp",
    tagline: "Circadian Rhythm Lighting with Wireless Fast-Charging Base",
    category: "home",
    categoryLabel: "Minimalist Living",
    price: 145.00,
    originalPrice: 185.00,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 134,
    badge: "Award Winner",
    badgeType: "trending",
    isTrending: false,
    isHotDeal: true,
    stock: 15,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Matte Slate", hex: "#334155" },
      { name: "Nordic Birch Wood", hex: "#d97706" },
      { name: "Chalk White", hex: "#f8fafc" }
    ],
    sizes: [],
    shortDesc: "Sculptural architectural desk luminaire with dual-axis articulation, 98+ CRI natural sunlight simulation, and integrated 15W MagSafe wireless dock.",
    description: "Winner of the 2025 Red Dot Design Award. The Komorebi desk lamp eliminates eye fatigue during late-night programming and creative sprints. Smooth rotary dimmer adjusts color temperature seamlessly from warm 2200K sunset to crisp 6500K daylight.",
    features: [
      "Ultra-high Color Rendering Index (CRI > 98) for zero chromatic distortion",
      "Built-in 15W Qi fast charging pad on solid cast aluminum base",
      "Dual counterbalance friction hinges hold angle firmly without sagging",
      "Touchless gesture control: wave hand underneath to turn on/off",
      "Automated circadian cycle aligns with your local daylight hours"
    ],
    specs: {
      "Luminous Flux": "1200 Lumens (Dimmable 5% - 100%)",
      "Color Temp": "2200K - 6500K Tunable White",
      "Power": "24W Total (including 15W Qi Output)",
      "Lifespan": "50,000+ Hours LED Array"
    }
  },
  {
    id: 11,
    name: "Prism Polarized Titanium Aviator Sunglasses",
    tagline: "Ultralight Beta-Titanium Frames with Japanese Polarized Lenses",
    category: "accessories",
    categoryLabel: "Luxury Accessories",
    price: 129.00,
    originalPrice: 165.00,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 175,
    badge: "Trending",
    badgeType: "trending",
    isTrending: true,
    isHotDeal: false,
    stock: 18,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Gunmetal & Emerald", hex: "#065f46" },
      { name: "Gold & Gradient Amber", hex: "#b45309" },
      { name: "Matte Black & Polar Grey", hex: "#0f172a" }
    ],
    sizes: ["Medium (55mm)", "Large (58mm)"],
    shortDesc: "Weighing only 18 grams, sculpted from memory beta-titanium that bends without breaking. High-contrast Japanese polarizing filters protect 100% UV400 rays.",
    description: "Reimagining the classic aviator silhouette with aerodynamic geometric bevels. Hydrophobic and oleophobic coatings ensure water, smudges, and fingerprints wipe away effortlessly. Comes with a magnetized genuine leather folding case.",
    features: [
      "Ultralight flexible Japanese Beta-Titanium construction (18g)",
      "9-Layer polarized lenses with backside anti-reflective coating",
      "100% UV400 Protection (UVA, UVB, UVC shielding)",
      "Self-adjusting medical silicone nose pads won't snag hair",
      "Patented screwless barrel hinge system tested to 20,000 actuations"
    ],
    specs: {
      "Frame Weight": "18 Grams",
      "Lens Material": "Shatterproof CR-39 Optical Polymer",
      "Lens Width": "56 mm",
      "Bridge Width": "16 mm",
      "Temple Length": "145 mm"
    }
  },
  {
    id: 12,
    name: "Terra Pure Ceramic Ultrasonic Aromatherapy Diffuser",
    tagline: "Handcrafted Matte Bisque Ceramic with Whispering Ultrasonic Vapor",
    category: "home",
    categoryLabel: "Minimalist Living",
    price: 89.00,
    originalPrice: 110.00,
    discount: "19% OFF",
    rating: 4.9,
    reviewsCount: 203,
    badge: "Eco-Luxe",
    badgeType: "new",
    isTrending: false,
    isHotDeal: false,
    stock: 20,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Terracotta Sand", hex: "#c2410c" },
      { name: "Charcoal Slate", hex: "#334155" },
      { name: "Bone White", hex: "#f1f5f9" }
    ],
    sizes: ["200ml Tank"],
    shortDesc: "Transform your sanctuary. Hand-poured porcelain ceramic cover houses a 2.4MHz ultrasonic vibrating plate that dispenses essential oil vapor quietly.",
    description: "Designed to blend into high-end modern interiors like an artisanal stone sculpture. Features subtle warm ambient underglow, automated auto-shutoff when water runs dry, and dual mist settings (continuous or intermittent intervals).",
    features: [
      "Heavy hand-poured artisanal matte ceramic stone cover",
      "Whisper-quiet operation (<20dB) suitable for bedroom sleeping",
      "Up to 10 hours continuous mist / 18 hours intermittent mode",
      "Warm ambient candlelight LED glow with independent control",
      "BPA-free internal water reservoir with safety auto-shutoff"
    ],
    specs: {
      "Reservoir Capacity": "200 ml",
      "Coverage Area": "Up to 550 sq. ft.",
      "Ultrasonic Frequency": "2.4 MHz",
      "Dimensions": "8.7cm x 18cm",
      "Power": "12W DC Adapter included"
    }
  }
];

// Available coupon codes
const PROMO_CODES = {
  "AURORA20": { discountPercent: 20, description: "20% Discount applied!" },
  "SAVE10": { discountPercent: 10, description: "10% Discount applied!" },
  "FREESHIP": { discountPercent: 0, freeShipping: true, description: "Free Express Shipping applied!" }
};

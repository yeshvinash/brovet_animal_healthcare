// High-Fidelity LocalStorage Database Service with Seed Data for Brovet Animal Healthcare

const SEED_CATEGORIES = [
  { id: "cat-1", name: "Liquid Calcium" },
  { id: "cat-2", name: "Liver Tonics" },
  { id: "cat-3", name: "Mineral Mixtures" },
  { id: "cat-4", name: "Multivitamins" },
  { id: "cat-5", name: "Milk & Energy Boosters" },
  { id: "cat-6", name: "Uterine Tonic" },
  { id: "cat-7", name: "Mastitis Care" }
];

const SEED_PRODUCTS = [
  {
    id: "prod-brovit-h-1l",
    name: "Brovit-H (1 Litre) Multivitamin Liquid",
    category: "Multivitamins",
    categoryId: "cat-4",
    shortDescription: "Premium multivitamin liquid for milk production, udder tissue health, hair coat, and mastitis support in cattle.",
    detailedDescription: "Brovit-H (1 Litre) is a concentrated multivitamin liquid formulated to address drops in milk production, animal hair loss, udder tissue damage, and drops in egg production, while helping control mastitis. It supports the immune system and promotes healthy growth with a balanced vitamin–mineral complex including Selenium, Cobalt, and Zinc.",
    imageKey: "prod-brovit-h-1l",
    benefits: [
      "Helps reverse sudden drops in milk production.",
      "Supports udder tissue recovery and mastitis control.",
      "Improves hair coat condition and overall vitality.",
      "Strengthens immune response and promotes growth."
    ],
    ingredients: "Vitamin A (Palmitate), Vitamin D3, Vitamin E, Vitamin B12, Vitamin H, Vitamin C, Selenium, Cobalt, Zinc",
    suitableAnimals: "Cattle",
    usage: "Oral feed supplement. Shake well before use. Mix with feed or administer as directed by a veterinarian.",
    dosage: "As advised by veterinarian based on animal weight and production stage.",
    packagingSizes: "1 Litre",
    storageInstructions: "Store in a cool, dry place away from direct sunlight.",
    productFunction: "Supports the Immune System and promotes growth",
    efficacy: "Promotes growth & udder health",
    price: 700,
    currency: "INR",
    minOrderQty: "10 Bottles",
    supplyAbility: "1000 Bottles Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "10 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Other",
    specifications: [
      { parameter: "Pack Size", value: "1 Litre" },
      { parameter: "Minimum Order Quantity", value: "10 Bottles" },
      { parameter: "Price", value: "₹700 / Piece" },
      { parameter: "Delivery Time", value: "7 Days" },
      { parameter: "Supply Ability", value: "1000 Bottles / Month" }
    ],
    faqs: [
      { q: "What conditions does Brovit-H help with?", a: "It is used for drops in milk production, hair loss, udder tissue damage, egg production drops, and supportive control of mastitis." },
      { q: "What is the MOQ for the 1 Litre pack?", a: "Minimum order quantity is 10 bottles, packed 10 pieces per carton." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-brovit-h-250",
    name: "Brovit-H (250 ml) Multivitamin Liquid",
    category: "Multivitamins",
    categoryId: "cat-4",
    shortDescription: "Compact multivitamin liquid for dairy and livestock health care, growth support, and mastitis-related recovery.",
    detailedDescription: "Brovit-H (250 ml) delivers the same multivitamin care profile as the 1 Litre pack in a smaller bottle suited for smaller herds and retail distribution. It addresses milk drop, hair loss, udder tissue damage, egg production drops, and supports mastitis control with growth-promoting vitamins and trace minerals.",
    imageKey: "prod-brovit-h-250",
    benefits: [
      "Supports recovery from milk production drop.",
      "Aids hair coat and udder tissue health.",
      "Healthcare-focused multivitamin support.",
      "Convenient 250 ml pack for smaller herds."
    ],
    ingredients: "Vitamin A (Palmitate), Vitamin D3, Vitamin E, Vitamin B12, Vitamin H, Vitamin C, Selenium, Cobalt, Zinc",
    suitableAnimals: "Cattle",
    usage: "Oral liquid. Mix with feed or administer directly as advised.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "250 ml",
    storageInstructions: "Store cool and dry. Keep bottle tightly closed.",
    productFunction: "Health Care",
    efficacy: "Promotes growth",
    price: 230,
    currency: "INR",
    minOrderQty: "25 Bottles",
    supplyAbility: "1000 Bottles Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "25 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Multivitamin Liquid",
    specifications: [
      { parameter: "Pack Size", value: "250 ml" },
      { parameter: "Minimum Order Quantity", value: "25 Bottles" },
      { parameter: "Price", value: "₹230 / Piece" },
      { parameter: "Packaging", value: "25 pieces per carton" }
    ],
    faqs: [
      { q: "Is the formula the same as the 1 Litre pack?", a: "Yes — the active vitamin and mineral profile matches Brovit-H 1 Litre in a smaller pack size." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-brocal-forte-5l",
    name: "Brocal-Forte (5 Litre) Liquid Calcium",
    category: "Liquid Calcium",
    categoryId: "cat-1",
    shortDescription: "Nutritional liquid calcium with phosphorus, vitamins, and galactagogue herbs for milk yield and calcium deficiency.",
    detailedDescription: "Brocal-Forte (5 Litre) is a nutritional liquid calcium formulation designed to address down milk production and calcium deficiency in cattle. Fortified with Phosphorus, Vitamin D3, Vitamin B12, and traditional galactagogue herbs Jivanti and Shatavari for healthier lactation performance.",
    imageKey: "prod-brocal-forte-5l",
    benefits: [
      "Supports milk production when yield is declining.",
      "Helps correct calcium deficiency in dairy cattle.",
      "Herbal galactagogue support with Jivanti & Shatavari.",
      "Economical 5 Litre pack for herd use."
    ],
    ingredients: "Calcium, Phosphorus, Vitamin D3, Vitamin B12, Jivanti, Shatavari",
    suitableAnimals: "Cattle",
    usage: "Oral nutritional supplement. Mix with feed or drench as directed.",
    dosage: "As advised by veterinarian based on herd needs.",
    packagingSizes: "5 Litre",
    storageInstructions: "Store upright in a cool, shaded place.",
    productFunction: "Nutritional",
    efficacy: "Promotes healthy lactation",
    price: 300,
    currency: "INR",
    minOrderQty: "3 Pieces",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "3 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Liquid Calcium",
    specifications: [
      { parameter: "Pack Size", value: "5 Litre" },
      { parameter: "Minimum Order Quantity", value: "3 Pieces" },
      { parameter: "Price", value: "₹300 / Piece" },
      { parameter: "Delivery Time", value: "7 Days" }
    ],
    faqs: [
      { q: "Who should use Brocal-Forte?", a: "Dairy cattle showing calcium deficiency or drops in milk production benefit most from this nutritional liquid calcium." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-broliv-500",
    name: "Bro-Liv (500 ml) Liver Tonic",
    category: "Liver Tonics",
    categoryId: "cat-2",
    shortDescription: "Liver tonic that boosts liver function, feed intake, digestion, and overall cattle health.",
    detailedDescription: "Bro-Liv (500 ml) is formulated to boost liver function, address low feed intake, and improve animal health. It promotes digestion and growth with a blend of liver fractions, Silymarin, iron sources, and B-complex vitamins.",
    imageKey: "prod-broliv-500",
    benefits: [
      "Boosts liver function and detox support.",
      "Improves appetite and feed intake.",
      "Promotes digestion and growth.",
      "Supports overall cattle health recovery."
    ],
    ingredients: "Calcium Lactate, Ferrous Gluconate, Liver Fraction, Silymarin, Ferrous Chloride, Nicotinamide, Nicotinic acid, Thiamine Hydrochloride, Riboflavine",
    suitableAnimals: "Cattle",
    usage: "Oral liver tonic. Administer with feed or as directed by a veterinarian.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "500 ml",
    storageInstructions: "Store in a cool, dry place. Shake well before use.",
    productFunction: "Promotes digestion",
    efficacy: "Promote Growth",
    price: 75,
    currency: "INR",
    minOrderQty: "15 Pieces",
    supplyAbility: "1000 Pieces Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "15 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Liver Tonic",
    specifications: [
      { parameter: "Pack Size", value: "500 ml" },
      { parameter: "Minimum Order Quantity", value: "15 Pieces" },
      { parameter: "Price", value: "₹75 / Piece" },
      { parameter: "Packaging", value: "15 pieces per carton" }
    ],
    faqs: [
      { q: "When should Bro-Liv be used?", a: "Use when feed intake is low, during recovery, or whenever liver and digestive support is needed." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-chel-super-adv-1kg",
    name: "Chelated Super Advance (1 kg) Mineral Mixture",
    category: "Mineral Mixtures",
    categoryId: "cat-3",
    shortDescription: "Reproductive and mineral support blend for infertility, milk maintenance, conception rate, and general cattle health.",
    detailedDescription: "Chelated Super Advance (1 kg) is a comprehensive mineral mixture formulated for infertility management, maintaining milk production, better animal health, and improved conception rate. It combines vitamins, macro and micro minerals, yeast, bypass fat, energy sources, and natural herbs for reproductive system support.",
    imageKey: "prod-chel-super-adv-1kg",
    benefits: [
      "Supports fertility and improved conception rate.",
      "Helps maintain consistent milk production.",
      "Broad-spectrum mineral and vitamin coverage.",
      "Includes yeast, bypass fat, energy, and natural herbs."
    ],
    ingredients: "Vitamin A, Vitamin D3, Vitamin E, Vitamin B12, Calcium, Phosphorus, Nicotinamide, Niacinamide, Cobalt, Copper, Selenium, Iodine, Iron, Magnesium, Manganese, Zinc, Potassium, Sodium, Sulphur, Chromium, Vitamin H, Tri. Sodium Citrate, Yeast, Bypass Fat, Energy, Natural herbs",
    suitableAnimals: "Cattle",
    usage: "Mix powder with feed daily as per recommended dosage.",
    dosage: "As advised by veterinarian / feed consultant.",
    packagingSizes: "1 kg",
    storageInstructions: "Keep sealed in a dry place. Protect from moisture.",
    productFunction: "Reproductive System",
    efficacy: "Promote Healthy",
    price: 110,
    currency: "INR",
    minOrderQty: "15 Pieces",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "15 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Mineral Mixture",
    specifications: [
      { parameter: "Pack Size", value: "1 kg" },
      { parameter: "Minimum Order Quantity", value: "15 Pieces" },
      { parameter: "Price", value: "₹110 / Piece" },
      { parameter: "Function", value: "Reproductive System Support" }
    ],
    faqs: [
      { q: "Does this help with repeat breeding?", a: "Yes — the mineral and vitamin profile is targeted at fertility, conception rate, and overall reproductive health." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-magical-ds-1l",
    name: "Chelated Magical-DS (1 Litre) Chelated Liquid Calcium",
    category: "Liquid Calcium",
    categoryId: "cat-1",
    shortDescription: "Chelated liquid calcium for calcium deficiency, milk drop, and general poor animal health in cattle.",
    detailedDescription: "Chelated Magical-DS (1 Litre) addresses calcium deficiency, down milk production, and general poor animal health. The chelated mineral complex with Vitamins A, D3, B12, H, E, galactagogue herbs, amino acids, and carbohydrate supports nutritional growth and lactation performance.",
    imageKey: "prod-magical-ds-1l",
    benefits: [
      "Corrects calcium deficiency in dairy cattle.",
      "Supports recovery from milk production drop.",
      "Chelated minerals for better bioavailability.",
      "Herbal and amino acid fortified formula."
    ],
    ingredients: "Calcium, Phosphorus, Vitamin A, Vitamin D3, Vitamin B12, Vitamin H, Jivanti, Shatavari, Cobalt, Zinc, Magnesium, Copper, Iodine, Bioactive Chromium, Potassium, Lycine, Methionine, Vitamin E, and Carbohydrate",
    suitableAnimals: "Cattle",
    usage: "Oral nutritional liquid. Shake well. Mix with feed or administer orally.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "1 Litre",
    storageInstructions: "Store cool and dry. Protect from sunlight.",
    productFunction: "Nutritional",
    efficacy: "Promotes growth",
    price: 100,
    currency: "INR",
    minOrderQty: "12 Packs",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "12 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Chelated Liquid Calcium",
    specifications: [
      { parameter: "Pack Size", value: "1 Litre" },
      { parameter: "Minimum Order Quantity", value: "12 Packs" },
      { parameter: "Price", value: "₹100 / Piece" },
      { parameter: "Packaging", value: "12 pieces per carton" }
    ],
    faqs: [
      { q: "Why choose Magical-DS over ordinary calcium?", a: "It combines chelated minerals with vitamins, herbs, amino acids, and carbohydrate for broader nutritional support." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-magical-ds-5l",
    name: "Chelated Magical-DS (5 Litre) Chelated Liquid Calcium",
    category: "Liquid Calcium",
    categoryId: "cat-1",
    shortDescription: "Economy 5 Litre chelated liquid calcium for herd-level calcium deficiency and milk production support.",
    detailedDescription: "Chelated Magical-DS (5 Litre) offers the same nutritional chelated calcium formula for calcium deficiency, down milk production, and down animal health — packed for medium and commercial dairy operations with cost-efficient bulk buying.",
    imageKey: "prod-magical-ds-5l",
    benefits: [
      "Bulk value for small-to-medium dairy herds.",
      "Addresses calcium deficiency and milk drop.",
      "Full chelated mineral and vitamin complex.",
      "Suitable for B2B distributor stocking."
    ],
    ingredients: "Calcium, Phosphorus, Vitamin A, Vitamin D3, Vitamin B12, Vitamin H, Jivanti, Shatavari, Cobalt, Zinc, Magnesium, Copper, Iodine, Bioactive Chromium, Potassium, Lycine, Methionine, Vitamin E, Carbohydrate",
    suitableAnimals: "Cattle",
    usage: "Oral nutritional supplement for cattle.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "5 Litre",
    storageInstructions: "Keep container tightly closed in a cool place.",
    productFunction: "Nutritional",
    efficacy: "Promote Growth",
    price: 300,
    currency: "INR",
    minOrderQty: "3 Pieces",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "3 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Other",
    specifications: [
      { parameter: "Pack Size", value: "5 Litre" },
      { parameter: "Minimum Order Quantity", value: "3 Pieces" },
      { parameter: "Price", value: "₹300 / Piece" },
      { parameter: "Packaging", value: "3 pieces per carton" }
    ],
    faqs: [
      { q: "Is this the same formula as the 1 Litre pack?", a: "Yes — identical Magical-DS formula in a larger, more economical pack." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-magical-ds-40l",
    name: "Chelated Magical-DS (40 Litre) Chelated Liquid Calcium",
    category: "Liquid Calcium",
    categoryId: "cat-1",
    shortDescription: "Commercial 40 Litre drum of chelated liquid calcium for farms, cooperatives, and bulk distributors.",
    detailedDescription: "Chelated Magical-DS (40 Litre) is the commercial drum pack for calcium deficiency, down milk production, and overall animal health support across large herds. Ideal for cooperatives, commercial dairies, and export-ready B2B orders.",
    imageKey: "prod-magical-ds-40l",
    benefits: [
      "Lowest cost per litre for commercial buyers.",
      "Same full Magical-DS nutritional formula.",
      "Suited for large herds and distributor warehouses.",
      "Single-piece drum packaging."
    ],
    ingredients: "Calcium, Phosphorus, Vitamin A, Vitamin D3, Vitamin B12, Vitamin H, Jivanti, Shatavari, Cobalt, Zinc, Magnesium, Copper, Iodine, Bioactive Chromium, Potassium, Lycine, Methionine, Vitamin E, Carbohydrate",
    suitableAnimals: "Cattle",
    usage: "Distribute via feed mixing systems or as directed for herd dosing.",
    dosage: "As advised by veterinarian / farm nutritionist.",
    packagingSizes: "40 Litre",
    storageInstructions: "Keep drum upright, sealed, and in a cool shaded area.",
    productFunction: "Nutritional",
    efficacy: "Promote Growth",
    price: 3500,
    currency: "INR",
    minOrderQty: "1 Piece",
    supplyAbility: "1000 Pieces Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "1 single piece",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Other",
    specifications: [
      { parameter: "Pack Size", value: "40 Litre" },
      { parameter: "Minimum Order Quantity", value: "1 Piece" },
      { parameter: "Price", value: "₹3,500 / Piece" },
      { parameter: "Packaging", value: "1 single piece" }
    ],
    faqs: [
      { q: "Who should order the 40 Litre pack?", a: "Commercial dairies, cooperatives, and B2B distributors needing bulk calcium supplementation." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-enrolite-1l",
    name: "Enrolite (1 Litre) Milk & Energy Booster",
    category: "Milk & Energy Boosters",
    categoryId: "cat-5",
    shortDescription: "Milk and energy booster for down milk production, ketosis prevention, and low glucose levels in cattle.",
    detailedDescription: "Enrolite (1 Litre) is a milk booster and energy booster formulated for down milk production, prevention of ketosis, and low glucose levels. It supplies vitamins, pantothenic acid, nicotinamide, B-complex nutrients, citrate, lactic acid, lactose, and gluconeogenic precursors for nutritional growth support.",
    imageKey: "prod-enrolite-1l",
    benefits: [
      "Supports recovery from down milk production.",
      "Helps prevent ketosis in dairy cattle.",
      "Addresses low glucose / energy balance.",
      "Nutritional milk and energy booster in 1 Litre pack."
    ],
    ingredients: "Vitamin E, Vitamin D3, Pantothenic Acid, Nicotinamide, Vitamin B6, Vitamin B2, Vitamin B12, Hydrate Tri. Sodium Citrate, Lactic Acid, Lactose, gluconeogenic precursor",
    suitableAnimals: "Cattle",
    usage: "Oral energy / milk booster. Administer as directed by veterinarian.",
    dosage: "As advised by veterinarian during early lactation or energy deficit.",
    packagingSizes: "1 Litre",
    storageInstructions: "Store at room temperature away from direct sunlight.",
    productFunction: "Nutritional",
    efficacy: "Promote Growth",
    price: 250,
    currency: "INR",
    minOrderQty: "10 Bottles",
    supplyAbility: "500 Bottles Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "10 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Other",
    specifications: [
      { parameter: "Pack Size", value: "1 Litre" },
      { parameter: "Minimum Order Quantity", value: "10 Bottles" },
      { parameter: "Price", value: "₹250 / Piece" },
      { parameter: "Supply Ability", value: "500 Bottles / Month" }
    ],
    faqs: [
      { q: "When is Enrolite most useful?", a: "Especially useful post-calving and whenever milk yield drops with risk of ketosis or low energy/glucose levels." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-udder-treat-300",
    name: "Udder Treat (300 ml) For Mastitis",
    category: "Mastitis Care",
    categoryId: "cat-7",
    shortDescription: "Mastitis and udder health liquid for inflammation, blood in milk, immunity, and healthier lactation.",
    detailedDescription: "Udder Treat (300 ml) is formulated for mastitis, udder inflammation, blood in milk, udder health, and boosting immunity. The multi-ingredient blend includes trisodium citrate, vitamins, minerals, probiotics, curcumin, and supportive nutrients for healthier udder conditions.",
    imageKey: "prod-udder-treat-300",
    benefits: [
      "Supports management of mastitis and udder inflammation.",
      "Helps with blood in milk and udder recovery.",
      "Boosts immunity around the mammary system.",
      "Nutritional formula with vitamins, minerals, and probiotics."
    ],
    ingredients: "Trisodium Citrate, Ammonium Chloride, Potassium Iodide, Vitamin A (palmitate), Vitamin E (acetate), Acetic acid, Vitamin K, Vitamin C, Vitamin D3, Ajwain, Lactobacillus Spores, Copper Sulphate, Zinc Sulphate, Curcumin, Niacin, Thiamine, Biotin (H), Methionine, Selenium, Chromium, Manganese",
    suitableAnimals: "Cattle",
    usage: "Use as directed for mastitis care and udder health support. Consult veterinarian for clinical cases.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "300 ml",
    storageInstructions: "Store cool and dry. Shake well before use.",
    productFunction: "Nutritional",
    efficacy: "Promotes Healthy",
    price: 150,
    currency: "INR",
    minOrderQty: "30 Pieces",
    supplyAbility: "1000 Pieces Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "30 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Mastitis Care",
    specifications: [
      { parameter: "Pack Size", value: "300 ml" },
      { parameter: "Minimum Order Quantity", value: "30 Pieces" },
      { parameter: "Price", value: "₹150 / Piece" },
      { parameter: "Packaging", value: "30 pieces per carton" }
    ],
    faqs: [
      { q: "Does Udder Treat replace antibiotics?", a: "It is a nutritional supportive product for udder health. Severe clinical mastitis requires veterinary diagnosis and treatment." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-ultra-clean-500",
    name: "Ultra Clean (500 ml) Uterine Tonic",
    category: "Uterine Tonic",
    categoryId: "cat-6",
    shortDescription: "Herbal uterine cleanser tonic promoting healthy uterine conditions in cattle after calving.",
    detailedDescription: "Ultra Clean (500 ml) is a uterine cleanser formulated to promote healthy uterine conditions. It combines classical Ayurvedic botanicals with supportive minerals for nutritional uterine tonic application in cattle.",
    imageKey: "prod-ultra-clean-500",
    benefits: [
      "Acts as a uterine cleanser post-calving.",
      "Promotes healthy uterine conditions.",
      "Herbal botanical formula with mineral support.",
      "Practical 500 ml pack for farm and dealer use."
    ],
    ingredients: "Ashok/Hempushpa, Haritaki, Amla, Babool, Dashmool, Ulatkambal, Agnimantha, Patala, Shalparni, Gokhru, Ghikanvar, Sodium Tetraborate, Ferrous Sulphate, Shigru, Kalahari, Vasaka, Harmala, Nagkesar, Lodhra, Copper Sulphate, Musta, Shatavari",
    suitableAnimals: "Cattle",
    usage: "Oral uterine tonic. Administer as directed by veterinarian after calving.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "500 ml",
    storageInstructions: "Store in a cool, dry place. Shake well before use.",
    productFunction: "Nutritional",
    efficacy: "Promotes Healthy uterine conditions",
    price: 70,
    currency: "INR",
    minOrderQty: "1 Pack",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "20 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Uterine Tonic",
    specifications: [
      { parameter: "Pack Size", value: "500 ml" },
      { parameter: "Minimum Order Quantity", value: "1 Pack" },
      { parameter: "Price", value: "₹70 / Piece" },
      { parameter: "Packaging", value: "20 pieces per carton" }
    ],
    faqs: [
      { q: "When should Ultra Clean be given?", a: "Typically used as a uterine cleanser around the post-calving period under veterinary guidance." }
    ],
    brochureUrl: "#"
  },
  {
    id: "prod-broliv-5l",
    name: "Bro-Liv (5 Litre) Liver Tonic",
    category: "Liver Tonics",
    categoryId: "cat-2",
    shortDescription: "Bulk 5 Litre liver tonic to boost liver function, feed intake, and growth in cattle herds.",
    detailedDescription: "Bro-Liv (5 Litre) provides the same liver-support formula as the 500 ml pack in bulk: boost liver function, address low feed intake, and improve general animal health with nutritional growth efficacy for commercial and distributor buying.",
    imageKey: "prod-broliv-5l",
    benefits: [
      "Bulk pack for farms and distributor stocking.",
      "Boosts liver function and feed intake.",
      "Promotes digestion and growth.",
      "Cost-effective herd-scale bottle."
    ],
    ingredients: "Calcium Lactate, Ferrous Gluconate, Liver Fraction, Silymarin, Ferrous Chloride, Nicotinamide, Nicotinic acid, Thiamine Hydrochloride, Riboflavine",
    suitableAnimals: "Cattle",
    usage: "Oral liver tonic for livestock. Mix or drench as advised.",
    dosage: "As advised by veterinarian.",
    packagingSizes: "5 Litre",
    storageInstructions: "Store cool and dry with lid sealed.",
    productFunction: "Nutritional",
    efficacy: "Promotes Growth",
    price: 450,
    currency: "INR",
    minOrderQty: "3 Packs",
    supplyAbility: "1000 Packs Per Month",
    deliveryTime: "7 Days",
    packagingDetails: "3 pieces per carton",
    domesticMarket: "All India",
    exportMarkets: "Asia, Africa",
    productType: "Liver Tonic",
    specifications: [
      { parameter: "Pack Size", value: "5 Litre" },
      { parameter: "Minimum Order Quantity", value: "3 Packs" },
      { parameter: "Price", value: "₹450 / Piece" },
      { parameter: "Packaging", value: "3 pieces per carton" }
    ],
    faqs: [
      { q: "Is Bro-Liv 5L the same formula as 500 ml?", a: "Yes — identical liver tonic composition in a larger commercial pack." }
    ],
    brochureUrl: "#"
  }
];


const SEED_BLOGS = [
  {
    id: "blog-1",
    title: "Understanding and Preventing Milk Fever in Dairy Cattle",
    author: "Dr. Rajesh Patel (Vet Consultant)",
    date: "June 15, 2026",
    category: "Livestock Management",
    summary: "Learn what causes hypocalcemia (Milk Fever) in high-yielding dairy cows during calving, and how to prevent it with proper calcium supplements.",
    content: `Milk Fever, or hypocalcemia, is a metabolic disease caused by low blood calcium levels in dairy cattle shortly after calving. High-yielding dairy cows suffer from it because calcium is drawn out from their blood into the mammary glands for colostrum and milk production faster than they can absorb it from feed or mobilize it from bones.

### Symptoms of Milk Fever:
1. **Stage 1 (Excitement)**: Animal is restless, shakes head, shows muscle tremors, and is unstable.
2. **Stage 2 (Sternal Recumbency)**: The cow lies down, unable to stand, rests its head on its flank (classic 'S-curve' neck), and has cold ears.
3. **Stage 3 (Lateral Recumbency)**: The animal lies flat on its side, bloated, goes into a coma, and can die if untreated.

### Prevention Strategies:
The most effective way to prevent milk fever is maintaining balanced mineral feeds during the dry period and administering fast-absorbing calcium gels like **Magical Gel** during the calving window. Chelated double-strength calcium (e.g. **Chelated Magical-DS**) should also be introduced in the daily feeding regime right after calving to sustain the calcium pool.`,
    image: "https://images.unsplash.com/photo-1527156278757-09d70de370a4?auto=format&fit=crop&q=80&w=800",
    seoDescription: "An expert guide on causes, symptoms, and preventive treatments for milk fever (hypocalcemia) in high yielding dairy cows."
  },
  {
    id: "blog-2",
    title: "The Role of Chelated Minerals in Improving Livestock Reproduction",
    author: "Amit Sharma (Animal Nutritionist)",
    date: "July 02, 2026",
    category: "Animal Nutrition",
    summary: "Standard minerals face absorption blocks in cattle. Discover how chelated minerals boost conception rates and dairy yield.",
    content: `Trace minerals like zinc, copper, manganese, and cobalt are critical catalysts in cattle reproductive physiology. A deficiency in these minerals leads to silent heat, repeat breeding, retained placenta, and long calving intervals.

### Why Chelated Minerals are Superior:
Cattle digest feed through microbial fermentation in the rumen. Ordinary mineral salts (sulfates, oxides) easily break down and bind to other compounds, becoming indigestible. Chelated minerals are bound to amino acids (glycinates). They bypass these chemical traps, reaching the intestine intact where they are fully absorbed.

### Key Benefits Observed:
- **Higher Conception Rates**: Glycinate-chelated Copper and Zinc regulate progesterone and estrogen, prompting strong heat cycles.
- **Better Embryo Quality**: Chelated manganese improves egg quality and embryonic survival.
- **Shorter Calving Interval**: Fast postpartum recovery of the uterus.

For optimal reproduction, feeding a trace-chelated mineral mix like **Chelated Super Advance** at 50g daily is highly recommended for cows.`,
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800",
    seoDescription: "Discover how chelated trace minerals solve breeding problems, silent heat, and repeat breeding issues in cattle."
  },
  {
    id: "blog-3",
    title: "How to Detect and Manage Mastitis on Your Dairy Farm",
    author: "Dr. K. B. Patoliya (Managing Director, Brovet)",
    date: "July 10, 2026",
    category: "Veterinary Care",
    summary: "Mastitis is the costliest disease in the dairy industry. Find out how to identify sub-clinical mastitis and maintain high udder health.",
    content: `Mastitis is the inflammation of the mammary gland (udder) caused by bacterial infections. It leads to billions in annual losses due to discarded milk, veterinary expenses, and permanent damage to milking cows.

### Types of Mastitis:
1. **Clinical Mastitis**: Visible swelling of the udder, heat, pain, clots or blood in milk, and fever.
2. **Sub-Clinical Mastitis**: No visible symptoms in udder or milk, but somatic cell count (SCC) increases, reducing milk yield and fat content.

### Detection Methods:
- **California Mastitis Test (CMT)**: A simple field test that mixes milk with a reagent to check for gel formation (indicating high white blood cells/infection).
- **Milk pH Strip**: Mastitis milk turns alkaline (higher pH).

### Management and Prevention:
1. **Milking Hygiene**: Always wash udders with clean water and dip teats in disinfectant after milking.
2. **Nutritional Support**: Feed high levels of Vitamin E, Selenium, and Trisodium Citrate (found in **Udder Treat** powder) to maintain natural udder tissue defense.`,
    image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=800",
    seoDescription: "Learn to identify sub-clinical mastitis early and treat dairy cows using udder health supplements and hygiene."
  }
];

const SEED_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Ramesh Patel",
    role: "Dairy Farm Owner (50+ Cows)",
    location: "Anand, Gujarat",
    content: "I started using Chelated Magical-DS for my high-yielding HF cows. Within 2 weeks, milk yield increased by 1.5 liters per cow per day, and the milk fat went up. The 40-liter drum is very cost-effective for my farm.",
    rating: 5,
    type: "Farmer"
  },
  {
    id: "t-2",
    name: "Dr. Sunil Mehta",
    role: "Veterinary Officer",
    location: "Navsari, Gujarat",
    content: "For downer cow cases and post-calving recovery, I always prescribe Magical Gel and Brovit-H. The absorption of Brovet's chelated supplements is outstanding, and we see rapid recovery in milk fever cases.",
    rating: 5,
    type: "Veterinarian"
  },
  {
    id: "t-3",
    name: "Mahavir Animal Feed Traders",
    role: "Distributor",
    location: "Indore, Madhya Pradesh",
    content: "Brovet Animal Healthcare has been our trusted supplier since 2019. Their packaging is leak-proof, delivery is on time, and their products like Brocal-Forte have high demand and excellent feedback from local dealers.",
    rating: 5,
    type: "Distributor"
  },
  {
    id: "t-4",
    name: "Vikram Singh",
    role: "Retailer / Feed Store Owner",
    location: "Jaipur, Rajasthan",
    content: "Being a dealer for Brovet has boosted my business. Farmers specifically come back asking for Chelated Super Advance and Brovit-H. The margins are fair, and company support is top-notch.",
    rating: 5,
    type: "Dealer"
  }
];

const SEED_GALLERY = [
  { id: "g-1", url: "https://images.unsplash.com/photo-1527156278757-09d70de370a4?auto=format&fit=crop&q=80&w=600", category: "Products", title: "Cattle Feeding Liquid Calcium" },
  { id: "g-2", url: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=600", category: "Packaging", title: "Automated Packaging Line" },
  { id: "g-3", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600", category: "Office", title: "Navsari Head Office" },
  { id: "g-4", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600", category: "Warehouse", title: "Raw Material Warehouse" },
  { id: "g-5", url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600", category: "Team", title: "Brovet Veterinary Sales Team" },
  { id: "g-6", url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600", category: "Farm Visits", title: "Farmer Meet in Navsari" },
  { id: "g-7", url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600", category: "Products", title: "Brocal-Forte Cattle Feed Trial" }
];

const SEED_DOWNLOADS = [
  { id: "d-1", title: "Brovet Corporate Product Catalogue 2026", type: "Catalogue", size: "4.8 MB", date: "Jan 2026", url: "#" },
  { id: "d-2", title: "Company Profile & Infrastructure Portfolio", type: "Profile", size: "2.1 MB", date: "Feb 2026", url: "#" },
  { id: "d-3", title: "WHO-GMP & ISO 9001:2015 Certificates", type: "Certificate", size: "1.2 MB", date: "Mar 2026", url: "#" },
  { id: "d-4", title: "Chelated Magical-DS Technical Brochure", type: "Brochure", size: "850 KB", date: "May 2026", url: "#" }
];

const SEED_SETTINGS = {
  companyName: "Brovet Animal Healthcare",
  established: "2018",
  managingDirector: "Mr. Ketan Bavchandbhai Patoliya",
  address: "Plot No.-3, Saurastra Patel Society, Gaurishanker Street, Jalalpore Road, Navsari - 396445, Gujarat, India",
  phoneNumbers: ["+91 98251 76543", "+91 2637 258963"],
  whatsappNumber: "+919825176543",
  email: "info@brovet.com",
  businessHours: "Monday - Saturday: 9:00 AM to 6:00 PM (Sunday Closed)",
  socialLinks: {
    facebook: "https://facebook.com/brovetanimalhealthcare",
    youtube: "https://youtube.com/c/brovethealthcare",
    linkedin: "https://linkedin.com/company/brovet",
    twitter: "https://twitter.com/brovet_health"
  }
};

const SEED_SEO = {
  home: { title: "Brovet Animal Healthcare | Premium Veterinary Products India", description: "Established in 2018, Brovet is India's leading B2B exporter of liquid calcium, liver tonics, mineral mixtures, and animal nutritional supplements." },
  about: { title: "About Brovet Animal Healthcare | Mission & MD Message", description: "Learn about Brovet, a ISO certified veterinary B2B supplier based in Navsari, Gujarat. Read Mr. Ketan Patoliya's vision on livestock health." },
  products: { title: "Veterinary Feed Supplements & Medicines | Brovet Products", description: "Browse our B2B veterinary catalog. High-grade liquid calcium, multivitamins, and udder care products for cattle, poultry, and sheep." },
  dealer: { title: "Become a Veterinary Distributor | Brovet Dealer Registration", description: "Apply to become a licensed dealer, distributor, or exporter of Brovet Animal Healthcare products in your region." },
  contact: { title: "Contact Brovet | Head Office, Navsari, Gujarat", description: "Get in touch with Brovet Animal Healthcare. Reach us by phone, email, WhatsApp, or visit our office in Navsari." }
};

// Database Initialization
const SEED_VERSION = '2';

const initDB = () => {
  const currentVersion = localStorage.getItem('brovet_seed_version');
  const needsFullSeed = !localStorage.getItem('brovet_initialized');
  const needsCatalogRefresh = currentVersion !== SEED_VERSION;

  if (needsFullSeed) {
    localStorage.setItem('brovet_categories', JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem('brovet_products', JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem('brovet_blogs', JSON.stringify(SEED_BLOGS));
    localStorage.setItem('brovet_testimonials', JSON.stringify(SEED_TESTIMONIALS));
    localStorage.setItem('brovet_gallery', JSON.stringify(SEED_GALLERY));
    localStorage.setItem('brovet_downloads', JSON.stringify(SEED_DOWNLOADS));
    localStorage.setItem('brovet_settings', JSON.stringify(SEED_SETTINGS));
    localStorage.setItem('brovet_seo', JSON.stringify(SEED_SEO));
    localStorage.setItem('brovet_dealers', JSON.stringify([]));
    localStorage.setItem('brovet_quotations', JSON.stringify([]));
    localStorage.setItem('brovet_messages', JSON.stringify([]));
    localStorage.setItem('brovet_initialized', 'true');
    localStorage.setItem('brovet_seed_version', SEED_VERSION);
    return;
  }

  // Refresh catalog when seed data changes, without wiping leads/settings edits
  if (needsCatalogRefresh) {
    localStorage.setItem('brovet_categories', JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem('brovet_products', JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem('brovet_seed_version', SEED_VERSION);
  }
};

// Execute initialization
initDB();

const safeParse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const readJson = (key, fallback) => safeParse(localStorage.getItem(key), fallback);

// DB Accessors
export const db = {
  // Categories
  getCategories: () => readJson('brovet_categories', []),
  saveCategory: (category) => {
    const categories = db.getCategories();
    if (category.id) {
      const idx = categories.findIndex(c => c.id === category.id);
      if (idx !== -1) categories[idx] = category;
    } else {
      category.id = 'cat-' + Date.now();
      categories.push(category);
    }
    localStorage.setItem('brovet_categories', JSON.stringify(categories));
    return category;
  },
  deleteCategory: (id) => {
    const categories = db.getCategories().filter(c => c.id !== id);
    localStorage.setItem('brovet_categories', JSON.stringify(categories));
  },

  // Products
  getProducts: () => readJson('brovet_products', []),
  saveProduct: (product) => {
    const products = db.getProducts();
    if (product.id) {
      const idx = products.findIndex(p => p.id === product.id);
      if (idx !== -1) products[idx] = { ...products[idx], ...product };
    } else {
      product.id = 'prod-' + Date.now();
      products.push(product);
    }
    localStorage.setItem('brovet_products', JSON.stringify(products));
    return product;
  },
  deleteProduct: (id) => {
    const products = db.getProducts().filter(p => p.id !== id);
    localStorage.setItem('brovet_products', JSON.stringify(products));
  },

  // Blogs
  getBlogs: () => readJson('brovet_blogs', []),
  saveBlog: (blog) => {
    const blogs = db.getBlogs();
    if (blog.id) {
      const idx = blogs.findIndex(b => b.id === blog.id);
      if (idx !== -1) blogs[idx] = { ...blogs[idx], ...blog };
    } else {
      blog.id = 'blog-' + Date.now();
      blog.date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      blogs.push(blog);
    }
    localStorage.setItem('brovet_blogs', JSON.stringify(blogs));
    return blog;
  },
  deleteBlog: (id) => {
    const blogs = db.getBlogs().filter(b => b.id !== id);
    localStorage.setItem('brovet_blogs', JSON.stringify(blogs));
  },

  // Testimonials
  getTestimonials: () => readJson('brovet_testimonials', []),
  saveTestimonial: (testimonial) => {
    const testimonials = db.getTestimonials();
    if (testimonial.id) {
      const idx = testimonials.findIndex(t => t.id === testimonial.id);
      if (idx !== -1) testimonials[idx] = testimonial;
    } else {
      testimonial.id = 't-' + Date.now();
      testimonials.push(testimonial);
    }
    localStorage.setItem('brovet_testimonials', JSON.stringify(testimonials));
    return testimonial;
  },
  deleteTestimonial: (id) => {
    const testimonials = db.getTestimonials().filter(t => t.id !== id);
    localStorage.setItem('brovet_testimonials', JSON.stringify(testimonials));
  },

  // Gallery
  getGallery: () => readJson('brovet_gallery', []),
  saveGalleryItem: (item) => {
    const gallery = db.getGallery();
    if (item.id) {
      const idx = gallery.findIndex(g => g.id === item.id);
      if (idx !== -1) {
        gallery[idx] = { ...gallery[idx], ...item };
      } else {
        gallery.push(item);
      }
    } else {
      item.id = 'g-' + Date.now();
      gallery.push(item);
    }
    localStorage.setItem('brovet_gallery', JSON.stringify(gallery));
    return item;
  },
  deleteGalleryItem: (id) => {
    const gallery = db.getGallery().filter(g => g.id !== id);
    localStorage.setItem('brovet_gallery', JSON.stringify(gallery));
  },

  // Downloads
  getDownloads: () => readJson('brovet_downloads', []),
  saveDownload: (download) => {
    const downloads = db.getDownloads();
    download.id = download.id || 'd-' + Date.now();
    download.date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    downloads.push(download);
    localStorage.setItem('brovet_downloads', JSON.stringify(downloads));
    return download;
  },
  deleteDownload: (id) => {
    const downloads = db.getDownloads().filter(d => d.id !== id);
    localStorage.setItem('brovet_downloads', JSON.stringify(downloads));
  },

  // Dealer Applications
  getDealers: () => readJson('brovet_dealers', []),
  saveDealer: (application) => {
    const applications = db.getDealers();
    application.id = 'dealer-' + Date.now();
    application.date = new Date().toLocaleDateString();
    application.status = 'Pending';
    applications.push(application);
    localStorage.setItem('brovet_dealers', JSON.stringify(applications));
    return application;
  },
  updateDealerStatus: (id, status) => {
    const applications = db.getDealers();
    const idx = applications.findIndex(a => a.id === id);
    if (idx !== -1) applications[idx].status = status;
    localStorage.setItem('brovet_dealers', JSON.stringify(applications));
  },

  // Quotations
  getQuotations: () => readJson('brovet_quotations', []),
  saveQuotation: (rfq) => {
    const rfqs = db.getQuotations();
    rfq.id = 'rfq-' + Date.now();
    rfq.date = new Date().toLocaleDateString();
    rfq.status = 'Pending';
    rfqs.push(rfq);
    localStorage.setItem('brovet_quotations', JSON.stringify(rfqs));
    return rfq;
  },
  updateQuotationStatus: (id, status) => {
    const rfqs = db.getQuotations();
    const idx = rfqs.findIndex(r => r.id === id);
    if (idx !== -1) rfqs[idx].status = status;
    localStorage.setItem('brovet_quotations', JSON.stringify(rfqs));
  },

  // Contact Messages
  getMessages: () => readJson('brovet_messages', []),
  saveMessage: (message) => {
    const messages = db.getMessages();
    message.id = 'msg-' + Date.now();
    message.date = new Date().toLocaleDateString();
    message.read = false;
    messages.push(message);
    localStorage.setItem('brovet_messages', JSON.stringify(messages));
    return message;
  },
  markMessageRead: (id) => {
    const messages = db.getMessages();
    const idx = messages.findIndex(m => m.id === id);
    if (idx !== -1) messages[idx].read = true;
    localStorage.setItem('brovet_messages', JSON.stringify(messages));
  },

  // Settings
  getSettings: () => readJson('brovet_settings', SEED_SETTINGS),
  saveSettings: (settings) => {
    localStorage.setItem('brovet_settings', JSON.stringify(settings));
    return settings;
  },

  // SEO Metadata
  getSeo: () => readJson('brovet_seo', SEED_SEO),
  saveSeo: (seo) => {
    localStorage.setItem('brovet_seo', JSON.stringify(seo));
    return seo;
  }
};

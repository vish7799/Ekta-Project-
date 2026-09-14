const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const config = require('../config/env');

const User = require('../models/User');
const Service = require('../models/Service');
const Industry = require('../models/Industry');
const Project = require('../models/Project');
const Client = require('../models/Client');
const SiteSettings = require('../models/SiteSettings');

const seedData = async () => {
  try {
    // ============================================================
    // PRODUCTION SAFETY
    // ============================================================

    if (config.env === 'production') {
      throw new Error(
        'The seed script is disabled in production because it can overwrite CMS-managed data.'
      );
    }

    // ============================================================
    // REQUIRED ADMIN CREDENTIALS
    // ============================================================

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        'ADMIN_EMAIL and ADMIN_PASSWORD must be configured before running the seed script.'
      );
    }

    const normalizedAdminEmail = adminEmail.toLowerCase().trim();

    if (!normalizedAdminEmail.includes('@')) {
      throw new Error('ADMIN_EMAIL must be a valid email address.');
    }

    if (adminPassword.length < 12) {
      throw new Error(
        'ADMIN_PASSWORD must be at least 12 characters long.'
      );
    }

    // ============================================================
    // DATABASE CONNECTION
    // ============================================================

    if (!config.mongoUri) {
      throw new Error(
        'MONGODB_URI is not configured. Cannot run seed script.'
      );
    }

    console.log('[Seed Script] Connecting to configured MongoDB...');

    await mongoose.connect(config.mongoUri);

    console.log('[Seed Script] MongoDB Connected successfully.');

    // ============================================================
    // CLEAR DEVELOPMENT SEED DATA
    // ============================================================

    console.log('[Seed Script] Clearing existing development seed data...');

    await Service.deleteMany({});
    await Industry.deleteMany({});
    await Project.deleteMany({});
    await Client.deleteMany({});
    await SiteSettings.deleteMany({});

    console.log('[Seed Script] Existing seed collections cleared.');

    // ============================================================
    // 1. SEED MASTER ADMIN USER
    // ============================================================

    console.log('[Seed Script] Preparing administrator account...');

    let admin = await User.findOne({
      email: normalizedAdminEmail,
    });

    // Backward compatibility for the previous development account.
    if (!admin && normalizedAdminEmail === 'admin1@gmail.com') {
      admin = await User.findOne({
        email: 'admin@ektaelectrical.com',
      });
    }

    if (!admin) {
      admin = await User.create({
        name: 'EKTA Administrator',
        email: normalizedAdminEmail,
        password: adminPassword,
        role: 'admin',
        status: 'active',
      });

      console.log(
        `[Seed Script] Created Admin User: ${normalizedAdminEmail}`
      );
    } else {
      admin.email = normalizedAdminEmail;
      admin.password = adminPassword;
      admin.role = 'admin';
      admin.status = 'active';

      await admin.save();

      console.log(
        `[Seed Script] Admin User verified: ${normalizedAdminEmail}`
      );
    }

    // ============================================================
    // 2. SEED AUTHENTIC SITE SETTINGS
    // ============================================================

    await SiteSettings.create({
      companyName: 'EKTA ELECTRICAL WORKS',

      tagline:
        'Dedicated Electrical Contractor Having 38+ Years of Engineering Excellence (Est. 1983)',

      corporateAddress:
        'C-82 Begum Vihar, Begumpur, opp. Rohini Sec-22, New Delhi - 110086',

      primaryPhone: '+91 9899442333',

      emergencyPhone: '+91 9811589108',

      email: 'Ektaa.electrical@gmail.com',

      businessHours:
        'Mon - Sat: 9:00 AM - 7:00 PM IST (24/7 Emergency Breakdown Support)',

      socialLinks: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
      },

      seoDefaults: {
        metaTitle:
          'EKTA ELECTRICAL WORKS | 38+ Years Class-A Electrical Contractor Delhi',

        metaDescription:
          'EKTA ELECTRICAL WORKS - Class-A Electrical Contractor with 38+ years experience (Est. 1983). HT/LT Panels, Industrial Wiring, Solar Panels, Cable Laying, AMC & Testing.',
      },
    });

    console.log(
      '[Seed Script] Created Authentic Site Settings.'
    );

    // ============================================================
    // 3. SEED AUTHENTIC SERVICES
    // ============================================================

    const authenticServices = [
      {
        title: 'HT / LT Electrical Work & Contracting',

        slug: 'ht-lt-electrical-contracting',

        shortDescription:
          'High Tension & Low Tension electrical installations, transformer erection, switchgear, and complete overhead/underground distribution.',

        fullDescription:
          'EKTA ELECTRICAL WORKS is a premier Class-A licensed electrical contractor executing high-capacity HT/LT power distribution networks, transformer installations, HT cable laying, and switchgear commissioning for industrial plants and commercial complexes.',

        keyFeatures: [
          'High Tension (HT) Substation & Transformer Erection',
          'Low Tension (LT) Main Power Distribution Systems',
          'HT/LT Cable Jointing, Straight Joint & Heat Shrink Termination',
          'Earth Grid Design, GI/Copper Strip Earthing & Testing',
          'Statutory Electrical Inspectorate Approval Assistance',
        ],

        displayOrder: 1,
        status: 'published',
      },

      {
        title: 'Industrial & Commercial Electrical Work',

        slug: 'industrial-commercial-electrical-work',

        shortDescription:
          'Complete factory electrification, commercial complex wiring, data centers, showrooms, and exhibition infrastructure.',

        fullDescription:
          'We provide heavy industrial wiring, busbar trunking systems, raceway installations, industrial socket layouts, and complete turn-key electrification for factories, multi-story office buildings, and shopping malls.',

        keyFeatures: [
          'Factory & Warehouse Heavy Power Electrification',
          'Raceways, Busbar Trunking & Industrial Socket Outlets',
          'Modular Switches, Sockets, PVC Conduits & GI Boxes Installation',
          'Data Center Electrification (Airtel Data Centre, etc.)',
          'Showrooms & Exhibition Wiring (Kajaria, Auto Expo, Pragati Maidan)',
        ],

        displayOrder: 2,
        status: 'published',
      },

      {
        title: 'LT Panel, MCB, RCCB & DB Installation',

        slug: 'lt-panel-mcb-rccb-db-installation',

        shortDescription:
          'Custom fabrication, purchasing, and installation of LT switchboards, Main Distribution Boards (MDB), Sub Distribution Boards (SDB), MCB, and RCCB protection systems.',

        fullDescription:
          'We supply, fabricate, and install custom LT control panels, main distribution boards, automatic source changeover switches, RCCB leakage protection, and sub-distribution boards engineered for high safety and reliability.',

        keyFeatures: [
          'Main LT Distribution Panels & Bus Coupler Fabrication',
          'MCB, RCCB, ELCB & Moulded Case Circuit Breakers (MCCB)',
          'Feeder Pillars & Sub-Distribution Boards (SDB)',
          'Phase Plate & Indicator Light Assembly',
          'Load Balancing & Thermal Imaging Audit',
        ],

        displayOrder: 3,
        status: 'published',
      },

      {
        title: 'Roof Top Solar Panel Installation With Structure',

        slug: 'rooftop-solar-panel-installation-structure',

        shortDescription:
          'Turnkey rooftop solar PV panel installation, structural mounting, inverter integration, and grid tie-in.',

        fullDescription:
          'EKTA ELECTRICAL WORKS supplies and installs high-efficiency rooftop solar panel systems complete with heavy-duty structural mountings, solar inverters, DC cabling, surge protection, and net-metering synchronization.',

        keyFeatures: [
          'Rooftop Solar PV Panel Array Assembly',
          'Hot-Dip Galvanized Metal Mounting Structure Fabrication',
          'Solar Inverter, String Combiner Boxes & ACDB/DCDB',
          'Bi-directional Net-metering Grid Interconnection',
          'Solar Lightning Arrestor & Dedicated Earth Pit Setup',
        ],

        displayOrder: 4,
        status: 'published',
      },

      {
        title: 'Cable Laying, Trenching & Wire Termination',

        slug: 'cable-laying-trenching-wire-termination',

        shortDescription:
          'Underground HT/LT armored cable trenching, tray laying, glanding, and lug termination.',

        fullDescription:
          'Professional cable management including perforated and ladder-type cable tray installation, underground cable trenching, heavy armoring, brass glanding, and copper/aluminum crimping lugs.',

        keyFeatures: [
          'Perforated & Ladder Type Heavy Duty Cable Trays',
          'Underground HT & LT Armored Cable Laying & Trenching',
          'Double Compression Brass Glanding & Crimping',
          'Insulation Resistance (Megger) Testing',
        ],

        displayOrder: 5,
        status: 'published',
      },

      {
        title: 'DG Set & UPS Backup Power Electrical Work',

        slug: 'dg-set-ups-backup-electrical-work',

        shortDescription:
          'Diesel Generator synchronizing panels, AMF panels, UPS battery bank wiring, and emergency power cut-in.',

        fullDescription:
          'Turnkey backup power integration including DG set positioning, Auto Mains Failure (AMF) panel wiring, automatic transfer switches (ATS), and industrial UPS battery rack installation.',

        keyFeatures: [
          'DG Set Synchronizing & AMF Control Panel Wiring',
          'Automatic Transfer Switches (ATS) Installation',
          'Online UPS Power Bus Routing & Battery Rack Wiring',
          'Emergency Power Changeover & Load Shedding Logic',
        ],

        displayOrder: 6,
        status: 'published',
      },

      {
        title:
          'Electrical Maintenance, AMC & Testing Commissioning',

        slug:
          'electrical-maintenance-amc-testing-commissioning',

        shortDescription:
          'Annual Maintenance Contracts (AMC), walk-through energy audits, thermal inspection, and pre-commissioning testing.',

        fullDescription:
          'Preventative electrical maintenance, breakdown troubleshooting, energy audits, transformer oil testing, and statutory compliance audits for hospitals, commercial towers, and industrial plants.',

        keyFeatures: [
          '24/7 Breakdown & Preventive Annual Maintenance Contracts (AMC)',
          'Walk-Through Energy Audits & Power Quality Analysis',
          'Relay Calibration, Contact Resistance & Insulation Testing',
          'Electrical Consultancy in Collaboration with DTU Team',
        ],

        displayOrder: 7,
        status: 'published',
      },
    ];

    for (const service of authenticServices) {
      await Service.create(service);

      console.log(
        `[Seed Script] Created Service: ${service.title}`
      );
    }

    // ============================================================
    // 4. SEED AUTHENTIC TARGET INDUSTRY SECTORS
    // ============================================================

    const authenticIndustries = [
      {
        name: 'Hospitals & Healthcare Facilities',

        slug: 'hospitals-healthcare-facilities',

        shortDescription:
          'Uninterrupted power systems, ICU wiring, specialized hospital panels, and emergency response electrification.',

        overview:
          'EKTA ELECTRICAL WORKS has extensive experience in critical healthcare electrification including Max Hospital Shalimar Bagh, Max Covid Hospital Saket, Covid Healthcare Hospital Bhagwati Nagar (J&K), and AIIMS consultancy.',

        solutionsProvided: [
          'Critical Care & ICU Isolated Power Supply Wiring',
          'High-Availability Dual Utility & DG Power Auto-Transfer',
          'Fire Alarm, Fire Fighting & Emergency Panel Electrification',
        ],

        displayOrder: 1,
        status: 'published',
      },

      {
        name: 'Exhibitions, Showrooms & Retail Outlets',

        slug: 'exhibitions-showrooms-retail',

        shortDescription:
          'High-end aesthetic lighting, display wiring, temporary exhibition power, and showroom electrification.',

        overview:
          'Trusted electrical partner for prestigious exhibitions (Auto Expo Mahindra & Maruti Suzuki, Excon JCB, Pragati Maidan, Aero Show Bangalore) and nationwide showrooms (Kajaria Tiles, Purple Showrooms, Grotto, Reliance Trend).',

        solutionsProvided: [
          'Custom Architectural Lighting & Track Spotlights',
          'High-Load Temporary Exhibition Power Distribution',
          'Luxury Showroom Interior Electrification',
        ],

        displayOrder: 2,
        status: 'published',
      },

      {
        name: 'Commercial Towers, Banks & Logistics Warehouses',

        slug: 'commercial-towers-banks-warehouses',

        shortDescription:
          'Multi-story corporate building electrification, bank branch networks, and heavy warehouse power.',

        overview:
          'Delivering comprehensive electrical installations for Gopal Das Building (15th Floor), Federal Bank branches, IndusInd Bank multi-city networks, TVS Warehouses (Jamalpur, Ptaoudi, Sohna, Lucknow), and TDI Infra.',

        solutionsProvided: [
          'Multi-Level Parking Electrification & Fire Alarm Systems',
          'High-Density Busduct & Elevator Power Panels',
          'Warehouse Overhead Lighting & Heavy Conveyor Wiring',
        ],

        displayOrder: 3,
        status: 'published',
      },

      {
        name: 'Housing Societies & Residential Complexes',

        slug: 'housing-societies-residential-complexes',

        shortDescription:
          'Turnkey residential colony electrification, HT/LT substations, and internal building wiring.',

        overview:
          'Over 38 years of experience executing housing society electrification including Air Men & Sailors Co-op, Saket Co-op, Rama Krishna Co-op, Ganga Co-op, Pacific State Dehradun (370 Flats), and Bhiwadi Housing.',

        solutionsProvided: [
          'Main Feeder Pillar & Meter Room Panel Installation',
          'Internal Apartment Wiring & Modular Fittings',
          'Perimeter Lighting & Substation Cabling',
        ],

        displayOrder: 4,
        status: 'published',
      },
    ];

    for (const industry of authenticIndustries) {
      await Industry.create(industry);

      console.log(
        `[Seed Script] Created Industry: ${industry.name}`
      );
    }

    // ============================================================
    // 5. SEED AUTHENTIC MAJOR PROJECTS
    // ============================================================

    const authenticProjects = [
      {
        title:
          'Max Hospital Shalimar Bagh & Max Covid Hospital Saket Electrification',

        slug:
          'max-hospital-shalimar-bagh-saket-electrification',

        clientName: 'Max Healthcare Institute',

        location: 'Shalimar Bagh & Saket, New Delhi',

        summary:
          'Comprehensive electrical installation, panel wiring, emergency backup power integration, and critical care electrical maintenance.',

        description:
          'EKTA ELECTRICAL WORKS deployed senior electrical engineering teams for complete HT/LT power management, distribution panels, and emergency power systems at Max Hospital Shalimar Bagh and Max Covid Hospital Saket.',

        highlights: [
          '24/7 continuous electrical operation during peak healthcare demand',
          'Zero breakdown record for critical care power distribution',
          'Deploying dedicated engineer team on-site for rapid response',
        ],

        isFeatured: true,
        status: 'published',
      },

      {
        title:
          'Auto Expo (Mahindra & Maruti Suzuki) Exhibition Electrification',

        slug:
          'auto-expo-mahindra-maruti-suzuki-electrification',

        clientName:
          'Mahindra Electric & Maruti Suzuki India Ltd',

        location: 'Auto Expo Exhibition Grounds',

        summary:
          'High-capacity temporary power distribution, architectural pavilion display lighting, and heavy vehicle turntable power.',

        description:
          'Engineered turnkey power infrastructure for major automotive pavilions at Auto Expo 2016. Managed multi-kw display lighting, vehicle charging ports, and main power distribution.',

        highlights: [
          'High-density heavy cabling for multi-brand automotive pavilions',
          'Seamless temporary grid sync and emergency DG changeover',
        ],

        isFeatured: true,
        status: 'published',
      },

      {
        title:
          'TVS Warehouses Electrification (Jamalpur, Ptaoudi, Sohna, Lucknow)',

        slug:
          'tvs-warehouses-electrification-multi-city',

        clientName: 'TVS Supply Chain Solutions',

        location:
          'Jamalpur, Ptaoudi, Sohna & Lucknow (2024-2025)',

        summary:
          'Turnkey high-bay warehouse lighting, industrial busbar trunking, trenching, and power distribution board installation.',

        description:
          'Multi-facility electrification for TVS logistics centers across 4 major hubs. Installed raceways, high-bay LED fixtures, main distribution panels, and energy metering.',

        highlights: [
          'Standardized energy-efficient warehouse lighting layout',
          'Energy audit verification in collaboration with TVS engineering team',
        ],

        isFeatured: true,
        status: 'published',
      },

      {
        title:
          'Pacific State Dehradun - 370 Flats HT/LT Panel & Internal Wiring',

        slug:
          'pacific-state-dehradun-370-flats-electrification',

        clientName: 'Pacific Bansal Group',

        location: 'Dehradun, Uttarakhand',

        summary:
          'Turnkey HT/LT panel installations, main metering rooms, and complete internal electrification for 370 residential apartments.',

        description:
          'Executed complete high-voltage and low-voltage electrification for a 370-flat residential township including HT transformers, LT main panels, apartment DBs, and modular fitting.',

        highlights: [
          'Integrated transformer substation with automatic changeover',
          '370 individual apartment metering boards & safety breakers',
        ],

        isFeatured: true,
        status: 'published',
      },

      {
        title:
          'Kajaria Tiles Nationwide Showrooms & Revari Galaxy Facility',

        slug:
          'kajaria-tiles-nationwide-showrooms-electrification',

        clientName: 'Kajaria Ceramics Ltd',

        location: 'Revari & All Over India',

        summary:
          'Architectural display lighting, LT panels, switchgear, and decorative interior electrification.',

        description:
          'Turnkey interior electrical contracting for Kajaria Galaxy Showrooms nationwide, including Revari facility. Features specialized tile highlight spotlights and main DB installations.',

        highlights: [
          'Specialized high-CRI spotlighting for ceramic display',
          'Custom LT panel and MCB distribution board setup',
        ],

        isFeatured: true,
        status: 'published',
      },

      {
        title:
          'AIIMS Hospital Electrical Consultancy with DTU Engineering Team',

        slug:
          'aiims-hospital-electrical-consultancy-dtu-team',

        clientName:
          'All India Institute of Medical Sciences (AIIMS)',

        location: 'New Delhi & Bhopal',

        summary:
          'Electrical consultancy, load auditing, switchgear inspection, and power quality analysis in technical collaboration with DTU team.',

        description:
          'Joint technical electrical audit and consultancy at AIIMS facilities, analyzing transformer efficiency, panel thermal signatures, and power factor optimization.',

        highlights: [
          'High-precision power quality and thermal imaging inspection',
          'Recommendations implemented for hospital power backup efficiency',
        ],

        isFeatured: true,
        status: 'published',
      },
    ];

    for (const project of authenticProjects) {
      await Project.create(project);

      console.log(
        `[Seed Script] Created Project: ${project.title}`
      );
    }

    // ============================================================
    // 6. SEED AUTHENTIC CLIENT PARTNERS
    // ============================================================

    const authenticClients = [
      {
        name: 'Max Healthcare Institute',
        industrySector: 'Healthcare',
      },

      {
        name: 'Mahindra & Mahindra Ltd',
        industrySector: 'Automotive & Manufacturing',
      },

      {
        name: 'Maruti Suzuki India Ltd',
        industrySector: 'Automotive',
      },

      {
        name: 'Kajaria Ceramics Ltd',
        industrySector: 'Building Materials',
      },

      {
        name: 'TVS Supply Chain Solutions',
        industrySector: 'Logistics & Warehousing',
      },

      {
        name: 'Federal Bank',
        industrySector: 'Banking & Financial',
      },

      {
        name: 'IndusInd Bank',
        industrySector: 'Banking & Financial',
      },

      {
        name: 'Pacific Bansal Group',
        industrySector: 'Real Estate & Infrastructure',
      },

      {
        name: 'Bharti Airtel Data Centre',
        industrySector: 'Telecommunications & IT',
      },

      {
        name: 'JCB India (Excon)',
        industrySector: 'Heavy Machinery',
      },

      {
        name: 'National Testing House',
        industrySector: 'Government Inspection',
      },

      {
        name: 'Pragti Maidan Exhibitions',
        industrySector: 'International Trade Shows',
      },
    ];

    for (const client of authenticClients) {
      await Client.create({
        ...client,
        status: 'published',
      });

      console.log(
        `[Seed Script] Created Client: ${client.name}`
      );
    }

    // ============================================================
    // COMPLETE
    // ============================================================

    console.log(`==================================================`);
    console.log(
      `AUTHENTIC EKTA ELECTRICAL DATA SEEDED SUCCESSFULLY!`
    );
    console.log(`Company:       EKTA ELECTRICAL WORKS`);
    console.log(
      `Address:       C-82 Begum Vihar, Begumpur, opp. Rohini Sec-22, Delhi-110086`
    );
    console.log(
      `Phone:         +91 9899442333 / +91 9811589108`
    );
    console.log(
      `Admin Email:   ${normalizedAdminEmail}`
    );
    console.log(
      `Admin Password: configured securely via environment variable`
    );
    console.log(`==================================================`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      `[Seed Script Error]: ${error.message}`
    );

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedData();
const operators = [
    // ATTACKERS,

    {
        name: "Sledge",
        side: "Attack",

        gadgets: [
            "Frag Grenade",
            "Stun Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "P226 Mk 25",
            "Reaper MK2"
        ],

        primaryWeapons: [
            "L85A2",
            "M590A1"
        ],

        uniqueAbility: "Breaching Hammer",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Thatcher",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Claymore"
        ],

        secondaryWeapons: [
            "P226 Mk 25"
        ],

        primaryWeapons: [
            "AR33",
            "L85A2",
            "M590A1",
            "PMR90A2"
        ],

        uniqueAbility: "E.G.S. Disruptor",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Ash",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Claymore"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "M45 MEUSOC"
        ],

        primaryWeapons: [
            "G36C",
            "R4-C"
        ],

        uniqueAbility: "Breaching Round",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Thermite",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Stun Grenade"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "M45 MEUSOC",
            "ITA12S"
        ],

        primaryWeapons: [
            "556xi",
            "M1014"
        ],

        uniqueAbility: "Exothermic Charge",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Twitch",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "P9",
            "LFP586"
        ],

        primaryWeapons: [
            "F2",
            "417",
            "SG-CQB"
        ],

        uniqueAbility: "Shock Drone",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Montagne",
        side: "Attack",

        gadgets: [
            "Hard Breach Charge",
            "Smoke Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "P9",
            "LFP586"
        ],

        primaryWeapons: [
            "Le Roc Shield"
        ],

        uniqueAbility: "Le Roc Shield",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Glaz",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Frag Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "PMM",
            "Gonne-6",
            "Bearing 9"
        ],

        primaryWeapons: [
            "OTs-03"
        ],

        uniqueAbility: "Flip Sight",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Fuze",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Hard Breach Charge",
            "Smoke Grenade"
        ],

        secondaryWeapons: [
            "PMM",
            "GSh-18"
        ],

        primaryWeapons: [
            "AK-12",
            "6P41",
            "Ballistic Shield"
        ],

        uniqueAbility: "Cluster Charge",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Blitz",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Breach Charge"
        ],

        secondaryWeapons: [
            "P12"
        ],

        primaryWeapons: [
            "G52-Tactical Shield"
        ],

        uniqueAbility: "G52-Tactical Shield",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "IQ",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Frag Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "P12"
        ],

        primaryWeapons: [
            "AUG A2",
            "552 Commando",
            "G8A1"
        ],

        uniqueAbility: "Electronics Detector",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Buck",
        side: "Attack",

        gadgets: [
            "Stun Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "Mk1 9mm"
        ],

        primaryWeapons: [
            "C8-SFW",
            "CAMRS"
        ],

        uniqueAbility: "Skeleton Key",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Blackbeard",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Frag Grenade"
        ],

        secondaryWeapons: [],

        primaryWeapons: [
            "Mk17 CQB",
            "SR-25"
        ],

        uniqueAbility: "H.U.L.L. Adaptable Shield",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Capitao",
        acceptedNames: [
            "Capitão"
        ],
        side: "Attack",

        gadgets: [
            "Claymore",
            "Hard Breach Charge",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "Gonne-6",
            "PRB92"
        ],

        primaryWeapons: [
            "M249",
            "PARA-308",
            "PMR90A2"
        ],

        uniqueAbility: "Tactical Crossbow",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Hibana",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Stun Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "Bearing 9",
            "P229"
        ],

        primaryWeapons: [
            "SuperNova",
            "Type-89",
            "PMR90A2"
        ],

        uniqueAbility: "X-Kairos",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Jackal",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Smoke Grenade"
        ],

        secondaryWeapons: [
            "USP40",
            "ITA12S"
        ],

        primaryWeapons: [
            "C7E",
            "PDW9",
            "ITA12L"
        ],

        uniqueAbility: "Eyenox Model III",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Ying",
        side: "Attack",

        gadgets: [
            "Hard Breach Charge",
            "Smoke Grenade"
        ],

        secondaryWeapons: [
            "Q-929",
            "Reaper MK2"
        ],

        primaryWeapons: [
            "T-95 LSW",
            "SIX12"
        ],

        uniqueAbility: "Candela",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Zofia",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Hard Breach Charge"
        ],

        secondaryWeapons: [
            "RG15"
        ],

        primaryWeapons: [
            "LMG-E",
            "M762"
        ],

        uniqueAbility: "KS79 Lifeline",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Dokkaebi",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "Gonne-6",
            "SMG-12",
            "C75 Auto"
        ],

        primaryWeapons: [
            "BOSG.12.2",
            "Mk 14 EBR",
            "XK23"
        ],

        uniqueAbility: "Jegeo Payload",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Lion",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Frag Grenade",
            "Stun Grenade"
        ],

        secondaryWeapons: [
            "LFP586",
            "P9"
        ],

        primaryWeapons: [
            "417",
            "SG-CQB",
            "V308"
        ],

        uniqueAbility: "EE-ONE-D",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Finka",
        side: "Attack",

        gadgets: [
            "Frag Grenade",
            "Smoke Grenade",
            "Stun Grenade"
        ],

        secondaryWeapons: [
            "GSh-18",
            "PMM"
        ],

        primaryWeapons: [
            "6P41",
            "SASG-12",
            "Spear .308"
        ],

        uniqueAbility: "Adrenal Surge",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Maverick",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Smoke Grenade",
            "Stun Grenade",
            "Frag Grenade"
        ],

        secondaryWeapons: [
            "1911 TACOPS",
            "C75 Auto",
            "Reaper MK2"
        ],

        primaryWeapons: [
            "AR-15.50",
            "M4"
        ],

        uniqueAbility: "Breaching Torch",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Nomad",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Stun Grenade"
        ],

        secondaryWeapons: [
            "PRB92",
            ".44 Mag Semi-Auto"
        ],

        primaryWeapons: [
            "AK-74M",
            "ARX200"
        ],

        uniqueAbility: "Airjab Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Gridlock",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Frag Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "Super Shorty",
            "SDP 9mm"
        ],

        primaryWeapons: [
            "F90",
            "M249 SAW"
        ],

        uniqueAbility: "Trax Stingers",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Nokk",
        acceptedNames: [
            "Nøkk"
        ],
        side: "Attack",

        gadgets: [
            "Hard Breach Charge",
            "Frag Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "D-50"
        ],

        primaryWeapons: [
            "FMG-9",
            "SIX12 SD",
            "PMR90A2"
        ],

        uniqueAbility: "HEL Presence Reduction",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Amaru",
        side: "Attack",

        gadgets: [
            "Stun Grenade",
            "Hard Breach Charge"
        ],

        secondaryWeapons: [
            "Gonne-6",
            "SMG-11",
            "ITA12S"
        ],

        primaryWeapons: [
            "G8A1",
            "SuperNova"
        ],

        uniqueAbility: "Garra Hook",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Kali",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Claymore",
            "Smoke Grenade"
        ],

        secondaryWeapons: [
            "SPSMG9",
            "C75 Auto",
            "P226 Mk 25"
        ],

        primaryWeapons: [
            "CSRX 300"
        ],

        uniqueAbility: "LV Explosive Lance",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Iana",
        side: "Attack",

        gadgets: [
            "Impact EMP Grenade",
            "Smoke Grenade"
        ],

        secondaryWeapons: [
            "Gonne-6",
            "Mk1 9mm"
        ],

        primaryWeapons: [
            "ARX200",
            "G36C"
        ],

        uniqueAbility: "Gemini Replicator",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Ace",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Claymore"
        ],

        secondaryWeapons: [
            "P9"
        ],

        primaryWeapons: [
            "AK-12",
            "M1014"
        ],

        uniqueAbility: "S.E.L.M.A. Aqua Breacher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Zero",
        side: "Attack",

        gadgets: [
            "Hard Breach Charge",
            "Claymore"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "Gonne-6"
        ],

        primaryWeapons: [
            "MP7",
            "SC3000K"
        ],

        uniqueAbility: "Argus Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Flores",
        side: "Attack",

        gadgets: [
            "Stun Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "GSh-18"
        ],

        primaryWeapons: [
            "AR33",
            "SR-25",
            "T-95 LSW"
        ],

        uniqueAbility: "RCE-Ratero Charge",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Osa",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Frag Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "PMM"
        ],

        primaryWeapons: [
            "556xi",
            "PDW9"
        ],

        uniqueAbility: "Talon-8 Clear Shield",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Sens",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Frag Grenade",
            "Hard Breach Charge"
        ],

        secondaryWeapons: [
            "SDP 9mm"
        ],

        primaryWeapons: [
            "417",
            "POF9"
        ],

        uniqueAbility: "R.O.U. Projector System",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Grim",
        side: "Attack",

        gadgets: [
            "Claymore",
            "Hard Breach Charge",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "Bailiff 410",
            "P229"
        ],

        primaryWeapons: [
            "552 Commando",
            "SG-CQB"
        ],

        uniqueAbility: "Kawan Hive Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Brava",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Claymore"
        ],

        secondaryWeapons: [
            "USP40",
            "Super Shorty"
        ],

        primaryWeapons: [
            "PARA-308",
            "CAMRS"
        ],

        uniqueAbility: "Kludge Drone",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Ram",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Stun Grenade"
        ],

        secondaryWeapons: [
            "Mk1 9mm"
        ],

        primaryWeapons: [
            "LMG-E",
            "R4-C"
        ],

        uniqueAbility: "BU-GI Auto Breacher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Deimos",
        side: "Attack",

        gadgets: [
            "Frag Grenade",
            "Hard Breach Charge"
        ],

        secondaryWeapons: [
            ".44 Vendetta"
        ],

        primaryWeapons: [
            "AK-74M",
            "M590A1"
        ],

        uniqueAbility: "Deathmark Tracker",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Striker",
        side: "Attack",

        gadgets: [
            "Breach Charge",
            "Claymore",
            "Frag Grenade",
            "Hard Breach Charge",
            "Smoke Grenade",
            "Stun Grenade",
            "Impact EMP Grenade"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "ITA12S"
        ],

        primaryWeapons: [
            "M4",
            "M249",
            "SR-25"
        ],

        uniqueAbility: "Can Equip Two Different Attack Gadgets",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Rauora",
        side: "Attack",

        gadgets: [
            "Smoke Grenade",
            "Breach Charge"
        ],

        secondaryWeapons: [
            "Reaper MK2",
            "GSh-18"
        ],

        primaryWeapons: [
            "417",
            "M249"
        ],

        uniqueAbility: "D.O.M. Panel Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Solid Snake",
        acceptedNames: [
            "Snake"
        ],
        side: "Attack",

        gadgets: [
            "Frag Grenade",
            "Stun Grenade",
            "Impact EMP Grenade",
            "Smoke Grenade",
            "Breach Charge"
        ],

        secondaryWeapons: [
            "TACIT .45"
        ],

        primaryWeapons: [
            "F2",
            "PMR90A2"
        ],

        uniqueAbility: "Soliton Radar MK III and On-Site Procurement",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    // DEFENDERS,

    {
        name: "Smoke",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "P226 Mk 25",
            "SMG-11"
        ],

        primaryWeapons: [
            "M590A1",
            "FMG-9"
        ],

        uniqueAbility: "Remote Gas Grenade",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Mute",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Nitro Cell"
        ],

        secondaryWeapons: [
            "P226 Mk 25",
            "SMG-11"
        ],

        primaryWeapons: [
            "MP5K",
            "M590A1"
        ],

        uniqueAbility: "Signal Disruptor",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Castle",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Bulletproof Camera"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "Super Shorty",
            "M45 MEUSOC"
        ],

        primaryWeapons: [
            "UMP45",
            "M1014"
        ],

        uniqueAbility: "Armor Panel",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Pulse",
        side: "Defense",

        gadgets: [
            "Nitro Cell",
            "Deployable Shield",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "5.7 USG",
            "M45 MEUSOC",
            "Reaper MK2"
        ],

        primaryWeapons: [
            "UMP45",
            "M1014"
        ],

        uniqueAbility: "Cardiac Sensor",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Doc",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Barbed Wire"
        ],

        secondaryWeapons: [
            "P9",
            "LFP586",
            "Bailiff 410"
        ],

        primaryWeapons: [
            "MP5",
            "P90",
            "SG-CQB"
        ],

        uniqueAbility: "Stim Pistol",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Rook",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Impact Grenade",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "Reaper MK2",
            "P9",
            "LFP586"
        ],

        primaryWeapons: [
            "MP5",
            "P90",
            "SG-CQB"
        ],

        uniqueAbility: "Armor Pack",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Kapkan",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Bulletproof Camera"
        ],

        secondaryWeapons: [
            "PMM",
            "GSh-18"
        ],

        primaryWeapons: [
            "9x19VSN",
            "SASG-12"
        ],

        uniqueAbility: "Entry Denial Device",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Tachanka",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Proximity Alarm",
            "Deployable Shield"
        ],

        secondaryWeapons: [
            "PMM",
            "GSh-18",
            "Bearing 9"
        ],

        primaryWeapons: [
            "DP27",
            "9x19VSN"
        ],

        uniqueAbility: "Shumikha Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Jager",
        acceptedNames: [
            "Jäger"
        ],
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "P12"
        ],

        primaryWeapons: [
            "M870",
            "416-C Carbine"
        ],

        uniqueAbility: "Active Defense System",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Bandit",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Nitro Cell"
        ],

        secondaryWeapons: [
            "P12"
        ],

        primaryWeapons: [
            "MP7",
            "M870"
        ],

        uniqueAbility: "Shock Wire",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Frost",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Deployable Shield"
        ],

        secondaryWeapons: [
            "Mk1 9mm",
            "ITA12S"
        ],

        primaryWeapons: [
            "Super 90",
            "9mm C1"
        ],

        uniqueAbility: "Welcome Mat",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Valkyrie",
        side: "Defense",

        gadgets: [
            "Impact Grenade",
            "Nitro Cell"
        ],

        secondaryWeapons: [
            "D-50"
        ],

        primaryWeapons: [
            "MPX",
            "SPAS-12"
        ],

        uniqueAbility: "Black Eye",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Caveira",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Impact Grenade",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "Luison"
        ],

        primaryWeapons: [
            "M12",
            "SPAS-15"
        ],

        uniqueAbility: "Silent Step",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Echo",
        side: "Defense",

        gadgets: [
            "Impact Grenade",
            "Deployable Shield"
        ],

        secondaryWeapons: [
            "Bearing 9",
            "P229"
        ],

        primaryWeapons: [
            "MP5SD",
            "SuperNova"
        ],

        uniqueAbility: "Yokai",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Mira",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Nitro Cell"
        ],

        secondaryWeapons: [
            "USP40",
            "ITA12S"
        ],

        primaryWeapons: [
            "Vector .45 ACP",
            "ITA12L"
        ],

        uniqueAbility: "Black Mirror",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Lesion",
        side: "Defense",

        gadgets: [
            "Observation Blocker",
            "Bulletproof Camera"
        ],

        secondaryWeapons: [
            "Q-929",
            "Super Shorty"
        ],

        primaryWeapons: [
            "SIX12 SD",
            "T-5 SMG"
        ],

        uniqueAbility: "Gu Mine",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Ela",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Deployable Shield",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "RG15"
        ],

        primaryWeapons: [
            "Scorpion EVO 3 A1",
            "FO-12"
        ],

        uniqueAbility: "Grzmot Mine",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Vigil",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "C75 Auto",
            "SMG-12"
        ],

        primaryWeapons: [
            "K1A",
            "BOSG.12.2"
        ],

        uniqueAbility: "ERC-7",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Alibi",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "Keratos .357",
            "Bailiff 410"
        ],

        primaryWeapons: [
            "Mx4 Storm",
            "ACS12"
        ],

        uniqueAbility: "Prisma",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Maestro",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Impact Grenade",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "Keratos .357",
            "Bailiff 410"
        ],

        primaryWeapons: [
            "ALDA 5.56",
            "ACS12"
        ],

        uniqueAbility: "Evil Eye",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Clash",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "P-10C",
            "SPSMG9",
            "Super Shorty"
        ],

        primaryWeapons: [
            "CCE Shield MK2"
        ],

        uniqueAbility: "CCE Shield MK2",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Kaid",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Nitro Cell",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            ".44 Mag Semi-Auto",
            "LFP586"
        ],

        primaryWeapons: [
            "AUG A3",
            "TCSG12"
        ],

        uniqueAbility: "\"Rtila\" Electroclaw",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Mozzie",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Nitro Cell",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "SDP 9mm",
            "Super Shorty"
        ],

        primaryWeapons: [
            "Commando 9",
            "P10 RONI"
        ],

        uniqueAbility: "Pest Launcher",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Warden",
        side: "Defense",

        gadgets: [
            "Deployable Shield",
            "Nitro Cell",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "P-10C",
            "SMG-12"
        ],

        primaryWeapons: [
            "M590A1",
            "MPX"
        ],

        uniqueAbility: "Glance Smart Glasses",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Goyo",
        side: "Defense",

        gadgets: [
            "Proximity Alarm",
            "Bulletproof Camera",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "P229"
        ],

        primaryWeapons: [
            "Vector .45 ACP",
            "TCSG12"
        ],

        uniqueAbility: "Volcán Canister",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Wamai",
        side: "Defense",

        gadgets: [
    "Proximity Alarm",
    "Nitro Cell",
    "Deployable Shield"
],
        secondaryWeapons: [
            "Super Shorty",
            "P12",
            "Keratos .357"
        ],

        primaryWeapons: [
            "AUG A2",
            "MP5K"
        ],

        uniqueAbility: "Mag-NET System",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Oryx",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "Bailiff 410",
            "Reaper MK2",
            "USP40"
        ],

        primaryWeapons: [
            "SPAS-12",
            "T-5 SMG"
        ],

        uniqueAbility: "Remah Dash",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Melusi",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Impact Grenade"
        ],

        secondaryWeapons: [
            "ITA12S",
            "RG15"
        ],

        primaryWeapons: [
            "MP5",
            "Super 90"
        ],

        uniqueAbility: "Banshee Sonic Defense",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Aruni",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Barbed Wire"
        ],

        secondaryWeapons: [
            "PRB92"
        ],

        primaryWeapons: [
            "P10 RONI",
            "Mk 14 EBR"
        ],

        uniqueAbility: "Surya Gate",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Thunderbird",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Bulletproof Camera",
            "Deployable Shield"
        ],

        secondaryWeapons: [
            "Bearing 9",
            "Q-929",
            "ITA12S"
        ],

        primaryWeapons: [
            "SPAS-15",
            "Spear .308"
        ],

        uniqueAbility: "Kóna Station",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Thorn",
        side: "Defense",

        gadgets: [
            "Deployable Shield",
            "Barbed Wire"
        ],

        secondaryWeapons: [
            "1911 TACOPS",
            "C75 Auto"
        ],

        primaryWeapons: [
            "UZK50Gi",
            "M870"
        ],

        uniqueAbility: "Razorbloom Shell",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Azami",
        side: "Defense",

        gadgets: [
            "Impact Grenade",
            "Barbed Wire"
        ],

        secondaryWeapons: [
            "D-50"
        ],

        primaryWeapons: [
            "9x19VSN",
            "ACS12"
        ],

        uniqueAbility: "Kiba Barrier",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Solis",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "SMG-11"
        ],

        primaryWeapons: [
            "ITA12L",
            "P90"
        ],

        uniqueAbility: "SPEC-IO Electro-Sensor",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Fenrir",
        side: "Defense",

        gadgets: [
            "Bulletproof Camera",
            "Observation Blocker"
        ],

        secondaryWeapons: [
            "5.7 USG"
        ],

        primaryWeapons: [
            "MP7",
            "SASG-12"
        ],

        uniqueAbility: "F-Natt Dread Mine",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Tubarao",
        acceptedNames: [
            "Tubarão"
        ],
        side: "Defense",

        gadgets: [
            "Nitro Cell",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "P226 Mk 25"
        ],

        primaryWeapons: [
            "MPX",
            "AR-15.50"
        ],

        uniqueAbility: "Zoto Canister",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Sentry",
        side: "Defense",

        gadgets: [
            "Barbed Wire",
            "Bulletproof Camera",
            "Deployable Shield",
            "Observation Blocker",
            "Impact Grenade",
            "Nitro Cell",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "C75 Auto",
            "Super Shorty"
        ],

        primaryWeapons: [
            "Commando 9",
            "M870",
            "TCSG12"
        ],

        uniqueAbility: "Can Equip Two Different Defense Gadgets",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Skopos",
        acceptedNames: [
            "Skopós"
        ],
        side: "Defense",

        gadgets: [
            "Impact Grenade",
            "Proximity Alarm"
        ],

        secondaryWeapons: [
            "P229"
        ],

        primaryWeapons: [
            "PCX-33"
        ],

        uniqueAbility: "V10 Pantheon Shells",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    },

    {
        name: "Denari",
        side: "Defense",

        gadgets: [
            "Observation Blocker",
            "Deployable Shield"
        ],

        secondaryWeapons: [
            "Glaive-12",
            "P226 Mk 25"
        ],

        primaryWeapons: [
            "Scorpion EVO 3 A1",
            "FMG-9"
        ],

        uniqueAbility: "T.R.I.P. Connector",

        images: {
            operator: "",
            gadgets: [],
            secondaryWeapons: [],
            primaryWeapons: [],
            ability: ""
        }
    }
];
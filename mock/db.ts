export const mockDB = {
  "/coins": {
    data: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        slug: "btc",
        logo: "",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        slug: "eth",
        logo: "",
      },
      {
        id: "3",
        name: "Solana",
        symbol: "SOL",
        slug: "sol",
        logo: "",
      },
    ],
  },
  "/coins/BTC/price": {
    data: {
      slug: "btc",
      symbol: "BTC",
      price: 65000,
    },
  },

  "/portfolio-transactions": {
    data: [
      {
        id: "tx1",
        portfolio_id: "1",
        slug: "btc",
        type: "buy",
        quantity: 1,
        price: 60000,
        fee: 10,
        note: "initial buy",
        date: "2026-01-01",
      },
    ],
  },
  "/portfolios": {
    data: [
      {
        id: "1",
        name: "Main Portfolio",
        avatar: "🚀",
        background_color: "#2b2d42",
      },
      {
        id: "2",
        name: "DeFi Portfolio",
        avatar: "💰",
        background_color: "#1b4332",
      },
    ],
    meta: {
      total_actual_value: 12000,
    },
  },
  "/portfolio/transactions": {
    data: [
      {
        id: "t1",
        type: "buy",
        quantity: 0.5,
        price: 65000,
        fee: 12.5,
        date: "2026-01-10 14:32",
        note: "DCA entry",
      },
      {
        id: "t2",
        type: "sell",
        quantity: 0.2,
        price: 70000,
        fee: 8.2,
        date: "2026-01-12 10:15",
        note: "partial profit",
      },
      {
        id: "t3",
        type: "buy",
        quantity: 1.2,
        price: 3400,
        fee: 5.0,
        date: "2026-01-15 18:40",
        note: "",
      },
    ],
    meta: {
      total_count: 3,
    },
  },
  "/coin-report/bitcoin": {
    data: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/btc.svg",
      is_favorite: true,
      ee_signal: "BUY",
      plan_type: "pro",
      category: "Store of Value",
      circulating_supply: 19000000,
      total_supply: 21000000,
      max_supply: 21000000,
      current_price: 65000,
      market_cap: 1200000000000,
      liquidity_index: 95,
      cmr: 8.5,
      rtl: 7,
      data_sufficiency: 9,
      potential_multiplier: 1.8,
      potential_multiplier_start_date: "2024-01-01",
      potential_multiplier_end_date: "2025-01-01",

      risk_level: "medium",
      target_price: 80000,
      target_price_date: "2025-01-01",

      report_summery: "Bitcoin remains strong...",

      reports: [
        { title: "Overview", content: "..." },
        { title: "Analysis", content: "..." },
      ],
    },
    meta: {},
  },
  "/coin-report/{slug}/favorite": {
    post: {
      success: true,
    },
    delete: {
      success: true,
    },
  },
  "/coin-report": {
    data: [
      {
        id: "1",
        name: "Bitcoin",
        slug: "btc",
        category: "btc",
        signal: "buy",
        symbol: "BTC",
        cmr: 120,
        cmr_change_percentage: 5.2,

        potential_multiplier: 3.5,
        rtl: 12.4,
        risk_level: "Low",

        current_price: 65000,

        is_favorite: true,
        packages: "plankton",
      },
      {
        id: "2",
        name: "Ethereum",
        slug: "eth",
        category: "eth",
        signal: "sell",
        symbol: "ETH",
        cmr: 80,
        cmr_change_percentage: -2.1,

        potential_multiplier: 2.1,
        rtl: 8.7,
        risk_level: "Mid",

        current_price: 3500,

        is_favorite: false,
        packages: "fish",
      },
      {
        id: "3",
        name: "Solana",
        slug: "sol",
        category: "sol",
        signal: "buy",
        symbol: "SOL",
        cmr: 60,
        cmr_change_percentage: 10.5,

        potential_multiplier: 4.2,
        rtl: 18.9,
        risk_level: "High",

        current_price: 180,
        is_favorite: true,
        packages: "shrimp",
      },
    ],
    meta: {
      total_count: 3,
      next_update: 176,
    },
  },
  "/global-video-global": {
    data: {
      videos: [
        {
          title: "Welcome Video",
          videoLink: "https://cdn.demo.com/video1.mp4",
          videoPage: "/videos/1",
        },
        {
          title: "Product Overview",
          videoLink: "https://cdn.demo.com/video2.mp4",
          videoPage: "/videos/2",
        },
      ],
    },
  },
  "/coin-report/categories": {
    data: [
      { name: "Bitcoin", slug: "btc" },
      { name: "Ethereum", slug: "eth" },
      { name: "Solana", slug: "sol" },
      { name: "Gaming Coins", slug: "gaming" },
    ],
  },
  "/global-socialmedia": {
    data: {
      socialLinks: [
        {
          id: "1",
          name: "Twitter",
          url: "https://x.com/demo",
          icon: { url: "https://cdn.icons.com/x.png" },
        },
        {
          id: "2",
          name: "Discord",
          url: "https://discord.gg/demo",
          icon: { url: "https://cdn.icons.com/discord.png" },
        },
      ],
    },
  },

  "/roadmaps": {
    data: {
      docs: [
        {
          title: "Frontend Roadmap",
          dateOnly: "2026-01-01",
          descriptionText: "Learn React, Next.js, TypeScript",
          status: "active",
          image: {
            sizes: {
              roadmap: {
                url: "https://cdn.demo.com/roadmap1.png",
              },
            },
          },
        },
        {
          title: "Backend Roadmap",
          dateOnly: "2026-02-01",
          descriptionText: "Learn Node.js, DB, APIs",
          status: "active",
          image: {
            sizes: {
              roadmap: {
                url: "https://cdn.demo.com/roadmap2.png",
              },
            },
          },
        },
        {
          title: "Full Stack Roadmap",
          dateOnly: "2026-02-01",
          descriptionText: "Learn Node.js, DB, APIs",
          status: "active",
          image: {
            sizes: {
              roadmap: {
                url: "https://cdn.demo.com/roadmap2.png",
              },
            },
          },
        },
      ],
    },
  },

  "/global-livefeed": {
    data: {
      author: "System Bot",
      title: "Live Update",
      text: "Mock system is running perfectly 🚀",
    },
  },

  "/auth/me": {
    data: {
      id: "user_1",
      email: "demo@mock.com",
      avatar_url: "https://cdn.demo.com/avatar.png",
      full_name: "Mock User",
      kyc_status: true,
      plan_type: "pro",
      rank_type: "gold",
      has_2fa: false,
      banned: false,
      suspended: false,
      telegram_group_joined: true,
      telegram_id: "123456",
      business_info: {
        address: "Main Street 1",
        city: "Yerevan",
        company_name: "Mock Corp",
        country: "Armenia",
        email: "biz@mock.com",
        holder_name: "John Doe",
        zip_code: "0001",
        vat_number: "VAT123",
        registration_number: "REG999",
        created_at: "2026-01-01",
      },
    },
  },

  "/affiliate/how-it-works": {
    data: {
      layout: [
        {
          blockType: "text",
          blockTitle: "Step 1",
          title: "Join Program",
          text: "Sign up and start earning",
          buttonText: "Join",
          buttonLink: "/join",
          layout: [],
        },
        {
          blockType: "text",
          blockTitle: "Step 2",
          title: "Share Link",
          text: "Invite friends",
          buttonText: "Share",
          buttonLink: "/share",
          layout: [],
        },
      ],
    },
  },

  "/global-dropzone": {
    data: {
      status: "active",
      message: "Drop zone is live",
      timestampUnix: Date.now(),
      coins: [
        {
          name: "Gold Coin",
          cmrValue: 100,
          potentialMultiplicator: 2,
          icon: { url: "https://cdn.demo.com/gold.png" },
          membership: [{ slug: "pro" }, { slug: "vip" }],
        },
        {
          name: "Silver Coin",
          cmrValue: 50,
          potentialMultiplicator: 1.5,
          icon: { url: "https://cdn.demo.com/silver.png" },
          membership: [{ slug: "basic" }],
        },
      ],
    },
  },

  "/affiliate/me": {
    data: {
      turnover: 1500,
      agreed_to_tos: true,
      goldCoins: 75,
      rank: {
        type: "silver",
        percent: 65,
      },
      next_rank: {
        gold_coins: 200,
      },
    },
  },
};

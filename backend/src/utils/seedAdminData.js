import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Analytics from "../models/Analytics.js";
import Promotion from "../models/Promotion.js";

dotenv.config();

// Sample user data with more realistic profiles
const sampleUsers = [
  {
    profileId: "p_demo_visual_001",
    name: "Adaeze Okonkwo",
    language: "en",
    interactionMode: "voice",
    disabilities: ["visual"],
    cognitiveScore: 7,
    uiComplexity: "simplified",
    accessibilityPreferences: {
      fontSize: 20,
      contrast: "high",
      ttsSpeed: 1.0,
      largeTargets: true,
      captions: true,
      font: "inter",
    },
    confirmMode: "voice",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_motor_002",
    name: "Chukwudi Eze",
    language: "pcm",
    interactionMode: "voice",
    disabilities: ["motor"],
    cognitiveScore: 8,
    uiComplexity: "simplified",
    accessibilityPreferences: {
      fontSize: 20,
      contrast: "high",
      ttsSpeed: 0.8,
      largeTargets: true,
      captions: false,
      font: "inter",
    },
    confirmMode: "voice",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_cognitive_003",
    name: "Fatima Abubakar",
    language: "ha",
    interactionMode: "text",
    disabilities: ["cognitive"],
    cognitiveScore: 4,
    uiComplexity: "simplified",
    accessibilityPreferences: {
      fontSize: 24,
      contrast: "high",
      ttsSpeed: 0.7,
      largeTargets: true,
      captions: true,
      font: "inter",
    },
    confirmMode: "pin",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_hearing_004",
    name: "Oluwaseun Adeyemi",
    language: "yo",
    interactionMode: "text",
    disabilities: ["hearing"],
    cognitiveScore: 9,
    uiComplexity: "moderate",
    accessibilityPreferences: {
      fontSize: 16,
      contrast: "normal",
      ttsSpeed: 1.0,
      largeTargets: false,
      captions: true,
      font: "inter",
    },
    confirmMode: "pin",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_none_005",
    name: "Emeka Nwosu",
    language: "ig",
    interactionMode: "text",
    disabilities: [],
    cognitiveScore: 10,
    uiComplexity: "detailed",
    accessibilityPreferences: {
      fontSize: 16,
      contrast: "normal",
      ttsSpeed: 1.5,
      largeTargets: false,
      captions: false,
      font: "inter",
    },
    confirmMode: "biometric",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_multi_006",
    name: "Blessing Okoro",
    language: "pcm",
    interactionMode: "voice",
    disabilities: ["visual", "motor"],
    cognitiveScore: 6,
    uiComplexity: "simplified",
    accessibilityPreferences: {
      fontSize: 22,
      contrast: "high",
      ttsSpeed: 0.8,
      largeTargets: true,
      captions: true,
      font: "inter",
    },
    confirmMode: "voice",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_student_007",
    name: "Chioma Nnamdi",
    language: "en",
    interactionMode: "text",
    disabilities: [],
    cognitiveScore: 9,
    uiComplexity: "moderate",
    accessibilityPreferences: {
      fontSize: 16,
      contrast: "normal",
      ttsSpeed: 1.2,
      largeTargets: false,
      captions: false,
      font: "inter",
    },
    confirmMode: "biometric",
    isOnboardingComplete: true,
  },
  {
    profileId: "p_demo_business_008",
    name: "Ibrahim Musa",
    language: "en",
    interactionMode: "text",
    disabilities: [],
    cognitiveScore: 10,
    uiComplexity: "detailed",
    accessibilityPreferences: {
      fontSize: 14,
      contrast: "normal",
      ttsSpeed: 1.5,
      largeTargets: false,
      captions: false,
      font: "inter",
    },
    confirmMode: "biometric",
    isOnboardingComplete: true,
  },
];

// Generate realistic transactions for each user
function generateTransactions() {
  const transactions = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  // Transaction templates based on user behavior
  const transactionTemplates = [
    {
      type: "transfer",
      recipients: ["John Doe", "Mary Smith", "David Johnson", "Sarah Williams"],
    },
    {
      type: "bill_payment",
      recipients: ["NEPA", "DSTV", "MTN", "Airtel", "Gotv"],
    },
    { type: "deposit", recipients: ["Salary", "Freelance Payment", "Gift"] },
  ];

  sampleUsers.forEach((user, userIndex) => {
    // Generate 5-15 transactions per user over the last 30 days
    const numTransactions = 5 + Math.floor(Math.random() * 10);

    for (let i = 0; i < numTransactions; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const timestamp =
        now - daysAgo * dayMs - Math.floor(Math.random() * dayMs);
      const template =
        transactionTemplates[
          Math.floor(Math.random() * transactionTemplates.length)
        ];
      const amount =
        template.type === "deposit"
          ? 50000 + Math.floor(Math.random() * 200000)
          : 1000 + Math.floor(Math.random() * 50000);
      const status =
        Math.random() > 0.1
          ? "completed"
          : Math.random() > 0.5
          ? "pending"
          : "failed";
      const recipient =
        template.recipients[
          Math.floor(Math.random() * template.recipients.length)
        ];

      transactions.push({
        transactionId: `txn_${timestamp}_${userIndex}_${i}`,
        userProfileId: user.profileId,
        type: template.type,
        status: status,
        amount: amount,
        currency: "NGN",
        recipient: recipient,
        sender: user.name,
        recipientAccount:
          template.type === "transfer"
            ? `${Math.floor(Math.random() * 9000000000) + 1000000000}`
            : undefined,
        account: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        description: `${
          template.type === "bill_payment"
            ? "Bill payment to"
            : template.type === "deposit"
            ? "Deposit from"
            : "Transfer to"
        } ${recipient}`,
        narration: `${template.type} - ${recipient}`,
        reference: `REF${timestamp}${i}`,
        timestamp: timestamp,
        timeline: [
          {
            status: "pending",
            timestamp: timestamp,
            description: "Transaction initiated",
          },
          ...(status !== "pending"
            ? [
                {
                  status: status === "completed" ? "processing" : status,
                  timestamp: timestamp + 30000,
                  description:
                    status === "completed"
                      ? "Processing transaction"
                      : "Transaction failed",
                },
              ]
            : []),
          ...(status === "completed"
            ? [
                {
                  status: "completed",
                  timestamp: timestamp + 60000,
                  description: "Transaction completed successfully",
                },
              ]
            : []),
        ],
        metadata: {
          channel: "mobile_app",
          confirmationMethod: user.confirmMode,
        },
      });
    }
  });

  return transactions;
}

// Generate comprehensive analytics data
function generateAnalytics() {
  const analytics = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const emotions = [
    "satisfied",
    "happy",
    "neutral",
    "confused",
    "frustrated",
    "stressed",
  ];
  const eventTypes = [
    "transaction",
    "bill_payment",
    "balance_check",
    "profile_update",
    "ziva_interaction",
  ];

  sampleUsers.forEach((user, userIndex) => {
    // Generate 10-20 analytics events per user
    const numEvents = 10 + Math.floor(Math.random() * 10);

    for (let i = 0; i < numEvents; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const timestamp =
        now - daysAgo * dayMs - Math.floor(Math.random() * dayMs);
      const emotion = emotions[Math.floor(Math.random() * emotions.length)];
      const eventType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      analytics.push({
        profileId: user.profileId,
        sessionId: `session_${timestamp}_${userIndex}_${i}`,
        eventType: eventType,
        timestamp: timestamp,
        emotionalContext: {
          detectedEmotion: emotion,
          confidence: 0.7 + Math.random() * 0.25,
        },
        metadata: {
          duration: Math.floor(Math.random() * 300) + 10,
          interactionMode: user.interactionMode,
        },
      });
    }
  });

  return analytics;
}

// Comprehensive promotions based on user segments and transaction behavior
const samplePromotions = [
  {
    title: "Accessible Savings Boost",
    description:
      "Special 5% bonus interest for users with visual disabilities who maintain a minimum balance of ₦50,000",
    targetSegment: "visual",
    type: "savings",
    offer: "5% bonus interest for 3 months",
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Started 10 days ago
    endDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000), // 80 days from now
    status: "active",
    metrics: {
      views: 245,
      clicks: 89,
      conversions: 34,
    },
  },
  {
    title: "Voice Banking Rewards",
    description:
      "Earn 3% cashback on all voice-initiated transactions. Perfect for hands-free banking!",
    targetSegment: "motor",
    type: "cashback",
    offer: "3% cashback on voice transactions",
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Started 5 days ago
    endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000), // 55 days from now
    status: "active",
    metrics: {
      views: 178,
      clicks: 67,
      conversions: 28,
    },
  },
  {
    title: "Simplified Banking Bonus",
    description:
      "Get ₦5,000 bonus when you complete 10 transactions using our simplified interface",
    targetSegment: "cognitive",
    type: "cashback",
    offer: "₦5,000 bonus after 10 transactions",
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // Started 15 days ago
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    status: "active",
    metrics: {
      views: 312,
      clicks: 145,
      conversions: 67,
    },
  },
  {
    title: "Education Savings Plan",
    description:
      "Special education savings account with 7% interest for students and young professionals",
    targetSegment: "all",
    type: "savings",
    offer: "7% annual interest on education savings",
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Started 20 days ago
    endDate: new Date(Date.now() + 160 * 24 * 60 * 60 * 1000), // 160 days from now
    status: "active",
    metrics: {
      views: 567,
      clicks: 234,
      conversions: 89,
    },
  },
  {
    title: "Bill Payment Cashback",
    description:
      "Get 2% cashback on all utility bill payments. Save while you pay!",
    targetSegment: "all",
    type: "cashback",
    offer: "2% cashback on bill payments",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Started 7 days ago
    endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days from now
    status: "active",
    metrics: {
      views: 892,
      clicks: 456,
      conversions: 178,
    },
  },
  {
    title: "Inclusive Banking Investment",
    description:
      "Low-risk investment opportunity with guaranteed 6% returns for accessibility-focused users",
    targetSegment: "all",
    type: "investment",
    offer: "6% guaranteed returns",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Starts in 7 days
    endDate: new Date(Date.now() + 97 * 24 * 60 * 60 * 1000), // 97 days from now
    status: "scheduled",
    metrics: {
      views: 0,
      clicks: 0,
      conversions: 0,
    },
  },
  {
    title: "Financial Literacy Program",
    description:
      "Free financial education courses with ₦10,000 completion bonus. Learn and earn!",
    targetSegment: "low-cognitive",
    type: "education",
    offer: "₦10,000 bonus on course completion",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Started 30 days ago
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    status: "active",
    metrics: {
      views: 423,
      clicks: 198,
      conversions: 56,
    },
  },
  {
    title: "High-Value Transfer Rewards",
    description:
      "Earn points on transfers above ₦100,000. Redeem for cashback or airtime!",
    targetSegment: "high-cognitive",
    type: "cashback",
    offer: "1 point per ₦1,000 transferred",
    startDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // Started 12 days ago
    endDate: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000), // 48 days from now
    status: "active",
    metrics: {
      views: 234,
      clicks: 87,
      conversions: 45,
    },
  },
  {
    title: "Referral Bonus Program",
    description:
      "Refer friends with disabilities and both get ₦5,000 when they complete their first transaction",
    targetSegment: "all",
    type: "cashback",
    offer: "₦5,000 for you and your friend",
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // Started 60 days ago
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Ended 5 days ago
    status: "ended",
    metrics: {
      views: 1245,
      clicks: 678,
      conversions: 234,
    },
  },
  {
    title: "Hearing Accessibility Upgrade",
    description:
      "Special loan offer for hearing aid purchases with 0% interest for 12 months",
    targetSegment: "hearing",
    type: "loan",
    offer: "0% interest for 12 months",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Starts in 14 days
    endDate: new Date(Date.now() + 104 * 24 * 60 * 60 * 1000), // 104 days from now
    status: "scheduled",
    metrics: {
      views: 0,
      clicks: 0,
      conversions: 0,
    },
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/4all_db"
    );
    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Analytics.deleteMany({});
    await Promotion.deleteMany({});
    await Transaction.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${sampleUsers.length} sample users`);

    // Generate and insert transactions
    const transactions = generateTransactions();
    await Transaction.insertMany(transactions);
    console.log(`✅ Inserted ${transactions.length} sample transactions`);

    // Generate and insert analytics
    const analytics = generateAnalytics();
    await Analytics.insertMany(analytics);
    console.log(`✅ Inserted ${analytics.length} sample analytics events`);

    // Insert sample promotions
    await Promotion.insertMany(samplePromotions);
    console.log(`✅ Inserted ${samplePromotions.length} sample promotions`);

    console.log("\n🎉 Sample data seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${sampleUsers.length} users`);
    console.log(`   - ${transactions.length} transactions`);
    console.log(`   - ${analytics.length} analytics events`);
    console.log(`   - ${samplePromotions.length} promotions`);
    console.log(
      "\n🌐 You can now view the admin dashboard at: http://localhost:3001/admin"
    );
    console.log("   The dashboard is fully populated with demo data!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();

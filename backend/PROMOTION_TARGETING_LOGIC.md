# Promotion Targeting Logic - 4All Banking

## 🎯 How Promotions Are Matched to Users Based on Transaction History

The 4All admin dashboard uses intelligent targeting to match promotions and campaigns to users based on their transaction patterns, accessibility needs, and behavioral data.

## 📊 Targeting Strategies

### 1. **Transaction Type-Based Targeting**

#### Bill Payment Cashback Campaign
**Target**: Users with frequent bill payment transactions

**Logic**:
```javascript
// Analyze user's transaction history
const billPayments = transactions.filter(t => t.type === 'bill_payment');
const billPaymentFrequency = billPayments.length / totalTransactions;

// Target users who make bill payments > 30% of the time
if (billPaymentFrequency > 0.3) {
  recommendPromotion('Bill Payment Cashback');
}
```

**Example Users**:
- Chioma Nnamdi: 3 bill payments out of 10 transactions (30%)
- Blessing Okoro: 4 bill payments out of 12 transactions (33%)

**Promotion**: "Get 2% cashback on all utility bill payments"

---

### 2. **Transaction Amount-Based Targeting**

#### High-Value Transfer Rewards
**Target**: Users with large transfer amounts

**Logic**:
```javascript
// Find users with high-value transfers
const highValueTransfers = transactions.filter(t => 
  t.type === 'transfer' && t.amount > 100000
);

// Target users with at least 2 high-value transfers
if (highValueTransfers.length >= 2) {
  recommendPromotion('High-Value Transfer Rewards');
}
```

**Example Users**:
- Ibrahim Musa: Multiple transfers > ₦100,000 (business profile)
- Emeka Nwosu: 2 transfers > ₦100,000

**Promotion**: "Earn points on transfers above ₦100,000"

---

### 3. **Accessibility Profile-Based Targeting**

#### Voice Banking Rewards
**Target**: Users who prefer voice interaction

**Logic**:
```javascript
// Match users by interaction mode
const voiceUsers = users.filter(u => 
  u.interactionMode === 'voice' || 
  u.confirmMode === 'voice'
);

// Target users with motor or visual disabilities
const targetUsers = voiceUsers.filter(u => 
  u.disabilities.includes('motor') || 
  u.disabilities.includes('visual')
);

targetUsers.forEach(user => {
  recommendPromotion('Voice Banking Rewards', user);
});
```

**Example Users**:
- Adaeze Okonkwo: Visual disability, voice mode
- Chukwudi Eze: Motor disability, voice mode
- Blessing Okoro: Visual + Motor disabilities, voice mode

**Promotion**: "Earn 3% cashback on all voice-initiated transactions"

---

### 4. **Cognitive Score-Based Targeting**

#### Simplified Banking Bonus
**Target**: Users with lower cognitive scores

**Logic**:
```javascript
// Target users who benefit from simplified interfaces
const simplifiedUsers = users.filter(u => 
  u.cognitiveScore <= 6 && 
  u.uiComplexity === 'simplified'
);

simplifiedUsers.forEach(user => {
  recommendPromotion('Simplified Banking Bonus', user);
});
```

**Example Users**:
- Fatima Abubakar: Cognitive score 4, simplified UI
- Blessing Okoro: Cognitive score 6, simplified UI

**Promotion**: "Get ₦5,000 bonus when you complete 10 transactions"

---

### 5. **Deposit Pattern-Based Targeting**

#### Education Savings Plan
**Target**: Students and young professionals with regular deposits

**Logic**:
```javascript
// Analyze deposit patterns
const deposits = transactions.filter(t => t.type === 'deposit');
const avgDepositAmount = deposits.reduce((sum, t) => sum + t.amount, 0) / deposits.length;

// Target users with regular salary/freelance deposits
const regularDeposits = deposits.filter(d => 
  d.recipient.includes('Salary') || 
  d.recipient.includes('Freelance')
);

if (regularDeposits.length >= 2 && avgDepositAmount > 50000) {
  recommendPromotion('Education Savings Plan');
}
```

**Example Users**:
- Chioma Nnamdi: Regular freelance deposits (student profile)
- Ibrahim Musa: Regular salary deposits (business profile)

**Promotion**: "7% annual interest on education savings"

---

### 6. **Disability Segment-Based Targeting**

#### Accessible Savings Boost
**Target**: Users with visual disabilities

**Logic**:
```javascript
// Target specific disability segments
const visualUsers = users.filter(u => 
  u.disabilities.includes('visual')
);

// Check if they maintain minimum balance (from transaction history)
visualUsers.forEach(user => {
  const totalDeposits = calculateTotalDeposits(user);
  const totalWithdrawals = calculateTotalWithdrawals(user);
  const estimatedBalance = totalDeposits - totalWithdrawals;
  
  if (estimatedBalance >= 50000) {
    recommendPromotion('Accessible Savings Boost', user);
  }
});
```

**Example Users**:
- Adaeze Okonkwo: Visual disability, maintains balance
- Blessing Okoro: Visual + Motor disabilities, maintains balance

**Promotion**: "5% bonus interest for users with visual disabilities"

---

## 🔄 Real-Time Promotion Matching

The admin dashboard continuously analyzes:

1. **Transaction Velocity**: How often users transact
2. **Transaction Types**: Preferred transaction methods
3. **Amount Patterns**: Spending and saving behaviors
4. **Accessibility Usage**: Which features users rely on
5. **Emotional Analytics**: User satisfaction and frustration levels
6. **Time Patterns**: When users are most active

## 📈 Campaign Performance Tracking

Each promotion tracks:
- **Views**: How many users saw the promotion
- **Clicks**: How many users clicked for details
- **Conversions**: How many users activated the offer

This data feeds back into the targeting algorithm to improve future campaigns.

## 🎁 Example: Complete User Journey

**User**: Chioma Nnamdi (Student)

**Transaction History**:
- 3 bill payments (DSTV, MTN, Gotv)
- 2 freelance deposits (₦80,770, ₦158,151)
- 5 transfers to friends

**Matched Promotions**:
1. ✅ **Bill Payment Cashback** - High bill payment frequency
2. ✅ **Education Savings Plan** - Regular freelance income
3. ✅ **Referral Bonus Program** - Active social transactions

**Result**: Chioma receives personalized offers that match her actual banking behavior!

---

## 🚀 Implementation in Dashboard

The admin dashboard displays:
- Which users match each promotion
- Conversion rates by segment
- Recommended next campaigns based on user behavior
- A/B testing results for different targeting strategies

This ensures that every promotion is data-driven and maximizes user engagement while providing genuine value to customers.


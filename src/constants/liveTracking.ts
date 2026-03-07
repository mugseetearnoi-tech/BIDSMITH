import {
  ActiveBidTracking,
  TeamInteraction,
  CommunicationMetrics,
  ChemistryUpdate,
  EmergingPartnership,
  DeviationAlert,
  LiveActivity,
} from "@/types";

export const MOCK_ACTIVE_BID_TRACKING: ActiveBidTracking[] = [
  {
    bidId: "bid_001",
    bidTitle: "Digital Infrastructure Modernisation",
    authority: "Greater Manchester Combined Authority",
    deadline: "2026-04-15",
    daysRemaining: 40,
    currentTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "James Chen",
      bidWriter: "David Armstrong",
      pricingSpecialist: "Robert Taylor",
      subjectMatterExperts: [],
    },
    optimalTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "James Chen",
      bidWriter: "David Armstrong",
      pricingSpecialist: "Robert Taylor",
      subjectMatterExperts: [],
    },
    configurationMatch: 100,
    currentChemistry: 94,
    predictedChemistry: 96,
    competitorId: "comp_004",
    competitorName: "CGI IT UK",
  },
  {
    bidId: "bid_002",
    bidTitle: "Smart City IoT Platform Implementation",
    authority: "Birmingham City Council",
    deadline: "2026-03-28",
    daysRemaining: 22,
    currentTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "Priya Patel",
      bidWriter: "Emma Thompson",
      pricingSpecialist: "Robert Taylor",
      subjectMatterExperts: [],
    },
    optimalTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "Priya Patel",
      bidWriter: "David Armstrong",
      pricingSpecialist: "Robert Taylor",
      subjectMatterExperts: [],
    },
    configurationMatch: 75,
    currentChemistry: 82,
    predictedChemistry: 90,
    competitorId: "comp_004",
    competitorName: "CGI IT UK",
  },
  {
    bidId: "bid_003",
    bidTitle: "Cybersecurity Framework Enhancement",
    authority: "Welsh Government",
    deadline: "2026-05-10",
    daysRemaining: 65,
    currentTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "James Chen",
      bidWriter: "David Armstrong",
      subjectMatterExperts: ["Lisa Wong"],
    },
    optimalTeam: {
      projectManager: "Sarah Mitchell",
      technicalLead: "James Chen",
      bidWriter: "David Armstrong",
      subjectMatterExperts: [],
    },
    configurationMatch: 100,
    currentChemistry: 96,
    predictedChemistry: 95,
    competitorId: "comp_002",
    competitorName: "Fujitsu UK",
  },
];

export const MOCK_TEAM_INTERACTIONS: TeamInteraction[] = [
  // bid_001 interactions (last 24 hours)
  { id: "int_001", timestamp: "2026-03-05T14:30:00", bidId: "bid_001", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_002", member2Name: "James Chen", interactionType: "meeting", duration: 60, intensity: "high", topic: "Technical architecture review" },
  { id: "int_002", timestamp: "2026-03-05T13:15:00", bidId: "bid_001", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_006", member2Name: "David Armstrong", interactionType: "document_collab", duration: 45, intensity: "high", topic: "Executive summary collaboration" },
  { id: "int_003", timestamp: "2026-03-05T11:00:00", bidId: "bid_001", member1Id: "tm_002", member1Name: "James Chen", member2Id: "tm_008", member2Name: "Robert Taylor", interactionType: "email", intensity: "medium", topic: "Cost breakdown review" },
  { id: "int_004", timestamp: "2026-03-05T10:20:00", bidId: "bid_001", member1Id: "tm_006", member1Name: "David Armstrong", member2Id: "tm_008", member2Name: "Robert Taylor", interactionType: "call", duration: 30, intensity: "medium", topic: "Value proposition alignment" },
  { id: "int_005", timestamp: "2026-03-05T09:45:00", bidId: "bid_001", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_002", member2Name: "James Chen", interactionType: "slack", intensity: "low", topic: "Quick status update" },
  
  // bid_002 interactions
  { id: "int_006", timestamp: "2026-03-05T15:00:00", bidId: "bid_002", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_005", member2Name: "Priya Patel", interactionType: "meeting", duration: 90, intensity: "high", topic: "IoT analytics strategy session" },
  { id: "int_007", timestamp: "2026-03-05T12:30:00", bidId: "bid_002", member1Id: "tm_003", member1Name: "Emma Thompson", member2Id: "tm_005", member2Name: "Priya Patel", interactionType: "document_collab", duration: 60, intensity: "medium", topic: "Technical section drafting" },
  { id: "int_008", timestamp: "2026-03-05T11:45:00", bidId: "bid_002", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_003", member2Name: "Emma Thompson", interactionType: "email", intensity: "low", topic: "Compliance checklist" },
  { id: "int_009", timestamp: "2026-03-05T10:00:00", bidId: "bid_002", member1Id: "tm_005", member1Name: "Priya Patel", member2Id: "tm_008", member2Name: "Robert Taylor", interactionType: "meeting", duration: 45, intensity: "high", topic: "Data-driven pricing model" },
  
  // bid_003 interactions
  { id: "int_010", timestamp: "2026-03-05T14:00:00", bidId: "bid_003", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_002", member2Name: "James Chen", interactionType: "meeting", duration: 75, intensity: "high", topic: "Security framework design" },
  { id: "int_011", timestamp: "2026-03-05T13:30:00", bidId: "bid_003", member1Id: "tm_002", member1Name: "James Chen", member2Id: "tm_007", member2Name: "Lisa Wong", interactionType: "call", duration: 45, intensity: "high", topic: "Healthcare security requirements" },
  { id: "int_012", timestamp: "2026-03-05T12:00:00", bidId: "bid_003", member1Id: "tm_006", member1Name: "David Armstrong", member2Id: "tm_002", member2Name: "James Chen", interactionType: "document_collab", duration: 90, intensity: "high", topic: "Security messaging strategy" },
];

export const MOCK_COMMUNICATION_METRICS: CommunicationMetrics[] = [
  // bid_001 metrics
  { bidId: "bid_001", memberId: "tm_001", memberName: "Sarah Mitchell", emailsSent: 42, emailsReceived: 38, meetingHours: 12, documentEdits: 28, slackMessages: 156, callMinutes: 240, totalInteractions: 516, lastActive: "2026-03-05T14:30:00" },
  { bidId: "bid_001", memberId: "tm_002", memberName: "James Chen", emailsSent: 35, emailsReceived: 41, meetingHours: 14, documentEdits: 45, slackMessages: 124, callMinutes: 180, totalInteractions: 439, lastActive: "2026-03-05T14:30:00" },
  { bidId: "bid_001", memberId: "tm_006", memberName: "David Armstrong", emailsSent: 28, emailsReceived: 32, meetingHours: 8, documentEdits: 67, slackMessages: 98, callMinutes: 150, totalInteractions: 383, lastActive: "2026-03-05T13:15:00" },
  { bidId: "bid_001", memberId: "tm_008", memberName: "Robert Taylor", emailsSent: 31, emailsReceived: 29, meetingHours: 9, documentEdits: 52, slackMessages: 87, callMinutes: 165, totalInteractions: 373, lastActive: "2026-03-05T11:00:00" },
  
  // bid_002 metrics
  { bidId: "bid_002", memberId: "tm_001", memberName: "Sarah Mitchell", emailsSent: 38, emailsReceived: 35, meetingHours: 11, documentEdits: 22, slackMessages: 142, callMinutes: 210, totalInteractions: 458, lastActive: "2026-03-05T15:00:00" },
  { bidId: "bid_002", memberId: "tm_005", memberName: "Priya Patel", emailsSent: 29, emailsReceived: 33, meetingHours: 13, documentEdits: 38, slackMessages: 105, callMinutes: 195, totalInteractions: 413, lastActive: "2026-03-05T15:00:00" },
  { bidId: "bid_002", memberId: "tm_003", memberName: "Emma Thompson", emailsSent: 24, emailsReceived: 27, meetingHours: 7, documentEdits: 41, slackMessages: 76, callMinutes: 120, totalInteractions: 295, lastActive: "2026-03-05T12:30:00" },
  { bidId: "bid_002", memberId: "tm_008", memberName: "Robert Taylor", emailsSent: 26, emailsReceived: 24, meetingHours: 8, documentEdits: 35, slackMessages: 82, callMinutes: 145, totalInteractions: 320, lastActive: "2026-03-05T10:00:00" },
  
  // bid_003 metrics
  { bidId: "bid_003", memberId: "tm_001", memberName: "Sarah Mitchell", emailsSent: 31, emailsReceived: 28, meetingHours: 9, documentEdits: 18, slackMessages: 118, callMinutes: 175, totalInteractions: 379, lastActive: "2026-03-05T14:00:00" },
  { bidId: "bid_003", memberId: "tm_002", memberName: "James Chen", emailsSent: 33, emailsReceived: 36, meetingHours: 12, documentEdits: 39, slackMessages: 132, callMinutes: 225, totalInteractions: 477, lastActive: "2026-03-05T14:00:00" },
  { bidId: "bid_003", memberId: "tm_006", memberName: "David Armstrong", emailsSent: 25, emailsReceived: 29, meetingHours: 7, documentEdits: 54, slackMessages: 91, callMinutes: 135, totalInteractions: 341, lastActive: "2026-03-05T13:30:00" },
  { bidId: "bid_003", memberId: "tm_007", memberName: "Lisa Wong", emailsSent: 18, emailsReceived: 21, meetingHours: 6, documentEdits: 22, slackMessages: 48, callMinutes: 105, totalInteractions: 220, lastActive: "2026-03-05T13:30:00" },
];

export const MOCK_CHEMISTRY_UPDATES: ChemistryUpdate[] = [
  { id: "cu_001", bidId: "bid_001", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_002", member2Name: "James Chen", previousChemistry: 92, currentChemistry: 94, changeReason: "Increased meeting frequency (+25%) and collaborative document editing sessions", timestamp: "2026-03-05T14:30:00", impact: "positive" },
  { id: "cu_002", bidId: "bid_001", member1Id: "tm_006", member1Name: "David Armstrong", member2Id: "tm_008", member2Name: "Robert Taylor", previousChemistry: 93, currentChemistry: 95, changeReason: "Perfect alignment on value proposition messaging across 4 collaborative sessions", timestamp: "2026-03-05T10:20:00", impact: "positive" },
  { id: "cu_003", bidId: "bid_002", member1Id: "tm_001", member1Name: "Sarah Mitchell", member2Id: "tm_005", member2Name: "Priya Patel", previousChemistry: 89, currentChemistry: 92, changeReason: "Successful IoT strategy workshop with strong consensus building", timestamp: "2026-03-05T15:00:00", impact: "positive" },
  { id: "cu_004", bidId: "bid_002", member1Id: "tm_003", member1Name: "Emma Thompson", member2Id: "tm_005", member2Name: "Priya Patel", previousChemistry: 78, currentChemistry: 74, changeReason: "Decreased communication frequency (-18%) and delayed document review responses", timestamp: "2026-03-04T16:45:00", impact: "negative" },
  { id: "cu_005", bidId: "bid_003", member1Id: "tm_002", member1Name: "James Chen", member2Id: "tm_007", member2Name: "Lisa Wong", previousChemistry: 95, currentChemistry: 97, changeReason: "Exceptional collaboration on healthcare security framework with perfect sync", timestamp: "2026-03-05T13:30:00", impact: "positive" },
];

export const MOCK_EMERGING_PARTNERSHIPS: EmergingPartnership[] = [
  { id: "ep_001", bidId: "bid_002", member1Id: "tm_005", member1Name: "Priya Patel", role1: "Technical Lead", member2Id: "tm_008", member2Name: "Robert Taylor", role2: "Pricing Specialist", interactionCount: 23, emergingChemistry: 89, collaborationPattern: "Data-driven pricing model development with strong analytical synergy", detectedDate: "2026-03-03T10:00:00", confidence: 87 },
  { id: "ep_002", bidId: "bid_003", member1Id: "tm_006", member1Name: "David Armstrong", role1: "Bid Writer", member2Id: "tm_007", member2Name: "Lisa Wong", role2: "Subject Matter Expert", interactionCount: 18, emergingChemistry: 91, collaborationPattern: "Healthcare messaging expertise combining SME knowledge with strategic communication", detectedDate: "2026-03-02T14:20:00", confidence: 84 },
  { id: "ep_003", bidId: "bid_001", member1Id: "tm_002", member1Name: "James Chen", role1: "Technical Lead", member2Id: "tm_006", member2Name: "David Armstrong", role2: "Bid Writer", interactionCount: 31, emergingChemistry: 94, collaborationPattern: "Technical excellence translated into compelling proposal narrative", detectedDate: "2026-03-01T09:15:00", confidence: 92 },
];

export const MOCK_DEVIATION_ALERTS: DeviationAlert[] = [
  {
    id: "alert_001",
    bidId: "bid_002",
    alertType: "team_mismatch",
    severity: "high",
    title: "Suboptimal Bid Writer Assignment",
    description: "Current team uses Emma Thompson (66.7% win rate) instead of recommended David Armstrong (100% win rate vs CGI IT UK)",
    currentValue: "Emma Thompson",
    expectedValue: "David Armstrong",
    recommendation: "Consider reassigning David Armstrong to maximize win probability. Historical data shows 25% higher win rate with David on CGI competitions.",
    timestamp: "2026-03-05T08:00:00",
    acknowledged: false,
  },
  {
    id: "alert_002",
    bidId: "bid_002",
    alertType: "chemistry_drop",
    severity: "medium",
    title: "Chemistry Declining: Emma Thompson + Priya Patel",
    description: "Partnership chemistry dropped from 78 to 74 (-5.1%) due to reduced communication patterns",
    currentValue: 74,
    expectedValue: 78,
    recommendation: "Schedule team sync meeting to realign priorities and improve collaboration frequency. Consider paired working sessions.",
    timestamp: "2026-03-04T16:45:00",
    acknowledged: false,
  },
  {
    id: "alert_003",
    bidId: "bid_002",
    alertType: "suboptimal_pairing",
    severity: "high",
    title: "Configuration Match Below Threshold",
    description: "Current team configuration is only 75% aligned with optimal team recommendation for CGI IT UK competitor matchup",
    currentValue: "75%",
    expectedValue: "90%+",
    recommendation: "Replace Emma Thompson with David Armstrong to achieve 100% configuration match and increase predicted chemistry from 82 to 90.",
    timestamp: "2026-03-05T07:30:00",
    acknowledged: false,
  },
  {
    id: "alert_004",
    bidId: "bid_002",
    alertType: "low_interaction",
    severity: "medium",
    title: "Below-Average Communication: Emma Thompson",
    description: "Emma Thompson's total interactions (295) are 28% below team average (397), indicating potential isolation",
    currentValue: 295,
    expectedValue: 397,
    recommendation: "Increase Emma's involvement in team meetings and collaborative sessions. Assign a collaboration buddy to improve integration.",
    timestamp: "2026-03-05T09:00:00",
    acknowledged: false,
  },
];

export const MOCK_LIVE_ACTIVITY: LiveActivity[] = [
  { id: "la_001", bidId: "bid_001", timestamp: "2026-03-05T14:30:00", activityType: "chemistry_change", description: "Sarah Mitchell + James Chen chemistry increased to 94 (+2.2%)", participants: ["Sarah Mitchell", "James Chen"], impact: "positive" },
  { id: "la_002", bidId: "bid_002", timestamp: "2026-03-05T15:00:00", activityType: "interaction", description: "High-intensity strategy session: Sarah Mitchell + Priya Patel (90 min)", participants: ["Sarah Mitchell", "Priya Patel"], impact: "positive" },
  { id: "la_003", bidId: "bid_003", timestamp: "2026-03-05T14:00:00", activityType: "interaction", description: "Security framework design meeting: Sarah Mitchell + James Chen (75 min)", participants: ["Sarah Mitchell", "James Chen"], impact: "positive" },
  { id: "la_004", bidId: "bid_003", timestamp: "2026-03-05T13:30:00", activityType: "chemistry_change", description: "James Chen + Lisa Wong chemistry reached 97 (+2.1%)", participants: ["James Chen", "Lisa Wong"], impact: "positive" },
  { id: "la_005", bidId: "bid_001", timestamp: "2026-03-05T13:15:00", activityType: "interaction", description: "Executive summary collaboration: Sarah Mitchell + David Armstrong (45 min)", participants: ["Sarah Mitchell", "David Armstrong"], impact: "positive" },
  { id: "la_006", bidId: "bid_002", timestamp: "2026-03-05T12:30:00", activityType: "interaction", description: "Technical section drafting: Emma Thompson + Priya Patel (60 min)", participants: ["Emma Thompson", "Priya Patel"], impact: "neutral" },
  { id: "la_007", bidId: "bid_003", timestamp: "2026-03-05T12:00:00", activityType: "interaction", description: "Security messaging strategy: David Armstrong + James Chen (90 min)", participants: ["David Armstrong", "James Chen"], impact: "positive" },
  { id: "la_008", bidId: "bid_001", timestamp: "2026-03-05T10:20:00", activityType: "chemistry_change", description: "David Armstrong + Robert Taylor chemistry increased to 95 (+2.2%)", participants: ["David Armstrong", "Robert Taylor"], impact: "positive" },
  { id: "la_009", bidId: "bid_002", timestamp: "2026-03-05T10:00:00", activityType: "interaction", description: "Data-driven pricing model session: Priya Patel + Robert Taylor (45 min)", participants: ["Priya Patel", "Robert Taylor"], impact: "positive" },
  { id: "la_010", bidId: "bid_002", timestamp: "2026-03-04T16:45:00", activityType: "deviation", description: "ALERT: Emma Thompson + Priya Patel chemistry dropped to 74 (-5.1%)", participants: ["Emma Thompson", "Priya Patel"], impact: "negative" },
  { id: "la_011", bidId: "bid_001", timestamp: "2026-03-04T15:20:00", activityType: "milestone", description: "Bid_001 team achieved 94% avg chemistry score - exceeding 90% threshold", participants: ["Sarah Mitchell", "James Chen", "David Armstrong", "Robert Taylor"], impact: "positive" },
  { id: "la_012", bidId: "bid_003", timestamp: "2026-03-04T11:30:00", activityType: "milestone", description: "Bid_003 reached 100 total collaborative sessions this week", participants: ["Sarah Mitchell", "James Chen", "David Armstrong", "Lisa Wong"], impact: "positive" },
];

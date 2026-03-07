export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "standard" | "enterprise" | "custom";
}

export interface Bid {
  id: string;
  title: string;
  authority: string;
  deadline: string;
  winProbability: number;
  complianceScore: number;
  status: "active" | "submitted" | "won" | "lost";
  value: number;
}

export interface Document {
  id: string;
  name: string;
  uploadDate: string;
  status: "processing" | "completed" | "failed";
  size: string;
  extractedData?: {
    ppn0620Compliance: boolean;
    keyRequirements: string[];
    deadlines: string[];
  };
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  downloadUrl: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  recommended?: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  size: "SME" | "Large" | "Major";
  specialty: string[];
  totalBids: number;
  wins: number;
  losses: number;
  winRate: number;
  averageBidValue: number;
  marketShare: number;
}

export interface CompetitorTrend {
  month: string;
  competitor: string;
  winRate: number;
  bids: number;
}

export interface PricingStrategy {
  competitor: string;
  category: string;
  avgDiscount: number;
  typicalMargin: number;
  priceRange: { min: number; max: number };
}

export interface TenderPattern {
  competitor: string;
  sector: string;
  frequency: number;
  avgValue: number;
  successRate: number;
}

export interface CompetitorSWOT {
  competitorId: string;
  competitorName: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  overallScore: number;
  marketPosition: { x: number; y: number }; // x: market share, y: win rate
}

export interface AIInsight {
  id: string;
  competitorId: string;
  category: "strength" | "weakness" | "opportunity" | "threat";
  insight: string;
  confidence: number;
  impact: "high" | "medium" | "low";
}

export interface StrategicRecommendation {
  id: string;
  competitorId: string;
  competitorName: string;
  title: string;
  description: string;
  tactics: string[];
  expectedImpact: string;
  priority: "high" | "medium" | "low";
}

export interface HeadToHeadCompetition {
  id: string;
  contractTitle: string;
  authority: string;
  sector: string;
  competitorId: string;
  competitorName: string;
  contractValue: number;
  bidDate: string;
  outcome: "won" | "lost";
  yourScore: number;
  competitorScore: number;
  tacticsUsed: string[];
  winningFactors?: string[];
  losingFactors?: string[];
}

export interface TacticEffectiveness {
  tactic: string;
  timesUsed: number;
  wins: number;
  losses: number;
  winRate: number;
  avgScoreImprovement: number;
  bestAgainst: string[];
  worstAgainst: string[];
}

export interface CompetitorHeadToHead {
  competitorId: string;
  competitorName: string;
  totalCompetitions: number;
  wins: number;
  losses: number;
  winRate: number;
  avgMargin: number;
  totalValue: number;
  recentTrend: "improving" | "declining" | "stable";
}

export interface WinLossInsight {
  id: string;
  category: "success_pattern" | "failure_pattern" | "opportunity" | "warning";
  title: string;
  insight: string;
  supportingData: string;
  actionable: string;
  confidence: number;
  impact: "high" | "medium" | "low";
}

export interface TeamMember {
  id: string;
  name: string;
  role: "Project Manager" | "Technical Lead" | "Bid Writer" | "Subject Matter Expert" | "Pricing Specialist";
  expertise: string[];
  totalBids: number;
  wins: number;
  losses: number;
  winRate: number;
  avgScoreContribution: number;
  yearsExperience: number;
}

export interface TeamComposition {
  competitionId: string;
  projectManager: string;
  technicalLead: string;
  bidWriter: string;
  pricingSpecialist?: string;
  subjectMatterExperts: string[];
  teamSize: number;
}

export interface TeamPerformanceMetric {
  teamMemberId: string;
  memberName: string;
  role: string;
  competitorId: string;
  competitorName: string;
  appearances: number;
  wins: number;
  losses: number;
  winRate: number;
  avgScoreContribution: number;
}

export interface OptimalTeamRecommendation {
  competitorId: string;
  competitorName: string;
  recommendedPM: string;
  recommendedTL: string;
  recommendedBW: string;
  recommendedSMEs: string[];
  reasoning: string[];
  expectedWinRate: number;
  confidence: number;
}

export interface TeamPerformanceTrend {
  month: string;
  teamMemberId: string;
  memberName: string;
  winRate: number;
  bidsLed: number;
}

export interface TeamCollaboration {
  memberId1: string;
  memberName1: string;
  role1: string;
  memberId2: string;
  memberName2: string;
  role2: string;
  collaborations: number;
  wins: number;
  losses: number;
  winRate: number;
  avgCombinedScore: number;
  chemistry: "excellent" | "good" | "neutral" | "poor";
}

export interface CollaborationPattern {
  id: string;
  pattern: string;
  description: string;
  frequency: number;
  winRate: number;
  avgMargin: number;
  examples: string[];
  impact: "high" | "medium" | "low";
}

export interface TeamMemberNetworkMetrics {
  memberId: string;
  memberName: string;
  role: string;
  totalConnections: number;
  strongConnections: number;
  weakConnections: number;
  isolationScore: number;
  centralityScore: number;
  collaborationQuality: number;
}

export interface OptimalChemistry {
  competitorId: string;
  competitorName: string;
  recommendedPairs: Array<{ member1: string; member2: string; role1: string; role2: string; synergy: string }>;
  reasoning: string[];
  expectedSynergy: number;
  confidence: number;
}

export interface CollaborationTimelineEvent {
  id: string;
  date: string;
  eventType: "team_formation" | "chemistry_change" | "project_win" | "project_loss" | "role_change" | "new_hire" | "achievement";
  title: string;
  description: string;
  participants: string[];
  impact: "positive" | "negative" | "neutral";
  chemistryScore?: number;
  relatedProjectId?: string;
}

export interface CriticalMoment {
  id: string;
  date: string;
  momentType: "new_hire" | "role_change" | "major_win" | "major_loss" | "team_restructure" | "partnership_formed";
  title: string;
  description: string;
  teamMembersAffected: string[];
  impact: "high" | "medium" | "low";
  beforeMetrics: { winRate: number; chemistry: number };
  afterMetrics: { winRate: number; chemistry: number };
  consequences: string[];
}

export interface FutureCollaborationForecast {
  id: string;
  partnership: { member1: string; member2: string; role1: string; role2: string };
  projectedChemistry: number;
  confidence: number;
  reasoning: string[];
  recommendedStartDate: string;
  expectedImpact: string;
  optimalSectors: string[];
  riskFactors: string[];
}

export interface ActiveBidTracking {
  bidId: string;
  bidTitle: string;
  authority: string;
  deadline: string;
  daysRemaining: number;
  currentTeam: {
    projectManager: string;
    technicalLead: string;
    bidWriter: string;
    pricingSpecialist?: string;
    subjectMatterExperts: string[];
  };
  optimalTeam: {
    projectManager: string;
    technicalLead: string;
    bidWriter: string;
    pricingSpecialist?: string;
    subjectMatterExperts: string[];
  };
  configurationMatch: number;
  currentChemistry: number;
  predictedChemistry: number;
  competitorId: string;
  competitorName: string;
}

export interface TeamInteraction {
  id: string;
  timestamp: string;
  bidId: string;
  member1Id: string;
  member1Name: string;
  member2Id: string;
  member2Name: string;
  interactionType: "email" | "meeting" | "document_collab" | "slack" | "call";
  duration?: number;
  intensity: "low" | "medium" | "high";
  topic?: string;
}

export interface CommunicationMetrics {
  bidId: string;
  memberId: string;
  memberName: string;
  emailsSent: number;
  emailsReceived: number;
  meetingHours: number;
  documentEdits: number;
  slackMessages: number;
  callMinutes: number;
  totalInteractions: number;
  lastActive: string;
}

export interface ChemistryUpdate {
  id: string;
  bidId: string;
  member1Id: string;
  member1Name: string;
  member2Id: string;
  member2Name: string;
  previousChemistry: number;
  currentChemistry: number;
  changeReason: string;
  timestamp: string;
  impact: "positive" | "negative" | "neutral";
}

export interface EmergingPartnership {
  id: string;
  bidId: string;
  member1Id: string;
  member1Name: string;
  role1: string;
  member2Id: string;
  member2Name: string;
  role2: string;
  interactionCount: number;
  emergingChemistry: number;
  collaborationPattern: string;
  detectedDate: string;
  confidence: number;
}

export interface DeviationAlert {
  id: string;
  bidId: string;
  alertType: "team_mismatch" | "chemistry_drop" | "low_interaction" | "suboptimal_pairing";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  currentValue: string | number;
  expectedValue: string | number;
  recommendation: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface LiveActivity {
  id: string;
  bidId: string;
  timestamp: string;
  activityType: "interaction" | "chemistry_change" | "deviation" | "milestone";
  description: string;
  participants: string[];
  impact: "positive" | "negative" | "neutral";
}

export interface InteractionQualityMetrics {
  memberId1: string;
  memberName1: string;
  memberId2: string;
  memberName2: string;
  qualityScore: number;
  sentimentScore: number;
  effectivenessRating: number;
  avgResolutionSpeed: number;
  highQualityInteractions: number;
  lowQualityInteractions: number;
  communicationTone: "constructive" | "neutral" | "tense";
  collaborationEfficiency: number;
}

export interface SentimentAnalysis {
  id: string;
  interactionId: string;
  memberId1: string;
  memberName1: string;
  memberId2: string;
  memberName2: string;
  interactionType: "email" | "meeting" | "document_collab" | "slack" | "call";
  sentimentType: "positive" | "negative" | "neutral" | "mixed";
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  tone: "enthusiastic" | "professional" | "collaborative" | "frustrated" | "defensive" | "supportive";
  keyPhrases: string[];
  context: string;
  timestamp: string;
}

export interface WeightedChemistryScore {
  memberId1: string;
  memberName1: string;
  role1: string;
  memberId2: string;
  memberName2: string;
  role2: string;
  frequencyBasedScore: number;
  qualityWeightedScore: number;
  scoreDelta: number;
  qualityTier: "exceptional" | "high" | "medium" | "low";
  improvementPotential: number;
}

export interface CoachingRecommendation {
  id: string;
  targetMemberId: string;
  targetMemberName: string;
  partnerMemberId?: string;
  partnerMemberName?: string;
  issueCategory: "communication" | "sentiment" | "resolution_speed" | "collaboration_style" | "feedback_quality" | "conflict_resolution";
  recommendation: string;
  priority: "critical" | "high" | "medium" | "low";
  expectedImpact: string;
  actionItems: string[];
  timeframe: string;
  successMetrics: string[];
}

export interface QualityIndicator {
  category: "meeting_effectiveness" | "email_quality" | "document_collaboration" | "responsiveness" | "problem_solving";
  metric: string;
  score: number;
  benchmark: number;
  status: "exceeds" | "meets" | "below" | "critical";
  trend: "improving" | "stable" | "declining";
}

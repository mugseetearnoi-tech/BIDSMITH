import {
  InteractionQualityMetrics,
  SentimentAnalysis,
  WeightedChemistryScore,
  CoachingRecommendation,
  QualityIndicator,
} from "@/types";

export const MOCK_INTERACTION_QUALITY_METRICS: InteractionQualityMetrics[] = [
  // Sarah Mitchell partnerships
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_002", memberName2: "James Chen", qualityScore: 94, sentimentScore: 92, effectivenessRating: 96, avgResolutionSpeed: 2.4, highQualityInteractions: 48, lowQualityInteractions: 2, communicationTone: "constructive", collaborationEfficiency: 95 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_003", memberName2: "Emma Thompson", qualityScore: 82, sentimentScore: 78, effectivenessRating: 85, avgResolutionSpeed: 4.2, highQualityInteractions: 28, lowQualityInteractions: 8, communicationTone: "neutral", collaborationEfficiency: 81 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_006", memberName2: "David Armstrong", qualityScore: 96, sentimentScore: 95, effectivenessRating: 98, avgResolutionSpeed: 1.8, highQualityInteractions: 34, lowQualityInteractions: 0, communicationTone: "constructive", collaborationEfficiency: 97 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_005", memberName2: "Priya Patel", qualityScore: 91, sentimentScore: 89, effectivenessRating: 93, avgResolutionSpeed: 2.6, highQualityInteractions: 22, lowQualityInteractions: 1, communicationTone: "constructive", collaborationEfficiency: 92 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_007", memberName2: "Lisa Wong", qualityScore: 93, sentimentScore: 91, effectivenessRating: 95, avgResolutionSpeed: 2.2, highQualityInteractions: 31, lowQualityInteractions: 1, communicationTone: "constructive", collaborationEfficiency: 94 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_008", memberName2: "Robert Taylor", qualityScore: 86, sentimentScore: 84, effectivenessRating: 88, avgResolutionSpeed: 3.5, highQualityInteractions: 36, lowQualityInteractions: 4, communicationTone: "professional", collaborationEfficiency: 87 },
  
  // James Chen partnerships
  { memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_003", memberName2: "Emma Thompson", qualityScore: 79, sentimentScore: 75, effectivenessRating: 82, avgResolutionSpeed: 5.1, highQualityInteractions: 24, lowQualityInteractions: 9, communicationTone: "neutral", collaborationEfficiency: 78 },
  { memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_006", memberName2: "David Armstrong", qualityScore: 95, sentimentScore: 93, effectivenessRating: 97, avgResolutionSpeed: 1.9, highQualityInteractions: 32, lowQualityInteractions: 0, communicationTone: "constructive", collaborationEfficiency: 96 },
  { memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_007", memberName2: "Lisa Wong", qualityScore: 97, sentimentScore: 96, effectivenessRating: 98, avgResolutionSpeed: 1.5, highQualityInteractions: 35, lowQualityInteractions: 0, communicationTone: "constructive", collaborationEfficiency: 98 },
  { memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_008", memberName2: "Robert Taylor", qualityScore: 84, sentimentScore: 82, effectivenessRating: 86, avgResolutionSpeed: 3.8, highQualityInteractions: 30, lowQualityInteractions: 5, communicationTone: "professional", collaborationEfficiency: 85 },
  
  // Michael Roberts partnerships (poor quality)
  { memberId1: "tm_004", memberName1: "Michael Roberts", memberId2: "tm_002", memberName2: "James Chen", qualityScore: 58, sentimentScore: 52, effectivenessRating: 61, avgResolutionSpeed: 8.4, highQualityInteractions: 8, lowQualityInteractions: 18, communicationTone: "tense", collaborationEfficiency: 54 },
  { memberId1: "tm_004", memberName1: "Michael Roberts", memberId2: "tm_003", memberName2: "Emma Thompson", qualityScore: 55, sentimentScore: 49, effectivenessRating: 58, avgResolutionSpeed: 9.2, highQualityInteractions: 6, lowQualityInteractions: 21, communicationTone: "tense", collaborationEfficiency: 51 },
  { memberId1: "tm_004", memberName1: "Michael Roberts", memberId2: "tm_005", memberName2: "Priya Patel", qualityScore: 54, sentimentScore: 48, effectivenessRating: 56, avgResolutionSpeed: 10.1, highQualityInteractions: 5, lowQualityInteractions: 15, communicationTone: "tense", collaborationEfficiency: 49 },
  
  // Priya Patel partnerships
  { memberId1: "tm_005", memberName1: "Priya Patel", memberId2: "tm_006", memberName2: "David Armstrong", qualityScore: 92, sentimentScore: 90, effectivenessRating: 94, avgResolutionSpeed: 2.3, highQualityInteractions: 26, lowQualityInteractions: 1, communicationTone: "constructive", collaborationEfficiency: 93 },
  { memberId1: "tm_005", memberName1: "Priya Patel", memberId2: "tm_008", memberName2: "Robert Taylor", qualityScore: 88, sentimentScore: 86, effectivenessRating: 90, avgResolutionSpeed: 3.1, highQualityInteractions: 21, lowQualityInteractions: 2, communicationTone: "professional", collaborationEfficiency: 89 },
  
  // David Armstrong partnerships
  { memberId1: "tm_006", memberName1: "David Armstrong", memberId2: "tm_007", memberName2: "Lisa Wong", qualityScore: 94, sentimentScore: 92, effectivenessRating: 96, avgResolutionSpeed: 2.0, highQualityInteractions: 14, lowQualityInteractions: 0, communicationTone: "constructive", collaborationEfficiency: 95 },
  { memberId1: "tm_006", memberName1: "David Armstrong", memberId2: "tm_008", memberName2: "Robert Taylor", qualityScore: 90, sentimentScore: 88, effectivenessRating: 92, avgResolutionSpeed: 2.8, highQualityInteractions: 38, lowQualityInteractions: 2, communicationTone: "professional", collaborationEfficiency: 91 },
  
  // Emma Thompson partnerships
  { memberId1: "tm_003", memberName1: "Emma Thompson", memberId2: "tm_007", memberName2: "Lisa Wong", qualityScore: 87, sentimentScore: 85, effectivenessRating: 89, avgResolutionSpeed: 3.4, highQualityInteractions: 19, lowQualityInteractions: 3, communicationTone: "professional", collaborationEfficiency: 86 },
  { memberId1: "tm_003", memberName1: "Emma Thompson", memberId2: "tm_008", memberName2: "Robert Taylor", qualityScore: 81, sentimentScore: 77, effectivenessRating: 83, avgResolutionSpeed: 4.5, highQualityInteractions: 27, lowQualityInteractions: 7, communicationTone: "neutral", collaborationEfficiency: 80 },
];

export const MOCK_SENTIMENT_ANALYSIS: SentimentAnalysis[] = [
  // Positive examples (Sarah + James)
  { id: "sent_001", interactionId: "int_sm_jc_001", memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_002", memberName2: "James Chen", interactionType: "meeting", sentimentType: "positive", positiveScore: 0.92, negativeScore: 0.02, neutralScore: 0.06, tone: "enthusiastic", keyPhrases: ["excellent progress", "perfect alignment", "innovative approach", "strong collaboration"], context: "Technical architecture review with complete agreement on cloud-native design", timestamp: "2026-03-04T14:30:00" },
  { id: "sent_002", interactionId: "int_sm_da_001", memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_006", memberName2: "David Armstrong", interactionType: "document_collab", sentimentType: "positive", positiveScore: 0.95, negativeScore: 0.01, neutralScore: 0.04, tone: "collaborative", keyPhrases: ["brilliant messaging", "crystal clear", "compelling narrative", "flawless execution"], context: "Executive summary collaboration with seamless integration of technical and strategic messaging", timestamp: "2026-03-04T11:15:00" },
  { id: "sent_003", interactionId: "int_jc_lw_001", memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_007", memberName2: "Lisa Wong", interactionType: "call", sentimentType: "positive", positiveScore: 0.96, negativeScore: 0.01, neutralScore: 0.03, tone: "professional", keyPhrases: ["NHS framework compliance", "clinical systems expertise", "perfect synergy", "outstanding solution"], context: "Healthcare security framework design with perfect alignment on clinical requirements", timestamp: "2026-03-03T13:30:00" },
  
  // Mixed/Neutral examples (Emma partnerships)
  { id: "sent_004", interactionId: "int_sm_et_001", memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_003", memberName2: "Emma Thompson", interactionType: "email", sentimentType: "neutral", positiveScore: 0.45, negativeScore: 0.25, neutralScore: 0.30, tone: "professional", keyPhrases: ["needs revision", "clarification required", "please review", "suggested changes"], context: "Proposal review with multiple revision requests and delayed response time", timestamp: "2026-03-02T16:20:00" },
  { id: "sent_005", interactionId: "int_jc_et_001", memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_003", memberName2: "Emma Thompson", interactionType: "meeting", sentimentType: "mixed", positiveScore: 0.52, negativeScore: 0.31, neutralScore: 0.17, tone: "frustrated", keyPhrases: ["technical accuracy concerns", "misunderstanding", "need alignment", "let's clarify"], context: "Technical section review with disagreement on architecture description accuracy", timestamp: "2026-03-01T10:45:00" },
  
  // Negative examples (Michael Roberts partnerships)
  { id: "sent_006", interactionId: "int_mr_jc_001", memberId1: "tm_004", memberName1: "Michael Roberts", memberId2: "tm_002", memberName2: "James Chen", interactionType: "meeting", sentimentType: "negative", positiveScore: 0.18, negativeScore: 0.68, neutralScore: 0.14, tone: "defensive", keyPhrases: ["not my understanding", "previously discussed", "conflicting priorities", "unclear direction"], context: "Project planning meeting with fundamental disagreements on technical approach and timeline", timestamp: "2026-02-28T14:00:00" },
  { id: "sent_007", interactionId: "int_mr_et_001", memberId1: "tm_004", memberName1: "Michael Roberts", memberId2: "tm_003", memberName2: "Emma Thompson", interactionType: "email", sentimentType: "negative", positiveScore: 0.15, negativeScore: 0.72, neutralScore: 0.13, tone: "frustrated", keyPhrases: ["missed deadline", "incomplete information", "need immediate response", "this is unacceptable"], context: "Escalation email regarding delayed bid document delivery and incomplete inputs", timestamp: "2026-02-27T17:30:00" },
  
  // Excellent examples (high-performing pairs)
  { id: "sent_008", interactionId: "int_da_rt_001", memberId1: "tm_006", memberName1: "David Armstrong", memberId2: "tm_008", memberName2: "Robert Taylor", interactionType: "meeting", sentimentType: "positive", positiveScore: 0.91, negativeScore: 0.02, neutralScore: 0.07, tone: "collaborative", keyPhrases: ["value proposition alignment", "commercial strength", "strategic pricing", "winning combination"], context: "Pricing strategy session with perfect integration of messaging and commercial approach", timestamp: "2026-03-05T10:00:00" },
  { id: "sent_009", interactionId: "int_sm_pp_001", memberId1: "tm_001", memberName1: "Sarah Mitchell", memberId2: "tm_005", memberName2: "Priya Patel", interactionType: "document_collab", sentimentType: "positive", positiveScore: 0.89, negativeScore: 0.03, neutralScore: 0.08, tone: "enthusiastic", keyPhrases: ["data-driven insights", "innovative analytics", "strong differentiation", "compelling evidence"], context: "IoT analytics proposal development with seamless technical-business alignment", timestamp: "2026-03-04T15:45:00" },
  { id: "sent_010", interactionId: "int_jc_da_001", memberId1: "tm_002", memberName1: "James Chen", memberId2: "tm_006", memberName2: "David Armstrong", interactionType: "call", sentimentType: "positive", positiveScore: 0.94, negativeScore: 0.01, neutralScore: 0.05, tone: "supportive", keyPhrases: ["technical excellence", "strategic messaging synergy", "unified vision", "perfect translation"], context: "Technical-to-messaging translation session converting complex architecture into compelling narrative", timestamp: "2026-03-03T11:20:00" },
];

export const MOCK_WEIGHTED_CHEMISTRY_SCORES: WeightedChemistryScore[] = [
  // Sarah Mitchell partnerships
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_002", memberName2: "James Chen", role2: "TL", frequencyBasedScore: 89, qualityWeightedScore: 95, scoreDelta: 6, qualityTier: "exceptional", improvementPotential: 5 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_003", memberName2: "Emma Thompson", role2: "BW", frequencyBasedScore: 85, qualityWeightedScore: 78, scoreDelta: -7, qualityTier: "medium", improvementPotential: 22 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_006", memberName2: "David Armstrong", role2: "BW", frequencyBasedScore: 91, qualityWeightedScore: 98, scoreDelta: 7, qualityTier: "exceptional", improvementPotential: 2 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_005", memberName2: "Priya Patel", role2: "TL", frequencyBasedScore: 88, qualityWeightedScore: 93, scoreDelta: 5, qualityTier: "exceptional", improvementPotential: 7 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_007", memberName2: "Lisa Wong", role2: "SME", frequencyBasedScore: 90, qualityWeightedScore: 96, scoreDelta: 6, qualityTier: "exceptional", improvementPotential: 4 },
  { memberId1: "tm_001", memberName1: "Sarah Mitchell", role1: "PM", memberId2: "tm_008", memberName2: "Robert Taylor", role2: "Pricing", frequencyBasedScore: 87, qualityWeightedScore: 84, scoreDelta: -3, qualityTier: "high", improvementPotential: 16 },
  
  // James Chen partnerships
  { memberId1: "tm_002", memberName1: "James Chen", role1: "TL", memberId2: "tm_003", memberName2: "Emma Thompson", role2: "BW", frequencyBasedScore: 85, qualityWeightedScore: 75, scoreDelta: -10, qualityTier: "medium", improvementPotential: 25 },
  { memberId1: "tm_002", memberName1: "James Chen", role1: "TL", memberId2: "tm_006", memberName2: "David Armstrong", role2: "BW", frequencyBasedScore: 91, qualityWeightedScore: 97, scoreDelta: 6, qualityTier: "exceptional", improvementPotential: 3 },
  { memberId1: "tm_002", memberName1: "James Chen", role1: "TL", memberId2: "tm_007", memberName2: "Lisa Wong", role2: "SME", frequencyBasedScore: 92, qualityWeightedScore: 99, scoreDelta: 7, qualityTier: "exceptional", improvementPotential: 1 },
  { memberId1: "tm_002", memberName1: "James Chen", role1: "TL", memberId2: "tm_008", memberName2: "Robert Taylor", role2: "Pricing", frequencyBasedScore: 87, qualityWeightedScore: 82, scoreDelta: -5, qualityTier: "high", improvementPotential: 18 },
  
  // Michael Roberts partnerships (poor quality causing major negative delta)
  { memberId1: "tm_004", memberName1: "Michael Roberts", role1: "PM", memberId2: "tm_002", memberName2: "James Chen", role2: "TL", frequencyBasedScore: 80, qualityWeightedScore: 52, scoreDelta: -28, qualityTier: "low", improvementPotential: 48 },
  { memberId1: "tm_004", memberName1: "Michael Roberts", role1: "PM", memberId2: "tm_003", memberName2: "Emma Thompson", role2: "BW", frequencyBasedScore: 78, qualityWeightedScore: 49, scoreDelta: -29, qualityTier: "low", improvementPotential: 51 },
  { memberId1: "tm_004", memberName1: "Michael Roberts", role1: "PM", memberId2: "tm_005", memberName2: "Priya Patel", role2: "TL", frequencyBasedScore: 78, qualityWeightedScore: 47, scoreDelta: -31, qualityTier: "low", improvementPotential: 53 },
  
  // Other partnerships
  { memberId1: "tm_005", memberName1: "Priya Patel", role1: "TL", memberId2: "tm_006", memberName2: "David Armstrong", role2: "BW", frequencyBasedScore: 87, qualityWeightedScore: 94, scoreDelta: 7, qualityTier: "exceptional", improvementPotential: 6 },
  { memberId1: "tm_005", memberName1: "Priya Patel", role1: "TL", memberId2: "tm_008", memberName2: "Robert Taylor", role2: "Pricing", frequencyBasedScore: 87, qualityWeightedScore: 87, scoreDelta: 0, qualityTier: "high", improvementPotential: 13 },
  { memberId1: "tm_006", memberName1: "David Armstrong", role1: "BW", memberId2: "tm_007", memberName2: "Lisa Wong", role2: "SME", frequencyBasedScore: 91, qualityWeightedScore: 96, scoreDelta: 5, qualityTier: "exceptional", improvementPotential: 4 },
  { memberId1: "tm_006", memberName1: "David Armstrong", role1: "BW", memberId2: "tm_008", memberName2: "Robert Taylor", role2: "Pricing", frequencyBasedScore: 89, qualityWeightedScore: 92, scoreDelta: 3, qualityTier: "exceptional", improvementPotential: 8 },
  { memberId1: "tm_003", memberName1: "Emma Thompson", role1: "BW", memberId2: "tm_007", memberName2: "Lisa Wong", role2: "SME", frequencyBasedScore: 90, qualityWeightedScore: 85, scoreDelta: -5, qualityTier: "high", improvementPotential: 15 },
  { memberId1: "tm_003", memberName1: "Emma Thompson", role1: "BW", memberId2: "tm_008", memberName2: "Robert Taylor", role2: "Pricing", frequencyBasedScore: 84, qualityWeightedScore: 77, scoreDelta: -7, qualityTier: "medium", improvementPotential: 23 },
];

export const MOCK_COACHING_RECOMMENDATIONS: CoachingRecommendation[] = [
  // Critical - Michael Roberts
  {
    id: "coach_001",
    targetMemberId: "tm_004",
    targetMemberName: "Michael Roberts",
    issueCategory: "communication",
    recommendation: "Develop active listening and conflict resolution skills to reduce defensive communication patterns",
    priority: "critical",
    expectedImpact: "Improve quality score from 56 to 75+ and reduce resolution speed from 9.2 days to <5 days",
    actionItems: [
      "Attend professional communication skills workshop (2-day intensive)",
      "Practice paraphrasing and confirmation techniques in all meetings",
      "Schedule weekly 1-on-1 coaching sessions with external facilitator",
      "Implement structured communication templates for project updates",
      "Record and self-review meeting participation for tone analysis",
    ],
    timeframe: "6-8 weeks intensive program",
    successMetrics: ["Quality score >70", "Sentiment score >65", "Zero tense interactions in 30 days", "Resolution speed <6 days"],
  },
  
  // High priority - Emma Thompson
  {
    id: "coach_002",
    targetMemberId: "tm_003",
    targetMemberName: "Emma Thompson",
    partnerMemberId: "tm_002",
    partnerMemberName: "James Chen",
    issueCategory: "collaboration_style",
    recommendation: "Improve technical comprehension and accuracy to reduce revision cycles with technical leads",
    priority: "high",
    expectedImpact: "Increase quality-weighted chemistry with James Chen from 75 to 88, reduce document iterations by 40%",
    actionItems: [
      "Shadow James Chen on 2 technical design sessions to understand cloud architecture fundamentals",
      "Complete online course: 'Technical Writing for Non-Technical Professionals'",
      "Request technical pre-review before formal submission (add 24h buffer)",
      "Create technical glossary for consistent terminology usage",
      "Schedule bi-weekly technical knowledge transfer sessions with TL team",
    ],
    timeframe: "8 weeks learning program",
    successMetrics: ["Quality score with TLs >85", "First-draft accuracy >80%", "Revision cycles <3 per proposal", "Sentiment score >80"],
  },
  {
    id: "coach_003",
    targetMemberId: "tm_003",
    targetMemberName: "Emma Thompson",
    partnerMemberId: "tm_008",
    partnerMemberName: "Robert Taylor",
    issueCategory: "resolution_speed",
    recommendation: "Improve responsiveness to pricing queries and commercial section reviews",
    priority: "high",
    expectedImpact: "Reduce resolution speed with Robert Taylor from 4.5 days to 2.5 days, improving quality-weighted chemistry from 77 to 86",
    actionItems: [
      "Set up email filters and priority alerts for pricing team communications",
      "Block dedicated time slots (9-10am daily) for commercial section review",
      "Implement same-day acknowledgment policy for all pricing requests",
      "Use collaborative editing for real-time review sessions vs sequential editing",
      "Create standardized pricing section templates to reduce iteration time",
    ],
    timeframe: "4 weeks implementation",
    successMetrics: ["Response time <4 hours", "Resolution speed <3 days", "Quality score >85", "High-quality interactions >85%"],
  },
  
  // Medium priority - Sarah Mitchell + Robert Taylor
  {
    id: "coach_004",
    targetMemberId: "tm_001",
    targetMemberName: "Sarah Mitchell",
    partnerMemberId: "tm_008",
    partnerMemberName: "Robert Taylor",
    issueCategory: "feedback_quality",
    recommendation: "Provide more structured and detailed feedback on pricing strategies to enhance commercial effectiveness",
    priority: "medium",
    expectedImpact: "Elevate quality-weighted chemistry from 84 to 92, improving win rate by 5-7%",
    actionItems: [
      "Adopt structured feedback framework: Context → Observation → Impact → Suggestion",
      "Schedule dedicated pricing strategy reviews (not just approval checkpoints)",
      "Share competitive intelligence insights earlier in pricing development",
      "Co-create pricing narrative that aligns commercial and delivery messaging",
      "Celebrate commercial wins and analyze pricing factors in post-bid reviews",
    ],
    timeframe: "6 weeks behavioral adjustment",
    successMetrics: ["Quality score >90", "Robert's effectiveness rating >92", "Sentiment score >88", "Zero neutral-tone interactions"],
  },
  
  // Medium priority - James Chen + Robert Taylor
  {
    id: "coach_005",
    targetMemberId: "tm_002",
    targetMemberName: "James Chen",
    partnerMemberId: "tm_008",
    partnerMemberName: "Robert Taylor",
    issueCategory: "collaboration_style",
    recommendation: "Bridge technical-commercial knowledge gap through collaborative pricing model development",
    priority: "medium",
    expectedImpact: "Improve quality-weighted chemistry from 82 to 90, enabling data-driven pricing differentiation",
    actionItems: [
      "Co-develop technical cost models that directly inform commercial pricing",
      "Create visual dashboards linking technical architecture to cost drivers",
      "Participate in joint client workshops demonstrating tech-commercial synergy",
      "Build reusable technical ROI calculators for pricing team",
      "Schedule monthly 'tech-to-commercial' translation sessions",
    ],
    timeframe: "8 weeks collaborative development",
    successMetrics: ["Quality score >88", "Joint deliverables >5 per project", "Sentiment score >86", "Collaboration efficiency >90"],
  },
  
  // Low priority - optimization opportunities
  {
    id: "coach_006",
    targetMemberId: "tm_006",
    targetMemberName: "David Armstrong",
    partnerMemberId: "tm_002",
    partnerMemberName: "James Chen",
    issueCategory: "communication",
    recommendation: "Document and codify the James-David technical translation methodology for team-wide replication",
    priority: "low",
    expectedImpact: "Scale exceptional quality (97) across other BW-TL pairings, creating organizational capability",
    actionItems: [
      "Record and transcribe 3 technical translation sessions",
      "Extract reusable frameworks and questioning techniques",
      "Create 'Technical Translation Playbook' training materials",
      "Deliver 2-hour workshop for Emma Thompson and other bid writers",
      "Establish peer review process for technical messaging accuracy",
    ],
    timeframe: "4 weeks knowledge capture",
    successMetrics: ["Playbook completion", "2 workshop deliveries", "Emma's technical accuracy >80%", "Team quality baseline +8%"],
  },
  {
    id: "coach_007",
    targetMemberId: "tm_001",
    targetMemberName: "Sarah Mitchell",
    partnerMemberId: "tm_006",
    partnerMemberName: "David Armstrong",
    issueCategory: "communication",
    recommendation: "Maintain and protect the exceptional Sarah-David partnership through workload management",
    priority: "low",
    expectedImpact: "Sustain exceptional quality-weighted chemistry (98) and prevent burnout from over-allocation",
    actionItems: [
      "Cap Sarah-David joint projects at 2 concurrent bids maximum",
      "Ensure 48-hour buffer between major deliverables",
      "Schedule monthly partnership health check-ins",
      "Protect their collaboration time from other meeting conflicts",
      "Recognize and celebrate their exceptional performance publicly",
    ],
    timeframe: "Ongoing resource management",
    successMetrics: ["Quality score sustained >95", "Zero burnout indicators", "Concurrent workload <3 bids", "Partnership satisfaction >9/10"],
  },
];

export const MOCK_QUALITY_INDICATORS: QualityIndicator[] = [
  // Meeting effectiveness
  { category: "meeting_effectiveness", metric: "Average meeting duration adherence", score: 87, benchmark: 80, status: "exceeds", trend: "improving" },
  { category: "meeting_effectiveness", metric: "Action item completion rate", score: 92, benchmark: 85, status: "exceeds", trend: "stable" },
  { category: "meeting_effectiveness", metric: "Decision clarity score", score: 88, benchmark: 80, status: "exceeds", trend: "improving" },
  { category: "meeting_effectiveness", metric: "Participant engagement level", score: 84, benchmark: 75, status: "exceeds", trend: "stable" },
  
  // Email quality
  { category: "email_quality", metric: "Response time to critical emails", score: 78, benchmark: 80, status: "below", trend: "declining" },
  { category: "email_quality", metric: "Email clarity and completeness", score: 85, benchmark: 80, status: "exceeds", trend: "stable" },
  { category: "email_quality", metric: "Tone professionalism score", score: 91, benchmark: 85, status: "exceeds", trend: "improving" },
  { category: "email_quality", metric: "Attachment accuracy rate", score: 96, benchmark: 95, status: "meets", trend: "stable" },
  
  // Document collaboration
  { category: "document_collaboration", metric: "Concurrent editing efficiency", score: 89, benchmark: 80, status: "exceeds", trend: "improving" },
  { category: "document_collaboration", metric: "Version control compliance", score: 94, benchmark: 90, status: "exceeds", trend: "stable" },
  { category: "document_collaboration", metric: "Comment resolution speed", score: 76, benchmark: 80, status: "below", trend: "stable" },
  { category: "document_collaboration", metric: "Feedback specificity score", score: 82, benchmark: 80, status: "meets", trend: "improving" },
  
  // Responsiveness
  { category: "responsiveness", metric: "Same-day response rate", score: 72, benchmark: 80, status: "below", trend: "declining" },
  { category: "responsiveness", metric: "Acknowledgment timeliness", score: 88, benchmark: 85, status: "exceeds", trend: "stable" },
  { category: "responsiveness", metric: "Availability during critical periods", score: 91, benchmark: 85, status: "exceeds", trend: "stable" },
  { category: "responsiveness", metric: "Escalation appropriateness", score: 86, benchmark: 80, status: "exceeds", trend: "improving" },
  
  // Problem solving
  { category: "problem_solving", metric: "Issue resolution speed", score: 81, benchmark: 80, status: "meets", trend: "stable" },
  { category: "problem_solving", metric: "Root cause analysis depth", score: 87, benchmark: 80, status: "exceeds", trend: "improving" },
  { category: "problem_solving", metric: "Solution creativity score", score: 90, benchmark: 85, status: "exceeds", trend: "improving" },
  { category: "problem_solving", metric: "Preventive measure implementation", score: 79, benchmark: 80, status: "below", trend: "declining" },
];

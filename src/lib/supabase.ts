import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ─── Typed DB helpers ────────────────────────────────────────────────────────

export type Tables = {
  bids: {
    id: string;
    user_id: string;
    title: string;
    authority: string;
    deadline: string;
    win_probability: number;
    compliance_score: number;
    status: "active" | "submitted" | "won" | "lost";
    value: number;
    created_at: string;
    updated_at: string;
  };
  competitors: {
    id: string;
    user_id: string;
    name: string;
    size: "SME" | "Large" | "Major";
    specialty: string[];
    total_bids: number;
    wins: number;
    losses: number;
    win_rate: number;
    average_bid_value: number;
    market_share: number;
    created_at: string;
  };
  team_members: {
    id: string;
    user_id: string;
    name: string;
    role: "Project Manager" | "Technical Lead" | "Bid Writer" | "Subject Matter Expert" | "Pricing Specialist";
    expertise: string[];
    total_bids: number;
    wins: number;
    losses: number;
    win_rate: number;
    avg_score_contribution: number;
    years_experience: number;
    created_at: string;
  };
  documents: {
    id: string;
    user_id: string;
    name: string;
    status: "processing" | "completed" | "failed";
    size: string;
    file_url: string | null;
    ppn0620_compliance: boolean | null;
    key_requirements: string[];
    deadlines: string[];
    created_at: string;
  };
  invoices: {
    id: string;
    user_id: string;
    invoice_date: string;
    amount: number;
    status: "paid" | "pending" | "failed";
    download_url: string | null;
    created_at: string;
  };
  head_to_head_competitions: {
    id: string;
    user_id: string;
    contract_title: string;
    authority: string;
    sector: string | null;
    competitor_id: string | null;
    competitor_name: string;
    contract_value: number;
    bid_date: string | null;
    outcome: "won" | "lost" | null;
    your_score: number;
    competitor_score: number;
    tactics_used: string[];
    winning_factors: string[];
    losing_factors: string[];
    created_at: string;
  };
  team_collaborations: {
    id: string;
    user_id: string;
    member_id1: string;
    member_name1: string;
    role1: string;
    member_id2: string;
    member_name2: string;
    role2: string;
    collaborations: number;
    wins: number;
    losses: number;
    win_rate: number;
    avg_combined_score: number;
    chemistry: "excellent" | "good" | "neutral" | "poor" | null;
    created_at: string;
  };
  active_bid_tracking: {
    id: string;
    user_id: string;
    bid_id: string | null;
    bid_title: string;
    authority: string;
    deadline: string | null;
    days_remaining: number | null;
    current_team: Record<string, unknown>;
    optimal_team: Record<string, unknown>;
    configuration_match: number;
    current_chemistry: number;
    predicted_chemistry: number;
    competitor_id: string | null;
    competitor_name: string | null;
    created_at: string;
    updated_at: string;
  };
  team_interactions: {
    id: string;
    user_id: string;
    bid_id: string | null;
    member1_id: string;
    member1_name: string;
    member2_id: string;
    member2_name: string;
    interaction_type: "email" | "meeting" | "document_collab" | "slack" | "call";
    duration: number | null;
    intensity: "low" | "medium" | "high";
    topic: string | null;
    created_at: string;
  };
  communication_metrics: {
    id: string;
    user_id: string;
    bid_id: string | null;
    member_id: string;
    member_name: string;
    emails_sent: number;
    emails_received: number;
    meeting_hours: number;
    document_edits: number;
    slack_messages: number;
    call_minutes: number;
    total_interactions: number;
    last_active: string;
    created_at: string;
    updated_at: string;
  };
  chemistry_updates: {
    id: string;
    user_id: string;
    bid_id: string | null;
    member1_id: string;
    member1_name: string;
    member2_id: string;
    member2_name: string;
    previous_chemistry: number;
    current_chemistry: number;
    change_reason: string | null;
    impact: "positive" | "negative" | "neutral";
    created_at: string;
  };
  deviation_alerts: {
    id: string;
    user_id: string;
    bid_id: string | null;
    alert_type: "team_mismatch" | "chemistry_drop" | "low_interaction" | "suboptimal_pairing";
    severity: "critical" | "high" | "medium" | "low";
    title: string;
    description: string | null;
    current_value: string | null;
    expected_value: string | null;
    recommendation: string | null;
    acknowledged: boolean;
    created_at: string;
  };
  emerging_partnerships: {
    id: string;
    user_id: string;
    bid_id: string | null;
    member1_id: string;
    member1_name: string;
    role1: string | null;
    member2_id: string;
    member2_name: string;
    role2: string | null;
    interaction_count: number;
    emerging_chemistry: number;
    collaboration_pattern: string | null;
    confidence: number;
    detected_at: string;
    created_at: string;
  };
  live_activities: {
    id: string;
    user_id: string;
    bid_id: string | null;
    activity_type: "interaction" | "chemistry_change" | "deviation" | "milestone";
    description: string;
    participants: string[];
    impact: "positive" | "negative" | "neutral";
    created_at: string;
  };
  collaboration_timeline_events: {
    id: string;
    user_id: string;
    event_date: string;
    event_type: "team_formation" | "chemistry_change" | "project_win" | "project_loss" | "role_change" | "new_hire" | "achievement";
    title: string;
    description: string | null;
    participants: string[];
    impact: "positive" | "negative" | "neutral";
    chemistry_score: number | null;
    related_project_id: string | null;
    created_at: string;
  };
  critical_moments: {
    id: string;
    user_id: string;
    moment_date: string;
    moment_type: "new_hire" | "role_change" | "major_win" | "major_loss" | "team_restructure" | "partnership_formed";
    title: string;
    description: string | null;
    team_members_affected: string[];
    impact: "high" | "medium" | "low";
    before_win_rate: number | null;
    before_chemistry: number | null;
    after_win_rate: number | null;
    after_chemistry: number | null;
    consequences: string[];
    created_at: string;
  };
};

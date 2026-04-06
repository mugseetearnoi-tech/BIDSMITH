import { useEffect, useState, useCallback } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase, Tables } from "@/lib/supabase";

// ─── Generic fetch hook ───────────────────────────────────────────────────────
function useSupabaseTable<T extends keyof Tables>(
  table: T,
  options?: { filter?: { column: string; value: string } }
) {
  const [data, setData] = useState<Tables[T][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select("*").order("created_at", { ascending: false });

    if (options?.filter) {
      query = query.eq(options.filter.column, options.filter.value) as typeof query;
    }

    const { data: rows, error: err } = await query;
    if (err) setError(err.message);
    else setData((rows ?? []) as Tables[T][]);
    setLoading(false);
  }, [table, options?.filter?.value]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ─── Bids ─────────────────────────────────────────────────────────────────────
export function useBids() {
  const { data, loading, error, refetch } = useSupabaseTable("bids");

  const addBid = async (bid: Omit<Tables["bids"], "id" | "user_id" | "created_at" | "updated_at">) => {
    const { error } = await supabase.from("bids").insert([bid]);
    if (!error) refetch();
    return error;
  };

  const updateBid = async (id: string, updates: Partial<Tables["bids"]>) => {
    const { error } = await supabase.from("bids").update(updates).eq("id", id);
    if (!error) refetch();
    return error;
  };

  const deleteBid = async (id: string) => {
    const { error } = await supabase.from("bids").delete().eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { bids: data, loading, error, addBid, updateBid, deleteBid, refetch };
}

// ─── Competitors ──────────────────────────────────────────────────────────────
export function useCompetitors() {
  const { data, loading, error, refetch } = useSupabaseTable("competitors");

  const addCompetitor = async (comp: Omit<Tables["competitors"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("competitors").insert([comp]);
    if (!error) refetch();
    return error;
  };

  const updateCompetitor = async (id: string, updates: Partial<Tables["competitors"]>) => {
    const { error } = await supabase.from("competitors").update(updates).eq("id", id);
    if (!error) refetch();
    return error;
  };

  const deleteCompetitor = async (id: string) => {
    const { error } = await supabase.from("competitors").delete().eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { competitors: data, loading, error, addCompetitor, updateCompetitor, deleteCompetitor, refetch };
}

// ─── Team Members ─────────────────────────────────────────────────────────────
export function useTeamMembers() {
  const { data, loading, error, refetch } = useSupabaseTable("team_members");

  const addMember = async (member: Omit<Tables["team_members"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("team_members").insert([member]);
    if (!error) refetch();
    return error;
  };

  const updateMember = async (id: string, updates: Partial<Tables["team_members"]>) => {
    const { error } = await supabase.from("team_members").update(updates).eq("id", id);
    if (!error) refetch();
    return error;
  };

  const deleteMember = async (id: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { members: data, loading, error, addMember, updateMember, deleteMember, refetch };
}

// ─── Documents ────────────────────────────────────────────────────────────────
export function useDocuments() {
  const { data, loading, error, refetch } = useSupabaseTable("documents");

  const addDocument = async (doc: Omit<Tables["documents"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("documents").insert([doc]);
    if (!error) refetch();
    return error;
  };

  const updateDocument = async (id: string, updates: Partial<Tables["documents"]>) => {
    const { error } = await supabase.from("documents").update(updates).eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { documents: data, loading, error, addDocument, updateDocument, refetch };
}

// ─── Invoices ─────────────────────────────────────────────────────────────────
export function useInvoices() {
  const { data, loading, error, refetch } = useSupabaseTable("invoices");
  return { invoices: data, loading, error, refetch };
}

// ─── Head to Head Competitions ────────────────────────────────────────────────
export function useHeadToHead() {
  const { data, loading, error, refetch } = useSupabaseTable("head_to_head_competitions");

  const addCompetition = async (comp: Omit<Tables["head_to_head_competitions"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("head_to_head_competitions").insert([comp]);
    if (!error) refetch();
    return error;
  };

  return { competitions: data, loading, error, addCompetition, refetch };
}

// ─── Team Collaborations ──────────────────────────────────────────────────────
export function useTeamCollaborations() {
  const { data, loading, error, refetch } = useSupabaseTable("team_collaborations");

  const addCollaboration = async (collab: Omit<Tables["team_collaborations"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("team_collaborations").insert([collab]);
    if (!error) refetch();
    return error;
  };

  const updateCollaboration = async (id: string, updates: Partial<Tables["team_collaborations"]>) => {
    const { error } = await supabase.from("team_collaborations").update(updates).eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { collaborations: data, loading, error, addCollaboration, updateCollaboration, refetch };
}

// ─── Active Bid Tracking ──────────────────────────────────────────────────────
export function useActiveBidTracking() {
  const { data, loading, error, refetch } = useSupabaseTable("active_bid_tracking");

  const addTracking = async (tracking: Omit<Tables["active_bid_tracking"], "id" | "user_id" | "created_at" | "updated_at">) => {
    const { error } = await supabase.from("active_bid_tracking").insert([tracking]);
    if (!error) refetch();
    return error;
  };

  const updateTracking = async (id: string, updates: Partial<Tables["active_bid_tracking"]>) => {
    const { error } = await supabase.from("active_bid_tracking").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
    if (!error) refetch();
    return error;
  };

  return { trackings: data, loading, error, addTracking, updateTracking, refetch };
}

// ─── Team Interactions (with polling for real-time feel) ──────────────────────
export function useTeamInteractions(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("team_interactions", options);

  // Poll every 30 seconds for new interactions
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const logInteraction = async (interaction: Omit<Tables["team_interactions"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("team_interactions").insert([interaction]);
    if (!error) refetch();
    return error;
  };

  return { interactions: data, loading, error, logInteraction, refetch };
}

// ─── Chemistry Updates ────────────────────────────────────────────────────────
export function useChemistryUpdates(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("chemistry_updates", options);

  const logChemistryUpdate = async (update: Omit<Tables["chemistry_updates"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("chemistry_updates").insert([update]);
    if (!error) refetch();
    return error;
  };

  return { chemistryUpdates: data, loading, error, logChemistryUpdate, refetch };
}

// ─── Deviation Alerts ─────────────────────────────────────────────────────────
export function useDeviationAlerts(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("deviation_alerts", options);

  // Poll every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const acknowledgeAlert = async (id: string) => {
    const { error } = await supabase.from("deviation_alerts").update({ acknowledged: true }).eq("id", id);
    if (!error) refetch();
    return error;
  };

  const addAlert = async (alert: Omit<Tables["deviation_alerts"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("deviation_alerts").insert([alert]);
    if (!error) refetch();
    return error;
  };

  return { alerts: data, loading, error, acknowledgeAlert, addAlert, refetch };
}

// ─── Emerging Partnerships ────────────────────────────────────────────────────
export function useEmergingPartnerships(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("emerging_partnerships", options);

  return { partnerships: data, loading, error, refetch };
}

// ─── Live Activities (with polling) ──────────────────────────────────────────
export function useLiveActivities(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("live_activities", options);

  // Poll every 15 seconds for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, [refetch]);

  const logActivity = async (activity: Omit<Tables["live_activities"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("live_activities").insert([activity]);
    if (!error) refetch();
    return error;
  };

  return { activities: data, loading, error, logActivity, refetch };
}

// ─── Communication Metrics ────────────────────────────────────────────────────
export function useCommunicationMetrics(bidId?: string) {
  const options = bidId ? { filter: { column: "bid_id", value: bidId } } : undefined;
  const { data, loading, error, refetch } = useSupabaseTable("communication_metrics", options);

  const upsertMetrics = async (metrics: Omit<Tables["communication_metrics"], "id" | "user_id" | "created_at" | "updated_at">) => {
    const { error } = await supabase.from("communication_metrics").upsert([metrics]);
    if (!error) refetch();
    return error;
  };

  return { metrics: data, loading, error, upsertMetrics, refetch };
}

// ─── Collaboration Timeline ───────────────────────────────────────────────────
export function useCollaborationTimeline() {
  const { data, loading, error, refetch } = useSupabaseTable("collaboration_timeline_events");

  const addEvent = async (event: Omit<Tables["collaboration_timeline_events"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("collaboration_timeline_events").insert([event]);
    if (!error) refetch();
    return error;
  };

  return { events: data, loading, error, addEvent, refetch };
}

// ─── Critical Moments ─────────────────────────────────────────────────────────
export function useCriticalMoments() {
  const { data, loading, error, refetch } = useSupabaseTable("critical_moments");

  const addMoment = async (moment: Omit<Tables["critical_moments"], "id" | "user_id" | "created_at">) => {
    const { error } = await supabase.from("critical_moments").insert([moment]);
    if (!error) refetch();
    return error;
  };

  return { moments: data, loading, error, addMoment, refetch };
}

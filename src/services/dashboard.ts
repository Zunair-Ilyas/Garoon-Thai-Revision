import { supabase } from "../lib/supabase";

export type Subscription = { id: string; email: string; created_at: string };
export type Message = { id: string; name: string; email: string; subject: string | null; message: string; created_at: string };
export type ContactSettings = { id: number; phone: string | null; email: string | null; address: string | null; updated_at?: string };
export type Restaurant = { id: string; name: string; address: string | null; description: string | null; created_at?: string; updated_at?: string };

export const dashboardApi = {
  async getSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async addSubscription(email: string): Promise<Subscription> {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert({ email })
      .select("id, email, created_at")
      .single();
    if (error) throw error;
    return data as Subscription;
  },

  async getMessages(): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("id, name, email, subject, message, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async addMessage(payload: { name: string; email: string; subject?: string | null; message: string }): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert({ name: payload.name, email: payload.email, subject: payload.subject ?? null, message: payload.message })
      .select("id, name, email, subject, message, created_at")
      .single();
    if (error) throw error;
    return data as Message;
  },

  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async getContact(): Promise<ContactSettings> {
    const { data, error } = await supabase
      .from("contact_settings")
      .select("id, phone, email, address, updated_at")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const defaults = { id: 1, phone: "+64 7 574 8500", email: "info@garoonthai.nz", address: "277 Mount Maunganui Rd, Tauranga 3116" };
      const { data: inserted, error: insErr } = await supabase
        .from("contact_settings")
        .insert(defaults)
        .select()
        .single();
      if (insErr) throw insErr;
      return inserted as ContactSettings;
    }
    return data as ContactSettings;
  },

  async updateContact(payload: Omit<ContactSettings, "id">): Promise<ContactSettings> {
    const { data, error } = await supabase
      .from("contact_settings")
      .update({ phone: payload.phone, email: payload.email, address: payload.address })
      .eq("id", 1)
      .select()
      .single();
    if (error) throw error;
    return data as ContactSettings;
  },

  async getRestaurants(): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from("restaurants")
      .select("id, name, address, description, created_at, updated_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async updateRestaurant(updated: Restaurant): Promise<Restaurant> {
    const { data, error } = await supabase
      .from("restaurants")
      .update({ name: updated.name, address: updated.address, description: updated.description })
      .eq("id", updated.id)
      .select()
      .single();
    if (error) throw error;
    return data as Restaurant;
  },

  async ensureSeedRestaurants(): Promise<Restaurant[]> {
    // Ensure we have two default restaurants in the DB
    const defaults = [
      { name: "Easy Go Thai", address: "Mount Maunganui", description: "Authentic Thai street food." },
      { name: "Asian Fusion", address: "Bethlehem", description: "Modern fusion cuisine." },
    ];
    const existing = await this.getRestaurants();
    const missing = defaults.filter(d => !existing.some(e => e.name.toLowerCase() === d.name.toLowerCase()));
    if (missing.length > 0) {
      const { error } = await supabase.from("restaurants").insert(missing);
      if (error) throw error;
    }
    return this.getRestaurants();
  },
};

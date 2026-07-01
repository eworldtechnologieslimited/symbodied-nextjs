"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { rsvpConfirmationHtml } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function rsvpForEvent(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("event_rsvps")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("event_rsvps").delete().eq("id", existing.id);
    const { data: ev } = await supabase.from("events").select("rsvps").eq("id", eventId).single();
    const current = (ev as { rsvps: number } | null)?.rsvps ?? 0;
    await supabase.from("events").update({ rsvps: Math.max(0, current - 1) }).eq("id", eventId);
  } else {
    const { error } = await supabase
      .from("event_rsvps")
      .insert({ event_id: eventId, user_id: user.id });
    if (error) return { error: error.message };

    const { data: ev } = await supabase
      .from("events")
      .select("rsvps, name, date, venue, location")
      .eq("id", eventId)
      .single();

    const current = (ev as { rsvps: number } | null)?.rsvps ?? 0;
    await supabase.from("events").update({ rsvps: current + 1 }).eq("id", eventId);

    if (user.email && ev) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://symbodied.com";
      const event = ev as { name: string; date: string; venue: string | null; location: string | null };
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "Symbodied <newsletter@symbodied.com>",
        to: user.email,
        subject: `You're going to ${event.name}`,
        html: rsvpConfirmationHtml({
          userName: user.email,
          eventName: event.name,
          eventDate: event.date,
          eventVenue: event.venue,
          eventLocation: event.location,
          eventsUrl: `${appUrl}/events`,
        }),
      }).catch(() => {});
    }
  }

  revalidatePath("/events");
  revalidatePath("/dashboard/events");
  return { success: true };
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const name = (formData.get("name") as string)?.trim();
  const theme = (formData.get("theme") as string)?.trim() || null;
  const date = (formData.get("date") as string)?.trim();
  const venue = (formData.get("venue") as string)?.trim() || null;
  const location = (formData.get("location") as string)?.trim() || null;
  const description = (formData.get("description") as string)?.trim() || null;
  const image_url = (formData.get("image_url") as string)?.trim() || null;
  const slots = parseInt(formData.get("slots") as string, 10) || 100;

  if (!name || !date) return { error: "Name and date are required." };

  const { error } = await supabase.from("events").insert({
    user_id: user.id,
    name, theme, date, venue, location, description, image_url, slots,
    status: "active",
  });

  if (error) return { error: error.message };

  revalidatePath("/events");
  revalidatePath("/studio/events");
  return { success: true };
}

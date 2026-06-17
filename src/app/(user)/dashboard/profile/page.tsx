"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Profile updated.");
  };

  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">My Profile</h2>

      <Card padding="lg" className="flex items-center gap-6 flex-wrap">
        <Avatar name="Ada Obi" size="xl" ring />
        <div>
          <div className="font-bold text-ink font-sans text-lg">Ada Obi</div>
          <div className="text-ink-500 text-sm font-sans">ada.obi@example.com</div>
          <Badge tone="brand" size="sm" className="mt-2">Member</Badge>
        </div>
        <Button variant="secondary" size="sm" className="ml-auto">Change Photo</Button>
      </Card>

      <Card padding="lg">
        <h3 className="font-sans font-bold text-base text-ink mb-5">Personal Information</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First name" defaultValue="Ada" leadingIcon={<User size={16} />} />
            <Input label="Last name" defaultValue="Obi" />
          </div>
          <Input label="Email address" type="email" defaultValue="ada.obi@example.com" leadingIcon={<Mail size={16} />} />
          <Input label="Phone number" type="tel" placeholder="+234 800 000 0000" leadingIcon={<Phone size={16} />} />
          <Input label="City / Location" placeholder="Lagos, Nigeria" leadingIcon={<MapPin size={16} />} />
          <div className="pt-2">
            <Button type="submit" variant="primary" loading={saving}>Save Changes</Button>
          </div>
        </form>
      </Card>

      <Card padding="lg">
        <h3 className="font-sans font-bold text-base text-ink mb-5">Change Password</h3>
        <div className="flex flex-col gap-4 max-w-lg">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input label="New password" type="password" placeholder="Min. 8 characters" />
          <Input label="Confirm new password" type="password" placeholder="Repeat new password" />
          <div className="pt-2"><Button variant="secondary">Update Password</Button></div>
        </div>
      </Card>
    </div>
  );
}

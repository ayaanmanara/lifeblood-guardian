import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RequestForm = () => {
  const [requesterName, setRequesterName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [unitsRequired, setUnitsRequired] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("requests").insert({
        user_id: user.id,
        requester_name: requesterName,
        blood_group: bloodGroup,
        units_required: parseInt(unitsRequired),
        status: "Pending",
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Blood request submitted successfully.",
      });

      setRequesterName("");
      setBloodGroup("");
      setUnitsRequired("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Blood</CardTitle>
        <CardDescription>Submit a new blood request</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="requester-name">Requester Name</Label>
            <Input
              id="requester-name"
              placeholder="Patient or Hospital Name"
              value={requesterName}
              onChange={(e) => setRequesterName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blood-group-request">Blood Group Needed</Label>
            <Select value={bloodGroup} onValueChange={setBloodGroup} required>
              <SelectTrigger id="blood-group-request">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="units">Units Required</Label>
            <Input
              id="units"
              type="number"
              placeholder="1"
              min="1"
              max="10"
              value={unitsRequired}
              onChange={(e) => setUnitsRequired(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;

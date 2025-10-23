import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodInventory = () => {
  const [inventory, setInventory] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase.from("donors").select("blood_group");

      if (error) throw error;

      const counts: Record<string, number> = {};
      BLOOD_GROUPS.forEach((group) => {
        counts[group] = 0;
      });

      data?.forEach((donor) => {
        counts[donor.blood_group] = (counts[donor.blood_group] || 0) + 1;
      });

      setInventory(counts);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blood Inventory</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {BLOOD_GROUPS.map((group) => (
          <Card key={group} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Droplet className="h-5 w-5 text-primary" />
                {group}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center text-primary">
                {inventory[group] || 0}
              </p>
              <p className="text-xs text-center text-muted-foreground mt-1">donors</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BloodInventory;

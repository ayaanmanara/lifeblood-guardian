import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Droplet, LogOut } from "lucide-react";
import DonorForm from "@/components/DonorForm";
import DonorList from "@/components/DonorList";
import RequestForm from "@/components/RequestForm";
import RequestList from "@/components/RequestList";
import BloodInventory from "@/components/BloodInventory";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Droplet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Blood Bank Management</h1>
              <p className="text-sm text-muted-foreground">Save lives, donate blood</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BloodInventory />

        <Tabs defaultValue="donors" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="add-donor">Add Donor</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="request-blood">Request Blood</TabsTrigger>
          </TabsList>

          <TabsContent value="donors" className="mt-6">
            <DonorList />
          </TabsContent>

          <TabsContent value="add-donor" className="mt-6">
            <DonorForm />
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <RequestList />
          </TabsContent>

          <TabsContent value="request-blood" className="mt-6">
            <RequestForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

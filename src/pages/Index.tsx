import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Users, Heart, Activity } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Droplet className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Blood Bank Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Save lives by connecting blood donors with those in need. Join our community of heroes today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Donor Management</h3>
            <p className="text-muted-foreground">
              Register and manage blood donors with comprehensive tracking of blood types and availability.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Blood Requests</h3>
            <p className="text-muted-foreground">
              Submit and track blood requests efficiently to ensure timely delivery to those in need.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Inventory</h3>
            <p className="text-muted-foreground">
              Monitor blood inventory levels in real-time across all blood types for better resource management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

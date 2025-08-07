import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  // No login required, anyone can access
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Panel
          </CardTitle>
          <CardDescription>
            This admin panel is now open to everyone. No login required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-lg font-semibold">Welcome! You now have direct access to the admin features.</p>
            <Button className="mt-6" type="button" onClick={() => navigate("/admindashboard")}>Go to Admin Page</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
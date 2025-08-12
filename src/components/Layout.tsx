import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu, LogOut } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import srkrLogo from "@/assets/srkrec-logo.png";
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import app from '../firebaseConfig';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}


export function Layout({ children }: LayoutProps) {
  const auth = getAuth(app);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);
  const handleLogout = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };
  const location = useLocation();

  // Don't show sidebar on auth page
  if (location.pathname === "/auth") {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with trigger - Sticky */}
          <header className="sticky top-0 z-50 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            
            <div className="flex-1 flex items-center justify-between ml-4 lg:ml-0">
              <div className="flex items-center gap-4">
                <img 
                  src={srkrLogo} 
                  alt="SRKR Engineering College" 
                  className="h-10 w-auto"
                />
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm font-medium">{user.displayName || user.email}</span>
                    <Button size="sm" variant="outline" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-1" /> Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/firebase-login">
                    <Button size="sm" variant="outline">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
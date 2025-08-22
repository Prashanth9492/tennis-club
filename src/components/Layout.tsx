import { LogOut, Sun, Moon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import srkrLogo from "@/assets/srkrec-logo.png";
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import app from '../firebaseConfig';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Teams", path: "/teams" },
  { name: "Live Scores", path: "/live-scores" },
  { name: "Players", path: "/players" },
  { name: "Fixtures", path: "/fixtures" },
  { name: "Points-table", path: "/points-table" },
  { name: "Gallery", path: "/gallery" },
  { name: "News", path: "/news" },
  //{ name: "Statistics", path: "/stats" },
  
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, setTheme] as const;
}

interface LayoutProps {
  children: React.ReactNode;
}



export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [theme, setTheme] = useTheme();

  if (location.pathname === "/auth") {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <div className={`min-h-screen w-full bg-background ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full">
          <div className="flex items-center">
            <img src={srkrLogo} alt="SRKR Engineering College" className="h-10 w-auto" />
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          {/* Nav links below logo */}
          <div className="w-full mt-2 md:mt-0 flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 md:gap-4 whitespace-nowrap">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${location.pathname === link.path ? 'bg-primary text-white dark:bg-gray-700' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
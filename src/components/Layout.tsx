import { LogOut, Sun, Moon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bhimavaramLogo from "@/assets/logo1.png";
import { useEffect, useState } from 'react';
import { usePageLoading } from "@/hooks/usePageLoading";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  // { name: "Tournaments", path: "/tournaments" },
  { name: "Live Matches", path: "/live-scores" },
  { name: "Players", path: "/players" },
  { name: "Match Schedule", path: "/fixtures" },
  { name: "Rankings", path: "/rankings" },
  { name: "Highlights", path: "/highlights" },
  { name: "Gallery", path: "/gallery" },
  // { name: "News", path: "/news" },
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
  
  // Initialize page loading animation
  usePageLoading();

  if (location.pathname === "/auth" || location.pathname.startsWith("/admin")) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <div className={`min-h-screen w-full bg-background ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        {/* First row: Logo and theme toggle */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={bhimavaramLogo} alt="Bhimavaram Open Tennis Tournament" className="h-20 w-auto" />
          </div>
          {/* Theme toggle button - positioned at the right corner */}
          <div className="flex items-center">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button> */}
          </div>
        </div>
        {/* Second row: Navigation links - centered on desktop */}
        <div className="pb-3 md:pb-0 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-4 whitespace-nowrap md:justify-center">
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
      </nav>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";

function App() {
  const [mounted, setMounted] = useState(false);
  
  // After mounting, set theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setMounted(true);
  }, []);

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;

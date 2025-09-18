import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { FloatingSmiley } from "@/components/FloatingSmiley";

// Pages
import Splash from "./pages/Splash";
import Today from "./pages/Today";
import Products from "./pages/Products";
import RoutineForYou from "./pages/RoutineForYou";
import NewScan from "./pages/NewScan";
import Insights from "./pages/Insights";
import Me from "./pages/Me";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check if user has visited before
  const hasVisited = localStorage.getItem('visited');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background pb-16 relative">
            <Routes>
              <Route path="/" element={hasVisited ? <Navigate to="/today" replace /> : <Navigate to="/splash" replace />} />
              <Route path="/splash" element={<Splash />} />
              <Route path="/today" element={<Today />} />
              <Route path="/products" element={<Products />} />
              <Route path="/routine-for-you" element={<RoutineForYou />} />
              <Route path="/new-scan" element={<NewScan />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/me" element={<Me />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Only show navigation and floating smiley on main app pages */}
            <Routes>
              <Route path="/splash" element={null} />
              <Route path="*" element={
                <>
                  <BottomNav />
                  <FloatingSmiley />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

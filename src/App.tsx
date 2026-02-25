import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import FocusDayView from "./pages/FocusDayView";
import Mailbox from "./pages/Mailbox";
import Calendar from "./pages/Calendar";
import Meetings from "./pages/Meetings";
import NotFound from "./pages/NotFound";
import DraftsBar from "./components/DraftsBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FocusDayView />} />
            <Route path="/mailbox" element={<Mailbox />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DraftsBar />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

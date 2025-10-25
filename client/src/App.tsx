import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Checkout from "@/pages/Checkout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentPending from "@/pages/PaymentPending";
import PaymentFailure from "@/pages/PaymentFailure";
import Download from "@/pages/Download";
import DownloadZip from "@/pages/DownloadZip";
import Demo from "@/pages/Demo";
import Preview from "@/pages/Preview";
import StudyViewer from "@/pages/StudyViewer";
import TabbedSales from "@/pages/TabbedSales";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tabs" component={TabbedSales} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/payment-pending" component={PaymentPending} />
      <Route path="/payment-failure" component={PaymentFailure} />
      <Route path="/download" component={Download} />
      <Route path="/baixar-zip" component={DownloadZip} />
      <Route path="/demo" component={Demo} />
      <Route path="/preview" component={Preview} />
      <Route path="/study" component={StudyViewer} />
      <Route path="/termos" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { EvaluatePage, InstitutionsPage, ManufacturersPage, ResearchPage, TechnologyPage } from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/tr" component={Home} />
      <Route path="/technology" component={TechnologyPage} />
      <Route path="/manufacturers" component={ManufacturersPage} />
      <Route path="/institutions" component={InstitutionsPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/evaluate" component={EvaluatePage} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

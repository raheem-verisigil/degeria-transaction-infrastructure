import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { EvaluatePage, InstitutionsPage, ManufacturersPage, ProductPage, ResearchPage, StatusPage, TechnologyPage, TurkishSEOPage } from "./pages/Home";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/tr" component={Home} />
      <Route path="/ar" component={Home} />
      <Route path="/de" component={Home} />
      <Route path="/it" component={Home} />
      <Route path="/zh" component={Home} />
      <Route path="/fr" component={Home} />
      <Route path="/pt" component={Home} />
      <Route path="/technology" component={TechnologyPage} />
      <Route path="/manufacturers" component={ManufacturersPage} />
      <Route path="/institutions" component={InstitutionsPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/status" component={StatusPage} />
      <Route path="/product" component={ProductPage} />
      <Route path="/evaluate" component={EvaluatePage} />
      <Route path="/tr/ureticiler" component={() => <TurkishSEOPage kind="ureticiler" />} />
      <Route path="/tr/ihracat" component={() => <TurkishSEOPage kind="ihracat" />} />
      <Route path="/tr/islem-pasaportu" component={() => <TurkishSEOPage kind="islem-pasaportu" />} />
      <Route path="/tr/nasil-calisir" component={() => <TurkishSEOPage kind="nasil-calisir" />} />
      <Route path="/tr/kurumlar" component={() => <TurkishSEOPage kind="kurumlar" />} />
      <Route path="/tr/arastirma" component={() => <TurkishSEOPage kind="arastirma" />} />
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

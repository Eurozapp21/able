import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./lib/auth";
import "./lib/i18n";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";
import About from "./pages/about";
import Solutions from "./pages/solutions";
import SolutionDetail from "./pages/solution-detail";
import Catalogue from "./pages/catalogue";
import CatalogueCategory from "./pages/catalogue-category";
import Contact from "./pages/contact";
import AdminDashboard from "./pages/admin";
import AdminProducts from "./pages/admin-products";
import AdminCategories from "./pages/admin-categories";
import AdminSeminars from "./pages/admin-seminars";
import AdminUsers from "./pages/admin-users";
import AdminEvents from "./pages/admin-events";
import Seminars from "./pages/seminars";
import SeminarDetail from "./pages/seminar-detail";
import Events from "./pages/events";
import Newsroom from "./pages/newsroom";
import NewsDetail from "./pages/news-detail";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Enquiry from "./pages/enquiry";
import EnquiryDetail from "./pages/enquiry-detail";
import NotFound from "@/pages/not-found";
import Preferences from "./pages/preferences";

function Router() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/products/detail/:id" component={ProductDetail} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/solutions/:id" component={SolutionDetail} />
          <Route path="/catalogue" component={Catalogue} />
          <Route path="/catalogue/:slug" component={CatalogueCategory} />
          <Route path="/seminars" component={Seminars} />
          <Route path="/seminars/:id" component={SeminarDetail} />
          <Route path="/events" component={Events} />
          <Route path="/newsroom" component={Newsroom} />
          <Route path="/news/:id" component={NewsDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/enquiry" component={Enquiry} />
          <Route path="/enquiry/:id" component={EnquiryDetail} />
          <Route path="/preferences" component={Preferences} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/categories" component={AdminCategories} />
          <Route path="/admin/seminars" component={AdminSeminars} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/events" component={AdminEvents} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

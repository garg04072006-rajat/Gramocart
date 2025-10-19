import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const { isLoggedIn, login, isLoginOpen, setLoginOpen } = useAuth();
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">G</span>
              </div>
              <span className="text-xl font-bold text-primary">Gramocart</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden flex-1 max-w-xl md:flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for shops, products..."
                  className="w-full pl-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {totalCount}
                  </Badge>
                )}
              </Button>
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard")}
                >
                  <User className="h-5 w-5" />
                </Button>
              ) : (
                <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>Login with your mobile number</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-2">
                      <Input
                        placeholder="Enter mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setLoginOpen(false)}>Cancel</Button>
                      <Button
                        onClick={() => {
                          const cleaned = phone.replace(/\D/g, "");
                          if (cleaned.length < 10) {
                            // simple client-side validation
                            alert("Please enter a valid mobile number (10 digits)");
                            return;
                          }
                          login(cleaned);
                          setLoginOpen(false);
                        }}
                      >
                        Login
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-3 md:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for shops, products..."
                className="w-full pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Left: logo, description and social icons */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">G</span>
                </div>
                <span className="text-lg font-bold text-primary">Gramocart</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-3">Shop local, support villages — fresh groceries delivered to your doorstep.</p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="mailto:hello@gramocart.example" className="text-muted-foreground hover:text-primary">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Right: three columns (About, Quick Links, Support) */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/category/groceries" className="hover:text-primary transition-colors">Groceries</Link></li>
                <li><Link to="/category/vegetables" className="hover:text-primary transition-colors">Vegetables</Link></li>
                <li><Link to="/category/fruits" className="hover:text-primary transition-colors">Fruits</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © 2025 Gramocart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

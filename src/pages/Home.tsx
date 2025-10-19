import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Apple, Milk, Croissant, Package, Carrot, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";

const categories = [
  { id: "groceries", name: "Groceries", icon: ShoppingBag, color: "bg-orange-100 text-orange-600" },
  { id: "vegetables", name: "Vegetables", icon: Carrot, color: "bg-green-100 text-green-600" },
  { id: "fruits", name: "Fruits", icon: Apple, color: "bg-red-100 text-red-600" },
  { id: "bakery", name: "Bakery", icon: Croissant, color: "bg-amber-100 text-amber-600" },
  { id: "dairy", name: "Dairy", icon: Milk, color: "bg-blue-100 text-blue-600" },
  { id: "essentials", name: "Essentials", icon: Package, color: "bg-purple-100 text-purple-600" },
];

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setLoginOpen } = useAuth();

  const openCategory = (id: string) => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    navigate(`/category/${id}`);
  };

  const openShop = (i: number) => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    navigate(`/shop/${i}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Leaf className="h-4 w-4" />
              Supporting Local Communities
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Order from Your<br />
              <span className="text-primary">Local Shops</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get groceries, fresh fruits, dairy, and more delivered from your trusted neighborhood stores.
            </p>
            <Button size="lg" className="rounded-full px-8" onClick={() => navigate('/start-shopping')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Fresh Farm Produce</h3>
              <p className="mb-4 opacity-90">Direct from local farmers - Up to 30% off!</p>
              <Button variant="secondary" className="rounded-full">Shop Now</Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Daily Essentials</h3>
              <p className="mb-4 opacity-90">Free delivery on orders above ₹299</p>
              <Button variant="secondary" className="rounded-full">Order Now</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">Browse products from local stores near you</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div key={category.id} onClick={() => openCategory(category.id)}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Shops */}
      <section className="container mx-auto px-4 py-12 bg-secondary/20">
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Popular Shops Near You</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">Trusted by thousands of happy customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} onClick={() => openShop(i)}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">Local Store {i}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Main Street, Village Center</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">⭐ 4.5</span>
                        <Button size="sm" variant="outline" className="rounded-full">View Shop</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Why Choose Gramocart?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Support Local</h3>
              <p className="text-muted-foreground text-sm">Help local businesses thrive in your community</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Apple className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fresh Quality</h3>
              <p className="text-muted-foreground text-sm">Get fresh products delivered to your doorstep</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Quick delivery from nearby shops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

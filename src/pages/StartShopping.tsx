import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/lib/AuthContext";

const products = [
  { id: "p1", name: "Rice 5kg", price: 250, desc: "High-quality village rice." },
  { id: "p2", name: "Potatoes 1kg", price: 40, desc: "Fresh potatoes from local farms." },
  { id: "p3", name: "Milk 1L", price: 35, desc: "Pure milk from dairy." },
  { id: "p4", name: "Apples 1kg", price: 120, desc: "Fresh seasonal apples." },
  { id: "p5", name: "Bread Loaf", price: 45, desc: "Baked fresh daily." },
  { id: "p6", name: "Eggs (12)", price: 60, desc: "Free-range eggs." },
];

const StartShopping = () => {
  const { isLoggedIn, setLoginOpen } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero / Banner */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-gradient-to-br from-green-200 to-emerald-100 rounded-lg p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Fresh groceries delivered fast</h2>
          <p className="text-lg text-muted-foreground">Browse our selection of essentials from trusted local vendors.</p>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col justify-center">
          <h3 className="font-semibold mb-2">Deals of the day</h3>
          <ul className="text-sm text-muted-foreground">
            <li>Rice - 5kg ₹250</li>
            <li>Apples - 1kg ₹120</li>
            <li>Milk - 1L ₹35</li>
          </ul>
        </div>
      </div>

      {/* Product grid (image on top, details below - Blinkit-like) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="cursor-pointer">
            <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg" />
            <CardContent>
              <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">₹{p.price}</div>
                <div className="flex items-center gap-2">
                  <Dialog open={selected === p.id} onOpenChange={() => setSelected(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelected(p.id)}>Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{p.name}</DialogTitle>
                        <DialogDescription>₹{p.price}</DialogDescription>
                      </DialogHeader>
                      <p className="my-4">{p.desc}</p>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                        <Button onClick={() => {
                          if (!isLoggedIn) {
                            setLoginOpen(true);
                            return;
                          }
                          alert(`Ordered ${p.name} (mock)`);
                        }}>Order</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StartShopping;

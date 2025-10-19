import { useParams } from "react-router-dom";
import { MapPin, Star, Clock, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/CartContext";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  { id: "1", name: "Organic Rice (1kg)", price: 80, image: "rice", inStock: true },
  { id: "2", name: "Fresh Tomatoes (500g)", price: 40, image: "tomato", inStock: true },
  { id: "3", name: "Whole Wheat Flour (1kg)", price: 55, image: "flour", inStock: true },
  { id: "4", name: "Farm Eggs (12 pcs)", price: 90, image: "eggs", inStock: true },
  { id: "5", name: "Pure Honey (500ml)", price: 250, image: "honey", inStock: false },
  { id: "6", name: "Fresh Milk (1L)", price: 60, image: "milk", inStock: true },
  { id: "7", name: "Green Tea (100g)", price: 120, image: "tea", inStock: true },
  { id: "8", name: "Cashew Nuts (250g)", price: 180, image: "nuts", inStock: true },
];

const ShopDetails = () => {
  const { shopId } = useParams();
  const { add, increment, decrement, getQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shop Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Shop Image */}
            <div className="w-full md:w-48 h-48 rounded-lg bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex-shrink-0" />

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Fresh Mart Grocery
                  </h1>
                  <div className="flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">123 Main Street, Village Center</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                </div>
                <Badge className="bg-green-500">Open</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5</span>
                  <span className="text-muted-foreground text-sm">(120 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">20-30 min delivery</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                Your trusted local grocery store with fresh products and daily essentials. 
                We pride ourselves on quality and service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Options */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Products</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Sort by Price</Button>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="h-40 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 relative">
                {!product.inStock && (
                  <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 onClick={() => navigate(`/product/${product.id}`)} className="font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-2 min-h-[2.5rem] cursor-pointer">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  {getQuantity(product.id) > 0 ? (
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button className="px-3 py-1" onClick={() => decrement(product.id)}>-</button>
                      <div className="px-3 py-1 font-medium">{getQuantity(product.id)}</div>
                      <button className="px-3 py-1" onClick={() => increment(product.id)}>+</button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                      disabled={!product.inStock}
                      onClick={() => { add({ id: product.id, name: product.name, price: product.price }); toast.success(`${product.name} added to cart!`); }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopDetails;

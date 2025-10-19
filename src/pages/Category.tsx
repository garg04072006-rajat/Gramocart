import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockShops = [
  {
    id: "1",
    name: "Fresh Mart Grocery",
    address: "123 Main Street, Village Center",
    rating: 4.5,
    reviews: 120,
    category: "Groceries",
    deliveryTime: "20-30 min",
    isOpen: true,
  },
  {
    id: "2",
    name: "Green Valley Store",
    address: "456 Market Road, Near Temple",
    rating: 4.7,
    reviews: 85,
    category: "Groceries",
    deliveryTime: "25-35 min",
    isOpen: true,
  },
  {
    id: "3",
    name: "Village Supermart",
    address: "789 Church Street, Town Square",
    rating: 4.3,
    reviews: 95,
    category: "Groceries",
    deliveryTime: "30-40 min",
    isOpen: false,
  },
  {
    id: "4",
    name: "Farmers Choice",
    address: "321 Farm Road, East Village",
    rating: 4.8,
    reviews: 150,
    category: "Groceries",
    deliveryTime: "15-25 min",
    isOpen: true,
  },
];

const Category = () => {
  const { categoryId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 capitalize">
          {categoryId?.replace("-", " ")} Shops
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          {mockShops.length} shops available near you
        </p>
      </div>

      {/* Shop Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockShops.map((shop) => (
          <Card key={shop.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              {/* Shop Image */}
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden">
                {!shop.isOpen && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="secondary" className="text-sm">Closed</Badge>
                  </div>
                )}
              </div>

              {/* Shop Info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {shop.name}
                  </h3>
                  <div className="flex items-start gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{shop.address}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{shop.rating}</span>
                    <span className="text-muted-foreground">({shop.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{shop.deliveryTime}</span>
                  </div>
                </div>

                {/* Action */}
                <Link to={`/shop/${shop.id}`}>
                  <Button className="w-full rounded-full" disabled={!shop.isOpen}>
                    {shop.isOpen ? "View Shop" : "Closed Now"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;

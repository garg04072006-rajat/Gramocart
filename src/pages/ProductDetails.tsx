import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

const mockProductDetails: Record<string, any> = {
  '1': { id: '1', name: 'Organic Rice (1kg)', price: 80, description: 'High-quality organic rice sourced from local farms.' },
  '2': { id: '2', name: 'Fresh Tomatoes (500g)', price: 40, description: 'Juicy tomatoes perfect for curries and salads.' },
  '3': { id: '3', name: 'Whole Wheat Flour (1kg)', price: 55, description: 'Freshly milled whole wheat flour.' },
  '4': { id: '4', name: 'Farm Eggs (12 pcs)', price: 90, description: 'Free-range farm eggs.' },
  '5': { id: '5', name: 'Pure Honey (500ml)', price: 250, description: 'Natural honey, unprocessed.' },
  '6': { id: '6', name: 'Fresh Milk (1L)', price: 60, description: 'Pure milk from local dairy farms.' },
  '7': { id: '7', name: 'Green Tea (100g)', price: 120, description: 'Refreshing green tea.' },
  '8': { id: '8', name: 'Cashew Nuts (250g)', price: 180, description: 'Premium cashews.' },
};

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productId ? mockProductDetails[productId] : null;
  const { add, increment, decrement, getQuantity } = useCart();

  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-primary">₹{product.price}</div>
              {getQuantity(product.id) > 0 ? (
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button className="px-3 py-1" onClick={() => decrement(product.id)}>-</button>
                  <div className="px-3 py-1 font-medium">{getQuantity(product.id)}</div>
                  <button className="px-3 py-1" onClick={() => increment(product.id)}>+</button>
                </div>
              ) : (
                <Button onClick={() => { add({ id: product.id, name: product.name, price: product.price }); toast.success(`${product.name} added to cart!`); }}>
                  Add to Cart
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;

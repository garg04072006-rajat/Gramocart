import { Link } from "react-router-dom";
import { CheckCircle2, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. We're preparing it for delivery.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-semibold text-foreground">#GC20250118001</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold text-foreground">Jan 18, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-semibold text-primary text-lg">₹260</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-semibold text-foreground">Cash on Delivery</p>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-semibold text-foreground">20-30 minutes</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/dashboard" className="flex-1">
              <Button className="w-full rounded-full" size="lg">
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full rounded-full" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted-foreground mt-8">
            You will receive order updates via SMS and email
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="House/Flat No, Street Name" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="village">Village/Town</Label>
                    <Input id="village" placeholder="Your Village" />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input id="district" placeholder="District Name" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="123456" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input id="landmark" placeholder="Near temple, market, etc." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-input hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">Pay when you receive</div>
                    </Label>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-input hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Pay Online</div>
                      <div className="text-sm text-muted-foreground">UPI, Cards, Wallets</div>
                    </Label>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items (3)</span>
                  <span className="font-medium">₹250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">₹30</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹20</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹260</span>
              </div>

              <Button
                className="w-full rounded-full"
                size="lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing order, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

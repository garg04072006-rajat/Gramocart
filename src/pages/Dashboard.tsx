import { useState } from "react";
import { User, ShoppingBag, History, Wallet, MapPin, Settings, LogOut, Package, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockActiveOrders = [
  {
    id: "#GC001",
    date: "Jan 18, 2025",
    shop: "Fresh Mart Grocery",
    items: 3,
    total: 260,
    status: "preparing",
    estimatedTime: "15 mins",
  },
  {
    id: "#GC002",
    date: "Jan 17, 2025",
    shop: "Green Valley Store",
    items: 5,
    total: 450,
    status: "on-the-way",
    estimatedTime: "5 mins",
  },
];

const mockOrderHistory = [
  {
    id: "#GC003",
    date: "Jan 15, 2025",
    shop: "Village Supermart",
    items: 4,
    total: 320,
    status: "delivered",
  },
  {
    id: "#GC004",
    date: "Jan 12, 2025",
    shop: "Farmers Choice",
    items: 6,
    total: 580,
    status: "delivered",
  },
  {
    id: "#GC005",
    date: "Jan 10, 2025",
    shop: "Fresh Mart Grocery",
    items: 2,
    total: 150,
    status: "cancelled",
  },
];

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    address: "123 Main Street, Village Center, District Name - 123456",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    address: "456 Market Road, Near Temple, District Name - 123457",
    isDefault: false,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const getStatusBadge = (status: string) => {
    const variants = {
      preparing: { label: "Preparing", className: "bg-blue-500" },
      "on-the-way": { label: "On the Way", className: "bg-yellow-500" },
      delivered: { label: "Delivered", className: "bg-green-500" },
      cancelled: { label: "Cancelled", className: "bg-red-500" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Manage your orders and account</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Active Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold">20</p>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">₹500</p>
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Rahul Kumar</p>
                <p className="text-sm text-muted-foreground">rahul@example.com</p>
              </div>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-2">
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                My Orders
              </Button>
              <Button
                variant={activeTab === "history" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("history")}
              >
                <History className="h-4 w-4 mr-2" />
                Order History
              </Button>
              <Button
                variant={activeTab === "wallet" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wallet")}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </Button>
              <Button
                variant={activeTab === "addresses" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>

            <Separator className="my-4" />

            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Active Orders</h2>
              {mockActiveOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">₹{order.total}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><span className="text-muted-foreground">Shop:</span> {order.shop}</p>
                      <p className="text-sm"><span className="text-muted-foreground">Items:</span> {order.items}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-primary font-medium">Arriving in {order.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-full">Track Order</Button>
                      <Button variant="outline" className="flex-1 rounded-full text-destructive hover:text-destructive">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Order History</h2>
              {mockOrderHistory.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <p className="text-lg font-bold text-primary">₹{order.total}</p>
                    </div>
                    <p className="text-sm mb-3"><span className="text-muted-foreground">Shop:</span> {order.shop}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">View Details</Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="rounded-full">Reorder</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "wallet" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Wallet</h2>
              <Card className="mb-6">
                <CardContent className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                  <p className="text-4xl font-bold text-primary mb-4">₹500</p>
                  <Button className="rounded-full">Add Money</Button>
                </CardContent>
              </Card>

              <h3 className="font-semibold mb-3">Recent Transactions</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Added to wallet</p>
                        <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
                      </div>
                      <p className="font-semibold text-green-600">+₹500</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #GC003</p>
                        <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
                      </div>
                      <p className="font-semibold text-red-600">-₹320</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Saved Addresses</h2>
                <Button className="rounded-full">Add New</Button>
              </div>
              <div className="space-y-4">
                {mockAddresses.map((addr) => (
                  <Card key={addr.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{addr.label}</h3>
                            {addr.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{addr.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">Edit</Button>
                        {!addr.isDefault && (
                          <Button variant="outline" size="sm" className="rounded-full">Set as Default</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Settings options coming soon...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { User, ShoppingBag, History, Wallet, MapPin, Settings, LogOut, Package, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
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
  const [mobileOpenTab, setMobileOpenTab] = useState<string | null>("orders");

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

  const { logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Manage your orders and account</p>
      </div>
      {/* Mobile: profile card + stats (shown only on small screens) */}
      <div className="md:hidden mb-4">
        <div className="mb-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Rahul Kumar</p>
                  <p className="text-sm text-muted-foreground">{/* show phone if available */}rahul@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Active Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-xl font-bold">20</p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Wallet className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-xl font-bold">₹500</p>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
            </CardContent>
          </Card>
        </div>
        {/* Mobile-only nav (My Orders / Order History / Wallet / Addresses / Settings / Logout) */}
        <div className="bg-white rounded-lg p-4">
          <nav className="space-y-2">
            {/* Orders button + inline content */}
            <div>
              <button onClick={() => { setActiveTab('orders'); setMobileOpenTab(mobileOpenTab === 'orders' ? null : 'orders'); }} className={`w-full text-left rounded-md px-4 py-3 flex items-center justify-between gap-3 ${activeTab === 'orders' ? 'bg-green-50' : ''}`}>
                <div className="flex items-center gap-3"><ShoppingBag className="h-4 w-4" /><span>My Orders</span></div>
                {mobileOpenTab === 'orders' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {mobileOpenTab === 'orders' && (
                <div className="mt-3">
                  {mockActiveOrders.map((order) => (
                    <Card key={order.id} className="mb-3">
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
                          {order.estimatedTime && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-primary font-medium">Arriving in {order.estimatedTime}</span>
                            </div>
                          )}
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
            </div>

            {/* History button + inline content */}
            <div>
              <button onClick={() => { setActiveTab('history'); setMobileOpenTab(mobileOpenTab === 'history' ? null : 'history'); }} className={`w-full text-left rounded-md px-4 py-3 flex items-center justify-between gap-3 ${activeTab === 'history' ? 'bg-green-50' : ''}`}>
                <div className="flex items-center gap-3"><History className="h-4 w-4" /><span>Order History</span></div>
                {mobileOpenTab === 'history' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {mobileOpenTab === 'history' && (
                <div className="mt-3">
                  {mockOrderHistory.map((order) => (
                    <Card key={order.id} className="mb-3">
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
            </div>

            {/* Wallet button + inline content */}
            <div>
              <button onClick={() => { setActiveTab('wallet'); setMobileOpenTab(mobileOpenTab === 'wallet' ? null : 'wallet'); }} className={`w-full text-left rounded-md px-4 py-3 flex items-center justify-between gap-3 ${activeTab === 'wallet' ? 'bg-green-50' : ''}`}>
                <div className="flex items-center gap-3"><Wallet className="h-4 w-4" /><span>Wallet</span></div>
                {mobileOpenTab === 'wallet' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {mobileOpenTab === 'wallet' && (
                <div className="mt-3">
                  <Card className="mb-3">
                    <CardContent className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                      <p className="text-4xl font-bold text-primary mb-4">₹500</p>
                      <Button className="rounded-full">Add Money</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Addresses button + inline content */}
            <div>
              <button onClick={() => { setActiveTab('addresses'); setMobileOpenTab(mobileOpenTab === 'addresses' ? null : 'addresses'); }} className={`w-full text-left rounded-md px-4 py-3 flex items-center justify-between gap-3 ${activeTab === 'addresses' ? 'bg-green-50' : ''}`}>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /><span>Addresses</span></div>
                {mobileOpenTab === 'addresses' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {mobileOpenTab === 'addresses' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Saved Addresses</h3>
                    <Button className="rounded-full">Add New</Button>
                  </div>
                  <div className="space-y-4">
                    {mockAddresses.map((addr) => (
                      <Card key={addr.id} className="mb-3">
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
            </div>

            {/* Settings button + inline content */}
            <div>
              <button onClick={() => { setActiveTab('settings'); setMobileOpenTab(mobileOpenTab === 'settings' ? null : 'settings'); }} className={`w-full text-left rounded-md px-4 py-3 flex items-center justify-between gap-3 ${activeTab === 'settings' ? 'bg-green-50' : ''}`}>
                <div className="flex items-center gap-3"><Settings className="h-4 w-4" /><span>Settings</span></div>
                {mobileOpenTab === 'settings' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {mobileOpenTab === 'settings' && (
                <div className="mt-3">
                  <Card className="mb-3">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground">Settings options coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="border-t my-2" />
            <button onClick={() => logout()} className="w-full text-left text-destructive rounded-md px-4 py-3 flex items-center gap-3">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Cards (desktop/tablet) */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
        {/* Sidebar (desktop only) */}
        <Card className="hidden lg:block lg:col-span-1 h-fit">
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

            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3">
          

          {/* Orders - desktop/tablet (unchanged) */}
          {activeTab === "orders" && (
            <div className="hidden md:block space-y-4">
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

          {/* History - desktop */}
          {activeTab === "history" && (
            <div className="hidden md:block space-y-4">
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

          {/* Wallet - desktop */}
          {activeTab === "wallet" && (
            <div className="hidden md:block">
              <h2 className="text-2xl font-bold mb-4">Wallet</h2>
              <Card className="mb-6">
                <CardContent className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                  <p className="text-4xl font-bold text-primary mb-4">₹500</p>
                  <Button className="rounded-full">Add Money</Button>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Addresses - desktop */}
          {activeTab === "addresses" && (
            <div className="hidden md:block">
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

          {/* Settings - desktop */}
          {activeTab === "settings" && (
            <div className="hidden md:block">
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

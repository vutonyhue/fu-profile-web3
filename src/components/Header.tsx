import { Button } from "@/components/ui/button";
import { Wallet, Home, Video, ShoppingBag, CreditCard, Bell, MessageCircle, User } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { toast } from "sonner";

export const Header = () => {
  const { account, isConnected, connectWallet, disconnectWallet, isLoading } = useWeb3();

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnectWallet();
      toast.success("Wallet disconnected");
    } else {
      await connectWallet();
      if (account) {
        toast.success("Wallet connected successfully!");
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-cosmic">
              <span className="text-lg font-bold text-white">FU</span>
            </div>
            <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Fun Profile
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Video className="h-4 w-4" />
              Video
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              AI Mall
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Nạp F-Black
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={handleWalletClick}
            disabled={isLoading}
            className={`gap-2 ${
              isConnected 
                ? "bg-gradient-gold hover:opacity-90" 
                : "bg-gradient-cosmic hover:opacity-90"
            }`}
          >
            <Wallet className="h-4 w-4" />
            {isLoading ? "Connecting..." : isConnected ? formatAddress(account!) : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  );
};

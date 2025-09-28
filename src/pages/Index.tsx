import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StockCard } from "@/components/StockCard";
import { sampleStocks } from "@/data/sampleStocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");
  
  const communities = useMemo(() => {
    const communitySet = new Set(sampleStocks.map(stock => stock.community));
    return Array.from(communitySet);
  }, []);

  const filteredStocks = useMemo(() => {
    return sampleStocks.filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCommunity = selectedCommunity === "all" || stock.community === selectedCommunity;
      return matchesSearch && matchesCommunity;
    });
  }, [searchTerm, selectedCommunity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Trending Stock Picks</h2>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Button
              variant={selectedCommunity === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCommunity("all")}
            >
              All Communities
            </Button>
            {communities.map(community => (
              <Button
                key={community}
                variant={selectedCommunity === community ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCommunity(community)}
              >
                {community}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-border/50">
            <p className="text-2xl font-bold text-foreground">{filteredStocks.length}</p>
            <p className="text-sm text-muted-foreground">Stocks Tracked</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border/50">
            <p className="text-2xl font-bold text-success">{filteredStocks.filter(s => s.sentiment === 'bullish').length}</p>
            <p className="text-sm text-muted-foreground">Bullish Picks</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border/50">
            <p className="text-2xl font-bold text-foreground">{communities.length}</p>
            <p className="text-sm text-muted-foreground">Communities</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border/50">
            <p className="text-2xl font-bold text-accent">{filteredStocks.reduce((acc, stock) => acc + stock.mentions, 0)}</p>
            <p className="text-sm text-muted-foreground">Total Mentions</p>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>

        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stocks found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
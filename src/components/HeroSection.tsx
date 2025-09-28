import { TrendingUp, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Discover Top Stock Picks from
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> Reddit Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Get curated stock recommendations from India's and international Reddit communities. 
            Real traders, real insights, real opportunities.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="px-8">
              Browse Stocks
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              How It Works
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-accent/10 rounded-full">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Community Powered</h3>
              <p className="text-sm text-muted-foreground text-center">
                Aggregated from r/IndiaInvestments, r/stocks, and more
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-success/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Live Updates</h3>
              <p className="text-sm text-muted-foreground text-center">
                Real-time stock prices and sentiment analysis
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-primary/10 rounded-full">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Smart Insights</h3>
              <p className="text-sm text-muted-foreground text-center">
                AI-powered analysis of community discussions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
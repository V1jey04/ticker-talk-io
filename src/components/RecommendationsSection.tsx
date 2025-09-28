import { TrendingUp, Star, Users, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stock } from "@/components/StockCard";

interface RecommendationsSectionProps {
  stocks: Stock[];
}

export const RecommendationsSection = ({ stocks }: RecommendationsSectionProps) => {
  // Calculate recommendation score based on mentions, sentiment, and posts
  const getRecommendationScore = (stock: Stock) => {
    let score = stock.mentions * 2 + stock.posts * 3;
    if (stock.sentiment === 'bullish') score += 50;
    else if (stock.sentiment === 'neutral') score += 20;
    return score;
  };

  // Get top 3 recommended stocks
  const topRecommendations = stocks
    .map(stock => ({
      ...stock,
      score: getRecommendationScore(stock)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <Star className="h-6 w-6 text-warning" />
        <h2 className="text-2xl font-bold text-foreground">Top Reddit Picks</h2>
        <Badge variant="outline" className="ml-2">AI Recommended</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRecommendations.map((stock, index) => {
          const isPositive = stock.change >= 0;
          const rankBadges = ['🥇 #1', '🥈 #2', '🥉 #3'];
          
          return (
            <Card key={stock.symbol} className="relative overflow-hidden border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{rankBadges[index]}</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {stock.community}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant={stock.sentiment === 'bullish' ? 'default' : 'secondary'} 
                    className="capitalize"
                  >
                    {stock.sentiment}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">₹{stock.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-success' : 'text-destructive'}`} />
                      <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold">{stock.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Reddit Score</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{stock.mentions}</p>
                      <p className="text-xs text-muted-foreground">Mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{stock.posts}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Why it's recommended:</div>
                  <div className="flex flex-wrap gap-1">
                    {stock.mentions > 150 && <Badge variant="outline" className="text-xs">High Mentions</Badge>}
                    {stock.sentiment === 'bullish' && <Badge variant="outline" className="text-xs">Bullish Sentiment</Badge>}
                    {stock.posts > 20 && <Badge variant="outline" className="text-xs">Active Discussion</Badge>}
                    {stock.changePercent > 1 && <Badge variant="outline" className="text-xs">Strong Performance</Badge>}
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  View Analysis
                </Button>
              </CardContent>
              
              {/* Recommendation glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-success/5 pointer-events-none" />
            </Card>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/50">
        <div className="text-sm text-muted-foreground">
          <strong>How recommendations work:</strong> Our AI analyzes Reddit community discussions, 
          considering factors like mention frequency, sentiment analysis, post engagement, and recent performance 
          to identify the most talked-about stocks across Indian and international communities.
        </div>
      </div>
    </section>
  );
};
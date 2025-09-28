import { TrendingUp, TrendingDown, MessageCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  community: string;
  mentions: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  posts: number;
  marketCap: string;
  sector: string;
}

interface StockCardProps {
  stock: Stock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  const sentimentColor = stock.sentiment === 'bullish' ? 'success' : 
                        stock.sentiment === 'bearish' ? 'destructive' : 'secondary';

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{stock.sector}</p>
          </div>
          <Badge variant={sentimentColor === 'success' ? 'default' : 'secondary'} className="capitalize">
            {stock.sentiment}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">₹{stock.price.toFixed(2)}</p>
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-medium text-foreground">{stock.marketCap}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{stock.posts} posts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{stock.mentions} mentions</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {stock.community}
          </Badge>
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
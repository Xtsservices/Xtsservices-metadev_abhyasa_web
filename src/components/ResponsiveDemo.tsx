import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useResponsive } from './ui/use-responsive';

export function ResponsiveDemo() {
  const { isMobile, isTablet, isDesktop, width } = useResponsive();

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Responsive Layout Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span>Screen Width:</span>
            <Badge variant="outline">{width}px</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Device Type:</span>
            <Badge variant={isMobile ? "default" : "secondary"}>
              {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}
            </Badge>
          </div>
        </div>
        
        {/* Show current breakpoint */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="block md:hidden">
            <Badge variant="default">Mobile Layout Active (< 768px)</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              • Bottom navigation visible
              • Mobile header
              • Compact cards and spacing
            </p>
          </div>
          <div className="hidden md:block lg:hidden">
            <Badge variant="secondary">Tablet Layout Active (768px - 1279px)</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              • Sidebar + header layout
              • Medium spacing
              • Responsive grid layouts
            </p>
          </div>
          <div className="hidden lg:block">
            <Badge variant="outline">Desktop Layout Active (≥ 1280px)</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              • Full sidebar navigation
              • Large spacing and components
              • Multi-column layouts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
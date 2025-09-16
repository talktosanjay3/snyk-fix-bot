import { Card, CardContent } from "@/components/ui/card";
import { Building2, Database, Lock } from "lucide-react";

interface AssetInfoProps {
  assetId: string;
  applicationName: string;
}

export const AssetInfo = ({ assetId, applicationName }: AssetInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-lg rounded-full group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative p-3 bg-gradient-accent rounded-xl">
                <Database className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Asset ID
              </p>
              <p className="text-lg font-bold text-foreground font-mono">
                {assetId}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-lg rounded-full group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative p-3 bg-gradient-accent rounded-xl">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Application Name
              </p>
              <p className="text-lg font-bold text-foreground">
                {applicationName}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
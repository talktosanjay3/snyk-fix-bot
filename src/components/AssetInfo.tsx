import { Card, CardContent } from "@/components/ui/card";
import { Building2, Database } from "lucide-react";

interface AssetInfoProps {
  assetId: string;
  applicationName: string;
}

export const AssetInfo = ({ assetId, applicationName }: AssetInfoProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Asset ID
              </label>
              <div className="text-xl font-bold text-foreground mt-1 font-mono">
                {assetId}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Application Name
              </label>
              <div className="text-xl font-bold text-foreground mt-1">
                {applicationName}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
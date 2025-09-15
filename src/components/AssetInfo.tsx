import { Card, CardContent } from "@/components/ui/card";
import { Building2, Database } from "lucide-react";

interface AssetInfoProps {
  assetId: string;
  applicationName: string;
}

export const AssetInfo = ({ assetId, applicationName }: AssetInfoProps) => {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Asset ID
              </label>
              <div className="text-lg font-semibold text-foreground">
                {assetId}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Application Name
              </label>
              <div className="text-lg font-semibold text-foreground">
                {applicationName}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
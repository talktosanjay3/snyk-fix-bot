import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface TechnicalDebtMetricsProps {
  totalIssues: number;
  resolvedIssues: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
}

export const TechnicalDebtMetrics = ({
  totalIssues,
  resolvedIssues,
  criticalIssues,
  highIssues,
  mediumIssues,
  lowIssues
}: TechnicalDebtMetricsProps) => {
  const resolutionPercentage = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;
  const unresolvedIssues = totalIssues - resolvedIssues;
  
  // Calculate technical debt score (higher severity = more debt)
  const debtScore = (criticalIssues * 4) + (highIssues * 3) + (mediumIssues * 2) + (lowIssues * 1);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Total Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{totalIssues}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {unresolvedIssues} unresolved
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Resolution Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-resolved">{resolutionPercentage.toFixed(1)}%</div>
          <Progress value={resolutionPercentage} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <TrendingDown className="h-4 w-4 mr-2" />
            Technical Debt Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-unresolved">{debtScore}</div>
          <div className="text-sm text-muted-foreground mt-1">
            Weighted by severity
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Priority Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-critical">{criticalIssues + highIssues}</div>
          <div className="text-sm text-muted-foreground mt-1">
            Critical + High severity
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
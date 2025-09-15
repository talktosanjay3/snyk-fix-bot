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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center uppercase tracking-wide">
            <AlertTriangle className="h-5 w-5 mr-3" />
            Total Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-foreground">{totalIssues}</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">
            {unresolvedIssues} unresolved
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center uppercase tracking-wide">
            <CheckCircle className="h-5 w-5 mr-3" />
            Resolution Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-resolved">{resolutionPercentage.toFixed(1)}%</div>
          <Progress value={resolutionPercentage} className="mt-3 h-3 rounded-full" />
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center uppercase tracking-wide">
            <TrendingDown className="h-5 w-5 mr-3" />
            Technical Debt Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-unresolved">{debtScore}</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">
            Weighted by severity
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center uppercase tracking-wide">
            <Clock className="h-5 w-5 mr-3" />
            Priority Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-critical">{criticalIssues + highIssues}</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">
            Critical + High severity
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
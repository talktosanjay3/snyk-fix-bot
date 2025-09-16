import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, CheckCircle2, AlertCircle } from "lucide-react";

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
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;
  const unresolvedIssues = totalIssues - resolvedIssues;
  const debtScore = Math.max(0, 100 - (criticalIssues * 25 + highIssues * 15 + mediumIssues * 8 + lowIssues * 3));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Health Score</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{debtScore}/100</div>
            <Progress value={debtScore} className="h-1.5" />
            <p className="text-xs text-muted-foreground">
              {debtScore >= 80 ? "Excellent Security" : debtScore >= 60 ? "Good" : "Needs Attention"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-resolved/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-resolved/10 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-resolved" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Resolved</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{resolutionRate}%</div>
            <Progress value={resolutionRate} className="h-1.5" />
            <p className="text-xs text-muted-foreground">
              {resolvedIssues} of {totalIssues} issues fixed
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-critical/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-critical/10 rounded-lg">
              <AlertCircle className="h-4 w-4 text-critical" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Critical</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-critical">{criticalIssues}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-high">{highIssues} High</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-medium">{mediumIssues} Med</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-low">{lowIssues} Low</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-border shadow-card hover:shadow-elevated transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Pending</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">{unresolvedIssues}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting remediation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
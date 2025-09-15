import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  Shield, 
  Bug, 
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Send
} from "lucide-react";

export interface SecurityIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'found' | 'resolved' | 'unresolved';
  type: 'SCA' | 'SAST';
  description: string;
  remediation?: string;
  cve?: string;
  package?: string;
  version?: string;
  fixedVersion?: string;
}

interface IssuesTableProps {
  issues: SecurityIssue[];
  onAIRemediation?: (issueId: string, userInput: string) => void;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return <AlertTriangle className="h-4 w-4" />;
    case 'high': return <Shield className="h-4 w-4" />;
    case 'medium': return <Bug className="h-4 w-4" />;
    case 'low': return <Zap className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'resolved': return <CheckCircle className="h-4 w-4 text-resolved" />;
    case 'unresolved': return <AlertCircle className="h-4 w-4 text-unresolved" />;
    case 'found': return <Clock className="h-4 w-4 text-found" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    case 'low': return 'low';
    default: return 'muted';
  }
};

export const IssuesTable = ({ issues, onAIRemediation }: IssuesTableProps) => {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  const toggleExpanded = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const handleUserInputChange = (issueId: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [issueId]: value }));
  };

  const handleAISubmit = (issueId: string) => {
    const userInput = userInputs[issueId];
    if (userInput && onAIRemediation) {
      onAIRemediation(issueId, userInput);
      setUserInputs(prev => ({ ...prev, [issueId]: '' }));
    }
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === filter);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-border/10 bg-gradient-to-r from-white to-secondary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-foreground tracking-tight">
            Security Issues ({filteredIssues.length})
          </CardTitle>
          <div className="flex gap-3">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="rounded-xl font-medium"
            >
              All
            </Button>
            <Button
              variant={filter === 'critical' ? 'critical' : 'outline'}
              size="sm"
              onClick={() => setFilter('critical')}
              className="rounded-xl font-medium"
            >
              Critical
            </Button>
            <Button
              variant={filter === 'high' ? 'high' : 'outline'}
              size="sm"
              onClick={() => setFilter('high')}
              className="rounded-xl font-medium"
            >
              High
            </Button>
            <Button
              variant={filter === 'medium' ? 'medium' : 'outline'}
              size="sm"
              onClick={() => setFilter('medium')}
              className="rounded-xl font-medium"
            >
              Medium
            </Button>
            <Button
              variant={filter === 'low' ? 'low' : 'outline'}
              size="sm"
              onClick={() => setFilter('low')}
              className="rounded-xl font-medium"
            >
              Low
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {filteredIssues.map((issue, index) => (
            <div key={issue.id} className={`border-b border-border/10 last:border-0 ${index % 2 === 0 ? 'bg-white/50' : 'bg-secondary/20'}`}>
              <div 
                className="p-6 hover:bg-secondary/30 cursor-pointer transition-all duration-200"
                onClick={() => toggleExpanded(issue.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 flex-1">
                    <div className="flex items-center space-x-3">
                      {expandedIssues.has(issue.id) ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      {getSeverityIcon(issue.severity)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-foreground text-lg">{issue.title}</span>
                        <Badge variant="outline" className="text-xs font-mono bg-secondary/50">
                          {issue.id}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {issue.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge 
                        className={`${
                          issue.severity === 'critical' ? 'bg-critical hover:bg-critical/80' :
                          issue.severity === 'high' ? 'bg-high hover:bg-high/80' :
                          issue.severity === 'medium' ? 'bg-medium hover:bg-medium/80' :
                          issue.severity === 'low' ? 'bg-low hover:bg-low/80' : ''
                        } text-white border-0 px-3 py-1 font-semibold rounded-xl`}
                      >
                        {issue.severity.toUpperCase()}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(issue.status)}
                        <span className="text-sm capitalize font-semibold">
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedIssues.has(issue.id) && (
                <div className="border-t border-border/10 p-6 bg-gradient-to-r from-secondary/10 to-white">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-lg">Description</h4>
                      <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
                    </div>
                    
                    {issue.package && (
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Package</h4>
                          <p className="text-muted-foreground font-mono bg-secondary/30 px-3 py-2 rounded-lg">{issue.package}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Current Version</h4>
                          <p className="text-muted-foreground font-mono bg-secondary/30 px-3 py-2 rounded-lg">{issue.version}</p>
                        </div>
                      </div>
                    )}
                    
                    {issue.cve && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">CVE</h4>
                        <p className="text-muted-foreground font-mono bg-secondary/30 px-3 py-2 rounded-lg inline-block">{issue.cve}</p>
                      </div>
                    )}
                    
                    {issue.remediation && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Remediation Applied</h4>
                        <div className="bg-resolved/10 border border-resolved/20 rounded-xl p-4">
                          <p className="text-foreground leading-relaxed">{issue.remediation}</p>
                        </div>
                      </div>
                    )}
                    
                    {issue.status === 'unresolved' && (
                      <div className="pt-6 border-t border-border/20">
                        <h4 className="font-semibold text-foreground mb-4 text-lg">AI Remediation Request</h4>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Describe the remediation action you'd like the AI to perform..."
                            value={userInputs[issue.id] || ''}
                            onChange={(e) => handleUserInputChange(issue.id, e.target.value)}
                            className="min-h-[100px] rounded-xl border-border/30 focus:border-primary/50 bg-white/80"
                          />
                          <Button 
                            onClick={() => handleAISubmit(issue.id)}
                            disabled={!userInputs[issue.id]?.trim()}
                            className="bg-primary hover:bg-primary/80 rounded-xl px-6 py-3 font-semibold"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Request AI Remediation
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
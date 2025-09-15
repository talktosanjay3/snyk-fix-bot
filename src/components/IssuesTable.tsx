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
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-foreground">
            Security Issues ({filteredIssues.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'critical' ? 'critical' : 'outline'}
              size="sm"
              onClick={() => setFilter('critical')}
            >
              Critical
            </Button>
            <Button
              variant={filter === 'high' ? 'high' : 'outline'}
              size="sm"
              onClick={() => setFilter('high')}
            >
              High
            </Button>
            <Button
              variant={filter === 'medium' ? 'medium' : 'outline'}
              size="sm"
              onClick={() => setFilter('medium')}
            >
              Medium
            </Button>
            <Button
              variant={filter === 'low' ? 'low' : 'outline'}
              size="sm"
              onClick={() => setFilter('low')}
            >
              Low
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="p-4 hover:bg-muted/20 cursor-pointer transition-colors"
                onClick={() => toggleExpanded(issue.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      {expandedIssues.has(issue.id) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      {getSeverityIcon(issue.severity)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-foreground">{issue.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {issue.id}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {issue.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={`${
                          issue.severity === 'critical' ? 'bg-critical hover:bg-critical/80' :
                          issue.severity === 'high' ? 'bg-high hover:bg-high/80' :
                          issue.severity === 'medium' ? 'bg-medium hover:bg-medium/80' :
                          issue.severity === 'low' ? 'bg-low hover:bg-low/80' : ''
                        } text-white border-0`}
                      >
                        {issue.severity.toUpperCase()}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(issue.status)}
                        <span className="text-sm capitalize font-medium">
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedIssues.has(issue.id) && (
                <div className="border-t border-border/50 p-4 bg-muted/10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    
                    {issue.package && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Package</h4>
                          <p className="text-sm text-muted-foreground">{issue.package}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Current Version</h4>
                          <p className="text-sm text-muted-foreground">{issue.version}</p>
                        </div>
                      </div>
                    )}
                    
                    {issue.cve && (
                      <div>
                        <h4 className="font-medium text-foreground mb-1">CVE</h4>
                        <p className="text-sm text-muted-foreground">{issue.cve}</p>
                      </div>
                    )}
                    
                    {issue.remediation && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Remediation Applied</h4>
                        <div className="bg-resolved/10 border border-resolved/20 rounded-lg p-3">
                          <p className="text-sm text-foreground">{issue.remediation}</p>
                        </div>
                      </div>
                    )}
                    
                    {issue.status === 'unresolved' && (
                      <div className="pt-4 border-t border-border/30">
                        <h4 className="font-medium text-foreground mb-3">AI Remediation Request</h4>
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Describe the remediation action you'd like the AI to perform..."
                            value={userInputs[issue.id] || ''}
                            onChange={(e) => handleUserInputChange(issue.id, e.target.value)}
                            className="min-h-[80px]"
                          />
                          <Button 
                            onClick={() => handleAISubmit(issue.id)}
                            disabled={!userInputs[issue.id]?.trim()}
                            className="bg-primary hover:bg-primary/80"
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
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ChevronDown, 
  ChevronRight, 
  Shield,
  CheckCircle2,
  AlertCircle,
  Send,
  Bot
} from "lucide-react";
import React from "react";

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

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'resolved': return 'default';
    case 'unresolved': return 'destructive';
    case 'found': return 'secondary';
    default: return 'outline';
  }
};

export const IssuesTable = ({ issues, onAIRemediation }: IssuesTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const toggleExpanded = (issueId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedRows(newExpanded);
  };

  const handleAIRemediation = (issueId: string, userInput: string) => {
    if (onAIRemediation) {
      onAIRemediation(issueId, userInput);
      setUserInputs(prev => ({ ...prev, [issueId]: '' }));
    }
  };

  const filteredIssues = issues.filter(issue => {
    const severityMatch = severityFilter === 'all' || issue.severity === severityFilter;
    const statusMatch = statusFilter === 'all' || issue.status === statusFilter;
    return severityMatch && statusMatch;
  });

  return (
    <Card className="bg-white border-border shadow-card">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Security Issues
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredIssues.length} vulnerabilities found
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted border-b">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold text-foreground">Issue ID</TableHead>
                <TableHead className="font-semibold text-foreground">Title</TableHead>
                <TableHead className="font-semibold text-foreground">Severity</TableHead>
                <TableHead className="font-semibold text-foreground">Type</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <React.Fragment key={issue.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/50 transition-colors border-b border-border/50"
                    onClick={() => toggleExpanded(issue.id)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                        {expandedRows.has(issue.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-medium text-primary">
                      {issue.id}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {issue.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityVariant(issue.severity)} className="font-medium">
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium border-primary/20 text-primary">
                        {issue.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(issue.status)} className="font-medium">
                        {issue.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(issue.id) && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-gradient-card p-6 border-b border-border/50">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {issue.description}
                              </p>
                            </div>
                            <div className="space-y-4">
                              {issue.cve && (
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-foreground text-sm">CVE:</span>
                                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{issue.cve}</span>
                                </div>
                              )}
                              {issue.package && (
                                <div className="space-y-1">
                                  <span className="font-semibold text-foreground text-sm">Package:</span>
                                  <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {issue.package}@{issue.version}
                                    {issue.fixedVersion && (
                                      <span className="text-primary ml-2">→ {issue.fixedVersion}</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {issue.remediation && (
                            <div className="p-4 bg-resolved/5 border border-resolved/20 rounded-lg">
                              <h4 className="font-semibold text-resolved mb-3 flex items-center">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Remediation Applied
                              </h4>
                              <p className="text-sm text-muted-foreground">{issue.remediation}</p>
                            </div>
                          )}
                          
                          {issue.status === 'unresolved' && !issue.remediation && (
                            <div className="p-4 bg-gradient-accent border border-primary/20 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                <Bot className="h-4 w-4 mr-2 text-primary" />
                                AI Remediation Assistant
                              </h4>
                              <div className="flex space-x-3">
                                <Input
                                  placeholder="Describe your requirements or ask for AI suggestions..."
                                  value={userInputs[issue.id] || ''}
                                  onChange={(e) => setUserInputs(prev => ({
                                    ...prev,
                                    [issue.id]: e.target.value
                                  }))}
                                  className="flex-1"
                                />
                                <Button 
                                  onClick={() => handleAIRemediation(issue.id, userInputs[issue.id] || '')}
                                  className="bg-primary hover:bg-primary/90 shadow-sm"
                                  disabled={!userInputs[issue.id]}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Send to AI
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
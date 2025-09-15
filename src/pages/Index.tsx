import { useState } from "react";
import { SecurityHeader } from "@/components/SecurityHeader";
import { AssetInfo } from "@/components/AssetInfo";
import { TechnicalDebtMetrics } from "@/components/TechnicalDebtMetrics";
import { IssuesTable, SecurityIssue } from "@/components/IssuesTable";
import { SecurityFooter } from "@/components/SecurityFooter";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockIssues: SecurityIssue[] = [
  {
    id: "SNYK-001",
    title: "Critical SQL Injection Vulnerability",
    severity: "critical",
    status: "unresolved",
    type: "SAST",
    description: "SQL injection vulnerability found in user authentication module. Allows attackers to execute arbitrary SQL commands.",
    cve: "CVE-2023-1234",
    package: "mysql-connector",
    version: "2.1.0",
    fixedVersion: "2.1.4"
  },
  {
    id: "SNYK-002", 
    title: "Known Vulnerability in lodash",
    severity: "high",
    status: "resolved",
    type: "SCA",
    description: "Prototype pollution vulnerability in lodash library affecting template function.",
    remediation: "Updated lodash from version 4.17.15 to 4.17.21. Implemented input validation and sanitization.",
    cve: "CVE-2021-23337",
    package: "lodash",
    version: "4.17.15",
    fixedVersion: "4.17.21"
  },
  {
    id: "SNYK-003",
    title: "Cross-Site Scripting (XSS) Vulnerability",
    severity: "high", 
    status: "unresolved",
    type: "SAST",
    description: "Reflected XSS vulnerability in search functionality. User input not properly sanitized before rendering.",
    cve: "CVE-2023-5678"
  },
  {
    id: "SNYK-004",
    title: "Outdated React Version",
    severity: "medium",
    status: "found",
    type: "SCA", 
    description: "Using outdated React version with known security vulnerabilities.",
    package: "react",
    version: "16.8.0",
    fixedVersion: "18.2.0"
  },
  {
    id: "SNYK-005",
    title: "Weak Cryptographic Algorithm",
    severity: "medium",
    status: "resolved",
    type: "SAST",
    description: "Usage of MD5 hashing algorithm which is cryptographically broken.",
    remediation: "Replaced MD5 with SHA-256 for password hashing. Updated all existing password hashes."
  },
  {
    id: "SNYK-006",
    title: "Insecure Direct Object Reference",
    severity: "low",
    status: "unresolved",
    type: "SAST",
    description: "User can access other users' data by modifying URL parameters."
  }
];

const Index = () => {
  const { toast } = useToast();
  const [issues] = useState<SecurityIssue[]>(mockIssues);

  const handleAIRemediation = (issueId: string, userInput: string) => {
    toast({
      title: "AI Remediation Requested",
      description: `Processing remediation request for issue ${issueId}. AI analysis in progress...`,
    });
  };

  // Calculate metrics
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;
  const criticalIssues = issues.filter(issue => issue.severity === 'critical').length;
  const highIssues = issues.filter(issue => issue.severity === 'high').length;
  const mediumIssues = issues.filter(issue => issue.severity === 'medium').length;
  const lowIssues = issues.filter(issue => issue.severity === 'low').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/10 to-accent/20">
      <SecurityHeader />
      
      <main className="container mx-auto px-8 py-12 space-y-12">
        <AssetInfo 
          assetId="AST-2024-001" 
          applicationName="Customer Portal Web App"
        />
        
        <TechnicalDebtMetrics
          totalIssues={totalIssues}
          resolvedIssues={resolvedIssues}
          criticalIssues={criticalIssues}
          highIssues={highIssues}
          mediumIssues={mediumIssues}
          lowIssues={lowIssues}
        />
        
        <IssuesTable 
          issues={issues}
          onAIRemediation={handleAIRemediation}
        />
      </main>
      
      <SecurityFooter />
    </div>
  );
};

export default Index;

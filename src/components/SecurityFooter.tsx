import { Shield } from "lucide-react";

export const SecurityFooter = () => {
  return (
    <footer className="bg-gradient-security border-t border-border/50 py-6 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Snyk Auto Remediation Assistant - Powered by AI
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Hackathon Project 2024</span>
            <span>•</span>
            <span>Security Automation</span>
            <span>•</span>
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
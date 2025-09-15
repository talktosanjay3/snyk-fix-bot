import { Shield } from "lucide-react";

export const SecurityFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-white to-secondary/20 border-t border-border/20 py-8 mt-16">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">
                Snyk Auto Remediation Assistant
              </span>
              <div className="text-sm text-muted-foreground">
                Powered by AI • Security Automation
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 text-sm text-muted-foreground font-medium">
            <span className="px-3 py-1 bg-secondary/50 rounded-lg">Hackathon Project 2024</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-lg">AI-Powered</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-lg">Security Focus</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
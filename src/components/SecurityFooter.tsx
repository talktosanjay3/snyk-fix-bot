import { Shield, Sparkles } from "lucide-react";

export const SecurityFooter = () => {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-foreground">
                  Snyk Auto Remediation Assistant
                </span>
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">
                AI-Powered Security Automation Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-gradient-accent text-primary text-xs font-medium rounded-full">
              Hackathon 2024
            </span>
            <span className="px-3 py-1 bg-gradient-accent text-primary text-xs font-medium rounded-full">
              AI-Enhanced
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
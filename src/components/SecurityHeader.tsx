import { Shield, Sparkles, Settings } from "lucide-react";

export const SecurityHeader = () => {
  return (
    <header className="relative bg-gradient-hero border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      <div className="container mx-auto px-6 py-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <div className="relative p-4 bg-white border border-primary/20 rounded-2xl shadow-float">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">
                  Snyk Auto Remediation Assistant
                </h1>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <p className="text-muted-foreground font-medium">
                AI-Powered Security Vulnerability Management Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Company Logo</p>
              <div className="w-24 h-12 bg-white border border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground shadow-sm">
                Logo
              </div>
            </div>
            <button className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
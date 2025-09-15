import { Shield, Settings } from "lucide-react";
import securityBanner from "@/assets/security-banner.jpg";

export const SecurityHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-security border-b border-border">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${securityBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Snyk Auto Remediation Assistant
                </h1>
                <p className="text-muted-foreground mt-1">
                  AI-Powered Security Vulnerability Management
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Company Logo</div>
              <div className="w-24 h-12 bg-muted/20 border-2 border-dashed border-muted/40 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                Logo Space
              </div>
            </div>
            <button className="p-2 hover:bg-muted/20 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
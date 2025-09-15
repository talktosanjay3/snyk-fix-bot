import { Shield, Settings } from "lucide-react";
import securityBanner from "@/assets/security-banner.jpg";

export const SecurityHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-white to-secondary/30 border-b border-border/20 backdrop-blur-sm">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${securityBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-8 py-12 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-sm">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground tracking-tight">
                  Snyk Auto Remediation Assistant
                </h1>
                <p className="text-muted-foreground mt-2 text-lg font-medium">
                  AI-Powered Security Vulnerability Management
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-muted-foreground font-medium mb-2">Company Logo</div>
              <div className="w-28 h-14 bg-gradient-to-br from-secondary to-accent border border-border rounded-xl flex items-center justify-center text-sm text-muted-foreground font-medium shadow-sm">
                Logo Space
              </div>
            </div>
            <button className="p-3 hover:bg-secondary/50 rounded-xl transition-all duration-200 hover:shadow-sm">
              <Settings className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
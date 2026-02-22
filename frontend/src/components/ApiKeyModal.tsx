import { useState } from "react";
import { Copy, Check, Key, X } from "lucide-react";

interface Props {
  apiKey: string;
  onClose: () => void;
}

const ApiKeyModal = ({ apiKey, onClose }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="glass-card glow-border-strong w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            <h2 className="section-title">Your API Key</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Copy this key now. It will <span className="text-destructive font-semibold">never be shown again</span>.
        </p>

        <div className="flex items-center gap-2 bg-muted rounded-md p-3 border border-border">
          <code className="font-mono text-sm text-primary flex-1 break-all select-all">
            {apiKey}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-md hover:bg-accent transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <button onClick={onClose} className="btn-primary w-full mt-5 text-sm">
          I've saved it — close
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;

import React, { useState } from "react";
import { Copy } from "lucide-react";
import PortalToast from "./PortalToast";

const ShortLinkResult = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-4 text-white w-full max-w-md mx-auto">
      <p className="text-sm text-slate-200 mb-2">Your short link</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Link */}
        <div className="flex items-center gap-2 w-full sm:max-w-xs overflow-hidden">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium hover:underline truncate w-full"
          >
            {shortUrl}
          </a>
          <span>🔗</span>
        </div>

        {/* Actions */}
        <div className="flex  gap-2 sm:gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-white text-black rounded-md hover:bg-slate-200 transition text-sm sm:text-base"
          >
            <Copy size={16} /> Copy
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-white text-black rounded-md hover:bg-slate-200 transition text-sm sm:text-base text-center"
          >
            Open
          </a>
        </div>
      </div>

      {/* Toast */}
      {copied && <PortalToast show={copied} message="Link copied to clipboard!" />}
    </div>
  );
};

export default ShortLinkResult;

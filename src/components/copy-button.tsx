'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
      aria-label="Copy to clipboard"
    >
      {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}; 
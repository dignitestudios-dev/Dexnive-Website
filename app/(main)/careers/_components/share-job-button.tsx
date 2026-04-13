"use client";

import { useMemo, useState } from "react";
import { Check, Send, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  path: string;
  title: string;
}

export default function ShareJobButton({ path, title }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => new URL(path, "https://dexnive.com").toString(), [path]);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title,
        text: `Check out this job: ${title}`,
        url: shareUrl,
      });
      return;
    }
    await handleCopy();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Share job"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-[#840ECD]/70 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-white/10 bg-[#080314] text-white">
        <DialogHeader>
          <DialogTitle>Share this job</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send this job or copy its link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleShare}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-[#840ECD]/70 transition-colors"
          >
            <Send className="w-4 h-4" />
            Share via apps
          </button>

          <div className="relative rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <input
              readOnly
              value={shareUrl}
              className="w-full bg-transparent pr-24 text-sm text-gray-200 outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-[#840ECD] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#7C1FFF] transition-colors"
            >
              {copied ? (
                <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
              ) : (
                "Copy"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative ">
          {/* <div className="absolute inset-0 accent-bg rounded-lg blur-xl opacity-50" /> */}
          <Sparkles className="relative h-8 w-8 accent-text" />
        </div>
        <span className="text-2xl font-bold gradient-text">Tourify</span>
      </Link>
    </div>
  );
};

export default Logo;

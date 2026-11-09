import React from 'react';

/** Stylized, illustrative agent trace (not real data): one span circled by hand, human note beside it. */
export default function TraceArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 346"
      role="img"
      aria-label="Stylized agent trace with one span circled in gold and the note: what could it reach?"
      className={className}
      style={{ fontFamily: "var(--font-mono), ui-monospace, Menlo, monospace" }}
    >
        <rect x="0.5" y="0.5" width="559" height="345" rx="14" fill="#11151d" stroke="#212631"/>
        <text x="22" y="32" fontSize="11" fill="#7a899f" letterSpacing="1.5">TRACE  /  AGENT RUN</text>
        <line x1="22" y1="46" x2="538" y2="46" stroke="#212631"/>
        <line x1="210.0" y1="52" x2="210.0" y2="272" stroke="#252b37" strokeDasharray="2 4"/>
        <text x="210.0" y="62" fontSize="9" fill="#7a899f" textAnchor="middle" fillOpacity="0.7">0</text>
        <line x1="292.5" y1="52" x2="292.5" y2="272" stroke="#252b37" strokeDasharray="2 4"/>
        <text x="292.5" y="62" fontSize="9" fill="#7a899f" textAnchor="middle" fillOpacity="0.7">25%</text>
        <line x1="375.0" y1="52" x2="375.0" y2="272" stroke="#252b37" strokeDasharray="2 4"/>
        <text x="375.0" y="62" fontSize="9" fill="#7a899f" textAnchor="middle" fillOpacity="0.7">50%</text>
        <line x1="457.5" y1="52" x2="457.5" y2="272" stroke="#252b37" strokeDasharray="2 4"/>
        <text x="457.5" y="62" fontSize="9" fill="#7a899f" textAnchor="middle" fillOpacity="0.7">75%</text>
        <line x1="540.0" y1="52" x2="540.0" y2="272" stroke="#252b37" strokeDasharray="2 4"/>
        <text x="540.0" y="62" fontSize="9" fill="#7a899f" textAnchor="middle" fillOpacity="0.7">100%</text>
        <text x="22" y="94" fontSize="11" fill="#7a899f">agent.run</text>
        <rect x="210.0" y="82" width="330.0" height="16" rx="3" fill="#4b566c"/>
        <text x="34" y="122" fontSize="11" fill="#7a899f">llm.plan</text>
        <rect x="210.0" y="110" width="52.8" height="16" rx="3" fill="#3b4354"/>
        <text x="34" y="150" fontSize="11" fill="#7a899f">tool.list_extensions</text>
        <rect x="269.4" y="138" width="59.4" height="16" rx="3" fill="#3b4354"/>
        <text x="34" y="178" fontSize="11" fill="#7a899f">tool.install_update</text>
        <rect x="335.4" y="166" width="72.6" height="16" rx="3" fill="#3b4354"/>
        <text x="34" y="206" fontSize="11" fill="#7a899f">llm.review</text>
        <rect x="408.0" y="194" width="39.6" height="16" rx="3" fill="#3b4354"/>
        <text x="34" y="234" fontSize="11" fill="#f7c973">tool.read_ssh_keys</text>
        <rect x="454.2" y="222" width="56.1" height="16" rx="3" fill="#f7c973"/>
        <text x="34" y="262" fontSize="11" fill="#7a899f">tool.http_post</text>
        <rect x="507.0" y="250" width="26.4" height="16" rx="3" fill="#3b4354"/>
        <path d="M428.4 224.6 L430.7 223.2 L433.3 221.9 L436.3 220.5 L439.7 219.3 L443.4 218.1 L447.5 217.0 L452.1 215.9 L457.0 215.0 L462.3 214.3 L467.9 213.7 L473.8 213.3 L479.8 213.1 L485.9 213.1 L491.9 213.3 L497.8 213.7 L503.5 214.3 L508.8 215.0 L513.8 215.9 L518.5 216.9 L522.7 218.0 L526.6 219.2 L530.1 220.5 L533.3 221.8 L536.1 223.2 L538.6 224.7 L540.7 226.2 L542.3 227.8 L543.4 229.4 L543.9 231.1 L543.9 232.8 L543.1 234.4 L541.6 236.1 L539.4 237.7 L536.4 239.2 L532.8 240.6 L528.6 241.9 L523.9 243.0 L518.8 244.0 L513.4 244.8 L507.7 245.5 L501.9 246.0 L496.0 246.3 L490.1 246.6 L484.1 246.7 L478.1 246.7 L472.1 246.6 L466.0 246.3 L460.1 246.0 L454.2 245.4 L448.4 244.8 L442.9 243.9 L437.8 242.9 L433.0 241.7 L428.8 240.4 L425.2 238.9 L422.3 237.3 L420.1 235.7 L418.7 233.9 L417.9 232.2 L417.9 230.4 L418.5 228.7 L419.7 227.0 L421.4 225.4 L423.6 223.8 L426.2 222.2 L429.2 220.8 L432.5 219.3 L436.3 218.0 L440.5 216.7 L445.2 215.5" fill="none" stroke="#f7c973" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M434 277 C456 279 468 268 472 253" fill="none" stroke="#f7c973" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M465 260 L472 252 L480 259" fill="none" stroke="#f7c973" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="246" y="282" fontSize="14" fill="#f7c973" fontStyle="italic">what could it reach?</text>
        <text x="22" y="328" fontSize="9" fill="#7a899f" fillOpacity="0.7" letterSpacing="1.2">ILLUSTRATIVE TRACE</text>
    </svg>
  );
}

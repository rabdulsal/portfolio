"use client";

const ITEMS = [
  "CIO 100 AWARD RECIPIENT",
  "PUBLISHED RESEARCHER",
  "10 YEARS iOS ENGINEERING",
  "SALAAM SOLUTIONS LLC",
  "PENN MEDICINE",
  "PENSKE LOGISTICS",
  "USAA BANKING",
  "TENSORFLOW · COREML · PYTORCH",
  "SWIFTUI · REACT · NODE.JS",
  "AZURE DEVOPS · FASTLANE",
];

export default function CredentialStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden bg-orange py-3 border-y border-orange/20">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs font-medium text-background/90 tracking-widest uppercase px-6 shrink-0 flex items-center gap-6"
          >
            {item}
            <span className="text-background/40 text-[10px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

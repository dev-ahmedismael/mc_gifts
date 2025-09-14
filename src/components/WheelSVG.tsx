"use client";
import { useState } from "react";

const prizes = [
  "جلسة ليزر فراكشنال للوجه",
  "جلسة ليزر كربوني (منطقة من اختيارك)",
  "جلسة ميزو ثيرابي لنضارة الوجه مع ديرمابين",
  "جلسة ليزر تشقير الشعر (منطقة من اختيارك)",
  "جلسة تنظيف عميق للوجه بجهاز الهيدراتاتش أو الهيدراكول",
  "جلسة ليزر (منطقة من اختيارك)",
];

const colors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
];

export default function WheelSVG() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedPrize(null);

    const segments = prizes.length;
    const randomSpin = 360 * 5 + Math.floor(Math.random() * 360);
    const newRotation = rotation + randomSpin;
    setRotation(newRotation);

    setTimeout(() => {
      const segmentAngle = 360 / segments;
      const normalized = ((newRotation % 360) + 360) % 360;
      const pointerAngle = 270; // السهم ثابت لتحت
      const diff = (pointerAngle - normalized + 360) % 360;
      const index = Math.floor(diff / segmentAngle) % segments;
      setSelectedPrize(prizes[index]);
      setSpinning(false);
    }, 4000);
  };

  // تكبير الدايرة
  const radius = 200;
  const cx = 250;
  const cy = 250;
  const segmentAngle = 360 / prizes.length;

  const getSlicePath = (i: number) => {
    const startAngle = (i * segmentAngle * Math.PI) / 180;
    const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (i: number) => {
    const angle = (i + 0.5) * segmentAngle;
    const rad = (angle * Math.PI) / 180;
    const tx = cx + radius * 0.55 * Math.cos(rad);
    const ty = cy + radius * 0.55 * Math.sin(rad);
    return { x: tx, y: ty, angle };
  };

  // تقسيم النص إلى سطرين
  const splitText = (text: string, max = 12) => {
    const words = text.split(" ");
    let lines: string[] = [];
    let current = "";

    words.forEach((w) => {
      if ((current + " " + w).trim().length > max) {
        lines.push(current.trim());
        current = w;
      } else {
        current += " " + w;
      }
    });
    if (current) lines.push(current.trim());
    return lines;
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* العجلة */}
      <svg
        width={500}
        height={500}
        viewBox="0 0 500 500"
        className="transition-transform duration-[4000ms] ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {prizes.map((prize, i) => {
          const path = getSlicePath(i);
          const { x, y, angle } = getTextPosition(i);
          const lines = splitText(prize, 16); // 16 حرف كحد أقصى
          return (
            <g key={i}>
              <path
                d={path}
                fill={colors[i % colors.length]}
                stroke="white"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y - (lines.length - 1) * 8} // نزول النصوص
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${angle}, ${x}, ${y})`}
              >
                {lines.map((line, j) => (
                  <tspan key={j} x={x} dy={j === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      {/* السهم ثابت */}
      <svg
        width={500}
        height={500}
        viewBox="0 0 500 500"
        className="absolute top-0 left-0 pointer-events-none"
      >
        {/* نزول بسيط تحت */}
        <polygon points="240,50 260,50 250,100" fill="black" />
      </svg>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400 mt-4"
      >
        {spinning ? "جاري الدوران..." : "جرب حظك"}
      </button>

      {selectedPrize && (
        <p className="bg-black p-2 text-xl text-white font-bold text-center mt-2">
          🎉 مبروك! فزت بـ:{" "}
          <span className="text-green-700">{selectedPrize}</span>
        </p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

export default function Timer({ duration, onTimeout, resetTrigger }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetTrigger, duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const percent = (timeLeft / duration) * 100;

  return (
    <div className="mb-4">
      <div className="text-sm text-gray-600 mb-1">Time left: {timeLeft}s</div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-red-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

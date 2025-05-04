export default function ProgressBar({ current, total }) {
    const percentage = (current / total) * 100;
  
    return (
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">
          Question {current} of {total}
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
  
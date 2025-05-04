export default function Question({ data, selectedOption, setSelectedOption }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{data.question}</h2>
      <ul className="space-y-3">
        {data.options.map((opt, idx) => (
          <li key={idx}>
            <label className={`flex items-center p-3 rounded-xl border transition ${
              selectedOption === opt
                ? "bg-indigo-100 border-indigo-500"
                : "bg-white border-gray-300"
            }`}>
              <input
                type="radio"
                name="option"
                value={opt}
                className="mr-3 accent-indigo-600"
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

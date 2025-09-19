// components/SecretInput.tsx
import { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export const SecretInput = ({ onChange }: { onChange?: (value: string) => void }) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="flex items-center border rounded px-2 py-1">
      <input
        type={showSecret ? "text" : "password"}
        placeholder="Enter password"
        className="flex-grow outline-none"
      />
      <button
        type="button"
        onClick={() => setShowSecret(!showSecret)}
        className="ml-2 text-gray-600"
      >
        {showSecret ? <RiEyeLine /> : <RiEyeCloseLine />}
      </button>
    </div>
  );
}

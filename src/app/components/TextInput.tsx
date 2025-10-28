// components/TextInput.tsx
export const TextInput = ({ onChange }: { onChange?: (value: string) => void }) => {

  return (
    <div className="flex items-center border rounded px-2 py-1 ">
      <input
        type="text"
        placeholder="Enter the target programming language (e.g. C++)"
        className="flex-grow outline-none"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

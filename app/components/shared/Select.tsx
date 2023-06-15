"use client";

interface SelectProps {
  onChange: (value: any) => void;
  value?: string;
  label?: string;
  options: any[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  onChange,
  value,
  label,
  options,
  placeholder,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium text-gray-900 leading-6">
        {label}
      </label>
      <div className="">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="tone"
          id="tone"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
        >
          {options.map((option, index) => (
            <option key={index} value={option.label} className="text-gray-900 px-4 py-2">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;

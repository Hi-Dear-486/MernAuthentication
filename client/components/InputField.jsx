const InputField = ({ label, type, placeholder, error, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-800 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded bg-transparent text-sm text-gray-800 border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:border-blue-500`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;

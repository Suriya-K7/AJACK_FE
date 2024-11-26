const InputField = ({ label, id, type, placeholder, value, onChange, flag }) => {
    return (
        <div className={flag ? "sm:col-span-3" : "sm:col-span-2 "}>
            <label htmlFor={id} className="block font-medium text-white text-sm/6">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete="given-name"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                />
            </div>
        </div>
    );
};

export default InputField;
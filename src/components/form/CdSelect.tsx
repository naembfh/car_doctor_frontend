export const SelectComponent = ({ label, name, options, register, validation, errors }) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select {...register(name, validation)}>
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && <p>{errors[name]?.message}</p>}
      </div>
    );
  };
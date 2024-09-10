const CdInput = ({ label, name, type, placeHolder, register, validation, errors }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-gray-900 font-semibold block mb-1">{label}</label>
            <input 
                className="border-2 border-gray-400 focus:border-gray-700 focus:text-gray-700 focus:outline-none p-2 mt-1 rounded-md focus:shadow-lg w-full" 
                type={type} 
                name={name} 
                {...register(name, validation)} 
                placeholder={placeHolder} 
            />
            {errors[name] && <p className="text-red-500 mt-1">{errors[name]?.message}</p>}
        </div>
    );
};

export default CdInput;

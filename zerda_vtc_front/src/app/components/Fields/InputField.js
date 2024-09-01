import {React} from '../index';


export function InputField({ field, form, label,type, placeholder }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;

  return (
    <div id="field" className="mb-4 pb-2 w-full flex flex-col">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold font-Nunito mb-2 "
      >
        {label}
      </label>
      <input
        className="shadow appearance-none font-nunito border rounded py-2 px-2 text-gray-700leading-tight focus:outline-none focus:shadow-outline focus:shadow-indigo-900 mb-2"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors[name] && touched[name] && (
        <div className="text-red-500 font-nunito">{errors[name]}</div>
      )}
    </div>
  );
};
import {
  React,
  useState,
  PropTypes,
  getAddressSuggestions
} from "./../index";

export function AddressField ({
    field,
    form,
    label,
    placeholder
}){
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState (field.value || "");

    const fetchSuggestions = async (value)=>{
        if (value.length > 3){
            const response = await getAddressSuggestions(value);
            setSuggestions(response.data.features);
        }else{
            setSuggestions([]);
        }        
    }

    const handleChange= (e)=>{
        const value = e.target.value;
        setInputValue(value);
        form.setFieldValue(field.name, value);
        fetchSuggestions(value);
    }

    const handleSelectSuggestion = (suggestions) => {
      const address = suggestions.properties.label;
      setInputValue(address);
      form.setFieldValue(field.name, address);
      setSuggestions([]);
    };

    return (
      <div className="mb-4 pb-2 w-full flex flex-col">
        <label htmlFor={field.name}>{label}</label>
        <input
          id={field.name}
          name={field.name}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onBlur={field.onBlur}
          className="shadow appearance-none font-nunito border rounded py-2 px-2 text-gray-700leading-tight focus:outline-none focus:shadow-outline focus:shadow-indigo-900 mb-2"
        />
        {form.errors[field.name] && form.touched[field.name] && (
          <div className="text-red-500 font-nunito">
            {form.errors[field.name]}
          </div>
        )}
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.properties.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion.properties.label}
            </li>
          ))}
        </ul>
      </div>
    );

}

AddressField.prototypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
}

// export default AddressField;
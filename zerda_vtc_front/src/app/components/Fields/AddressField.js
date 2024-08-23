import React, {useState} from "react";
import PropTypes from "prop-types";
import {getAddressSuggestions} from "../../api/backend/adressAction";

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
      <div className="form-control">
        <label htmlFor={field.name}>{label}</label>
        <input
          id={field.name}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onBlur={field.onBlur}
        />
        {form.errors[field.name] && form.touched[field.name] && (
          <div className="errors">{form.errors[field.name]}</div>
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
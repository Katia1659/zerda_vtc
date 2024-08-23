import React from 'react';
import PropTypes from 'prop-types';

export function PasswordField({ field, form, label, placeholder }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;

  const passwordCriteria = {
    length: value.length >= 12,
    majuscule: /[A-Z]/.test(value),
    minuscule: /[a-z]/.test(value),
    chiffre: /[0-9]/.test(value),
    specialChar: /[#?!@$%^&*-]/.test(value),
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="password"
        {...field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors[name] && touched[name] && (
        <div style={{ color: "red" }}>{errors[name]}</div>
      )}
      {name === "password" && (
        <div>
          <h4>Le mot de passe doit contenir :</h4>
          <ul>
            <li style={{ color: passwordCriteria.length ? "green" : "red" }}>
              Au moins 12 caractères
            </li>
            <li style={{ color: passwordCriteria.majuscule ? "green" : "red" }}>
              Au moins une majuscule (A-Z)
            </li>
            <li style={{ color: passwordCriteria.minuscule ? "green" : "red" }}>
              Au moins une minuscule (a-z)
            </li>
            <li style={{ color: passwordCriteria.chiffre ? "green" : "red" }}>
              Un chiffre (0-9)
            </li>
            <li
              style={{ color: passwordCriteria.specialChar ? "green" : "red" }}
            >
              Un caractère spécial (#?!@$%^&*-)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

PasswordField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};



// export default PasswordField;
import {
  React, InputField, PasswordField, Field
} from "../index"


export function StepOne({formik}) {
  return (
    <div>
      <div className="flex gap-4">
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder=" YourEmail@mail.com  "
          component={InputField}
        />
        <Field
          label="Numéro de Téléphone"
          type="tel"
          name="phone"
          placeholder=" 06 51 00 00 00 "
          component={InputField}
        />
      </div>

      <div className="flex gap-4">
        <Field
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="Mot de passe"
          component={PasswordField}
        />
        <Field
          label="Confirme password"
          type="password"
          name="confirmPassword"
          placeholder="confirmer votre mot de passe "
          component={PasswordField}
        />
      </div>
    </div>
  );
};
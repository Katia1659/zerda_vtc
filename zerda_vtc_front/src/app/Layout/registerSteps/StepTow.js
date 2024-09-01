import {
  React,
  InputField,
  Field,
  AddressField
} from "../index";

export function StepTow({formik}) {
  return (
    <div className=" flex flex-col">
      <div className="flex gap-4">
        <Field
          label="Nom"
          type="text"
          name="name"
          placeholder="Joen"
          component={InputField}
        />
        <Field
          label="Prénom"
          type="text"
          name="lastName"
          placeholder="Doe"
          component={InputField}
        />
      </div>
      <div className="flex gap-4">
        <Field
          label="Date de naissance"
          type="date"
          name="birthday"
          component={InputField}
        />
        <Field
          label="Address"
          type="text"
          name="address"
          placeholder=" 12 rue de la liberté 7500 Paris"
          component={AddressField}
        />
      </div>
    </div>
  );
};
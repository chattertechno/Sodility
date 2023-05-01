"use client";

import {
  CheckBox,
  Input,
  // RadioButtons,
  // Select,
  Textarea,
} from "./index";

type FormControlType = {
  control: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  options?: any[];
  subHeader?: string;
};

// ================================
// FORMIK CONTROL COMPONENT =======
// ================================
const FormControl = ({
  control,
  label,
  type,
  name,
  placeholder,
  options,
  subHeader,
}: FormControlType) => {
  switch (control) {
    case "input":
      return (
        <Input
          label={label}
          type={type!}
          name={name}
          placeholder={placeholder!}
          subHeader={subHeader}
        />
      );
    case "checkbox":
      return (
        <CheckBox
          label={label}
          type={type!}
          name={name}
          placeholder={placeholder!}
          subHeader={subHeader}
        />
      );

    case "textarea":
      return (
        <Textarea
          label={label}
          name={name}
          placeholder={placeholder!}
          subHeader={subHeader}
        />
      );

    // case "select":
    //   return <Select label={label} name={name} options={options!} />;

    // case "radio":
    //   return <RadioButtons label={label} name={name} options={options!} />;

    // case "datepicker":
    //   return <DatePicker label={label} name={name} />;

    // case "upload":
    //   return <Upload label={label} placeholder={placeholder!} name={name} />;

    default:
      return null;
  }
};

// EXPORT ====================
export default FormControl;

"use client";

import Select from "./controls/Select";
import {
  CheckBox,
  Input,
  // RadioButtons,
  // Select,
  Textarea,
} from "./index";

type FormControlType = {
  control?: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  options?: any[];
  onChange?: any;
  value?: string;
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
  onChange,
  value,
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
          onChange={onChange}
          value={value}
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

    case "select": return <Select label={label} name={name} options={["a"]} />;

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

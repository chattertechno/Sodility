import { ReactNode } from "react";

export type DatePickerProps = {
  label?: string;
  name: string;
};

export type FieldProps = {
  field: {
    name: string;
    onBlur: () => void;
    onChange: () => void;
    value: Date;
  };

  form: {
    setFieldValue: (name: string, value: Date | null) => Date;
  };
};

export type UploadProps = {
  label?: string;
  name: string;
  placeholder: string;
};

export type SelectProps = {
  label?: string;
  options: any[];
  name: string;
};

export type RadioButtonsProps = {
  label?: string;
  options: any[];
  name: string;
  dynamicRadio?: boolean;
  dynamicText?: string;
};

export type TextAreaProps = {
  label?: string;
  name: string;
  placeholder: string;
  subHeader?: string;
};

export type CheckBoxProps = {
  label?: string;
  type: string;
  name: string;
  placeholder: string;
  icon?: ReactNode;
  subHeader?: string;
};

export type InputProps = {
  label?: string;
  type: string;
  name: string;
  onChange: any
  value: string | undefined;
  placeholder: string;
  icon?: ReactNode;
  subHeader?: string;
};

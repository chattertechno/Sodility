import { ErrorMessage, Field } from "formik";
import ErrorText from "./ErrorText";
import { SelectProps } from "./aaa.types";

const animation = "transition duration-300 easeInOut";

const Select = ({ label, name, options }: SelectProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <label htmlFor={name} className={"capitalize mb-1 text-grape"}>
        {label}:
      </label>
      <Field
        as="select"
        className={`p-2 flex-1 bg-ban text-grapelight border border-gray-300 hover:border-grape ${animation} rounded focus:outline-grapelight placeholder:text-sm placeholder:text-grapeshade`}
        name={name}
      >
        {options!.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name}>{ErrorText}</ErrorMessage>
    </div>
  );
};

export default Select;

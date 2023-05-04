"use client"
import { ErrorMessage, Field } from "formik";
import ErrorText from "./ErrorText";
import { SelectProps } from "./aaa.types";

const animation = "transition duration-300 easeInOut";
const category = [{
  key: "writers-and-journalists",
  value: "Writers & Journalists"
},
{
  key: "gaming-creators",
  value: "Gaming Creators"
},
{
  key: "video-creators",
  value: "Video Creators"
},
{
  key: "musicians",
  value: "Musicians"
},
{
  key: "visual-artists",
  value: "Visual Artists"
},
{
  key: "communities",
  value: "Communities"
},
{
  key: "podcasters",
  value: "Podcasters"
},
{
  key: "tutorials-and-education",
  value: "Tutorials & Education"
},
{
  key: "Local Business",
  value: "local-business"
},
{
  key: "non-profits",
  value: "Non-Profits"
}


]
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
        <option value="">
            Select Category
        </option>
        {category?.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name}>{ErrorText}</ErrorMessage>
    </div>
  );
};

export default Select;

// import { ErrorMessage, Field } from "formik";
// import ErrorText from "./ErrorText";

// import DateView from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { DatePickerProps, FieldProps } from "./aaa.types";

// const animation = "transition duration-300 easeInOut";

// const DatePicker = ({ label, name }: DatePickerProps) => {
//   return (
//     <div className="flex-1 flex flex-col">
//       <label htmlFor={name} className={"capitalize text-grape"}>
//         {label}:
//       </label>
//       <Field name={name}>
//         {({ form, field }: FieldProps) => {
//           const { setFieldValue } = form;
//           const { value } = field;

//           // @ts-ignore
//           return (
//             <DateView
//               id={name}
//               onBlur={field.onBlur}
//               name={field.name}
//               className={`mt-1 p-2 w-full flex-1 bg-ban border border-gray-300 hover:border-grape ${animation} rounded focus:outline-grapelight placeholder:text-sm placeholder:text-grapeshade`}
//               selected={value}
//               onChange={
//                 (val) => JSON.parse(JSON.stringify(setFieldValue(name, val)))
//                 // TODO: Warning:(29, 43) Void function return value is used
//               }
//               placeholderText="Select a date"
//             />
//           );
//         }}
//       </Field>
//       <ErrorMessage name={name} children={ErrorText} />
//     </div>
//   );
// };

// export default DatePicker;

import { P1, SubH2 } from "@/components/typography";
import { ErrorMessage, Field } from "formik";
import ErrorText from "./ErrorText";
import { CheckBoxProps } from "./aaa.types";

const animation = "transition duration-300 easeInOut";

const CheckBox = ({
  label,
  type,
  name,
  placeholder,
  icon,
  subHeader,
}: CheckBoxProps) => {
  return (
    <div className="flex flex-1 items-center gap-3">
      

      <div className="flex gap-3 items-center ">
        {/* relative*/}
        {/*{icon && <span className=" z-10 absolute left-3">{icon}</span>}*/}
        <Field
          className={`${
            icon && "pl-10"
          } p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary ${animation} rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade`}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      <div className="flex item-baseline justify-between">
        {label && <P1 className="capitalize text-secondary">{label}</P1>}
        {subHeader && <SubH2 className="text-appGray-500 pr-3">{subHeader}</SubH2>}
      </div>

      <ErrorMessage name={name}>{ErrorText}</ErrorMessage>
    </div>
  );
};

export default CheckBox;

import Image from "next/image";
import { ErrorMessage, Field } from "formik";

import ErrorText from "./ErrorText";
import { UploadProps } from "./aaa.types";

import uploadIcon from "../../../assets/Upload icon.svg";

const Upload = ({ label, name, placeholder }: UploadProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name} className={"capitalize mb-1 text-grape"}>
        {label}
      </label>

      <div className="flex gap-3 items-center relative border border-dashed border-grapelight rounded p-3 pl-4">
        <Image src={uploadIcon} alt={"upload icon"} />

        <Field
          className={`flex-1 file:bg-transparent file:text-grape file:border-none file:h-[80px] file:w-[40%] file:text-start`}
          type="file"
          name={name}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage name={name}>{ErrorText}</ErrorMessage>
    </div>
  );
};

export default Upload;

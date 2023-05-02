"use client";
import dynamic from "next/dynamic";

// rich text editor
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(editor => editor.Editor),
  {
    loading: () => <p>Loading...</p>,
  }
);

import { ErrorMessage, Field, FieldProps } from "formik";
import ErrorText from "./ErrorText";
import { TextAreaProps } from "./aaa.types";

import { P1, SubH2 } from "@/components/typography";

const animation = "transition duration-300 easeInOut";

const TextArea = ({ label, name, placeholder, subHeader }: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex item-baseline justify-between">
        <P1 className="capitalize text-secondary mb-1">{label}:</P1>
        {subHeader && (
          <SubH2 className="text-appGray-500 pr-3">{subHeader}</SubH2>
        )}
      </div>

      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <Editor
              editorState={value}
              toolbarClassName="border-0 rounded-md"
              wrapperClassName="border border-appGray-450 rounded-md"
              editorClassName="h-32 overflow-x-hidden leading-0 border-t border-t-appGray-450"
              onEditorStateChange={(val: any) =>
                JSON.parse(JSON.stringify(setFieldValue(name, val)))
              }
              placeholder={placeholder}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name}>{ErrorText}</ErrorMessage>
    </div>
  );
};

export default TextArea;

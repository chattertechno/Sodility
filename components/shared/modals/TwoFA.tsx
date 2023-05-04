"use client"
import { H4, P1, SubH2 } from "@/components/typography";
import Button from "../Button";
import QRCode from 'qrcode.react'

// ASSETS ===========================================
import qrCode from "@/assets/qr.png";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { PostVarifyOTPApi, getGenerateUrlApi } from "../../../http/securityApi";
import { getLocaleData } from "@/service/localStorageService";
import { closeModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";

const TwoFA = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = getLocaleData("token") as any
    setIsLoading(true)
    getGenerateUrlApi(token).then((data: any) => {
      if(!data) {
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setData(data);
      }
    })
  }, [])
  if(isLoading) return <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> loading </div>
  if(!data) return <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> Something went wrong </div>
  return (
    <>
        {step === 1 && (
      <div className="flex flex-col md:flex-row items-center gap-6">
          
            {/* image - qr  */}
            <div>
              {/* <Image src={qrCode} alt="qr code" width={150} height={150} /> */}
              <QRCode value={data?.otpauth_url} />
              <SubH2 className="text-center mt-2">
                Secret: <span className="text-primary">{data?.otp_secret}</span>
              </SubH2>
            </div>
            {/* text  */}
            <div className="flex-1 space-y-2">
              <H4>Setup two-factor authentication</H4>
              <P1>
                Using the authenticator app on your device, scan the code to the
                left or enter the secret to get set-up.
              </P1>
              <Button className="!mt-8" action={() => setStep(2)}>
                Continue
              </Button>
            </div>
          
      </div>
        )}
      {step === 2 && (
        <>
          <div>
            <VerificationForm />
          </div>
        </>
      )}
    </>
  );
};

export default TwoFA;

const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required("Verification code is required"),
    }),
    onSubmit: (values:any) => {
      const token = getLocaleData("token")
      if(values?.code?.length<6) alert("all field must be fill");
      PostVarifyOTPApi(token, {token:values?.code?.join("")}).then(()=>{
        dispatch(closeModal())
      })
      // alert(values?.code)
    },
  });

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <input
          key={i}
          type="number"
          maxLength={1}
          name={`code[${i}]`}
          onChange={formik.handleChange}
          value={formik.values.code[i] || ""}
          className="border-b-2 border-appGray-450 text-center w-10 focus:border-primary focus:outline-none h-14"
        />
      );
    }
    return inputs;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <H4 className="text-center">
        Enter the code in your 2FA application to continue
      </H4>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-2">{renderInputs()}</div>
        {formik.touched.code && formik.errors.code ? (
          <div className="error">{formik.errors.code}</div>
        ) : null}
        <Button className="!mt-8" type="submit" action={formik.handleSubmit}>
          Verify
        </Button>
      </div>
    </form>
  );
};

import { ReactNode } from "react";

// Redux
import { closeModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";

const Modal = ({ children,closeCall=false }: { children: ReactNode ,closeCall?:boolean}) => {
  const route =  useRouter()
  const dispatch = useAppDispatch();

  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full flex">
      <div className="absolute h-screen w-full backdrop-blur-sm bg-white/40" />
      <div className="shadow-appShadow-sm p-5 md:w-[50%] min:w-fit mx-6 md:mx-auto h-fit mt-[10vh] bg-white z-10 rounded-md overflow-y-auto max-h-[80vh]">
        {/* close button  */}
        <div className="flex justify-end">
          <button
            className="focus:outline-none"
            onClick={() => {
              if(closeCall) route.push("/login")
              dispatch(closeModal()
              )}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-appGray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

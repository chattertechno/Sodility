"use client"
import { Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";

// COMPONENTS
import { FormControl } from "@/components/form";
import { H5, P1 } from "@/components/typography";
import Button from "../Button";

// ASSETS
import publishIcon from "@/assets/add-post.svg";
import audioIcon from "@/assets/audio.png";
import globeIcon from "@/assets/globe.png";
import imageIcon from "@/assets/image.svg";
import lockIcon from "@/assets/lock-white.svg";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";
import { FaAngleDown } from "react-icons/fa";
import { DropDown } from "..";
import { AddContentApi } from "../../../http/contentApi";
import { getLocaleData } from "../../../service/localStorageService";
import { useAppDispatch } from "@/context/hooks";
import { closeModal } from "../../../context/features/modal/modalSlice";

// =============================================
// ADD POST MODAL COMPONENT ====================
// =============================================
const AddPost = () => {
  const dispatch = useAppDispatch();
  const postType = ["video", "audio", "image", "text"];
  const [selectedPostType, setSelectedPostType] = useState("video");
  const [isLoading, setLoading] = useState(false)

  const lockedFor = [
    "All donators",
    "Supporters and above",
    "Fans and above",
    "Super Fans",
  ];

  const [selectedLockedFor, setSelectedLockedFor] = useState("All donators");
  const [showDropDown, setShowDropDown] = useState(false);

  const initialValues = {
    title: "",
    // video: "",
    // audio: "",
    // image: "",
    ipfs_url:"",
    body: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    ipfs_url: Yup.string(),
    // video: Yup.string(),
    // audio: Yup.string(),
    // image: Yup.string(),
    body: Yup.string(),
  });
  

  const handleSubmit = (values: any) => {
    setLoading(true)
    let body ="";
    let type = "";
    if(values.body){
      console.log(values)
      const parsBody = JSON.parse(values.body)
      body = parsBody.blocks[0].text
    }
    // return
    if(selectedPostType=="video") type="mp4"
    else if(selectedPostType=="audio") type="mp3"
    else if(selectedPostType=="image") type="jpg"
    const token = getLocaleData("token")
    let data = {
      title:values.title,
      ipfs_url:values.ipfs_url,
      body,
      type,
      content_type: selectedLockedFor,
      currency_type:"USD"
    }
    if(token)
    AddContentApi(token,data).then((data)=>{
      if(data){
        setLoading(false)
        dispatch( closeModal())
      }else{
        setLoading(false)
        dispatch(closeModal())
      }
    })
  };
  if(isLoading) return <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> loading </div>
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="pb-5">
          <H5>Add a New Post</H5>
          <div className="mt-4">
            <FormControl
              control="input"
              label="Title"
              name="title"
              type="text"
              placeholder="Placeholder"
              subHeader="100 characters"
            />
          </div>
          <div className="mt-4">
            <FormControl
              control="select"
              label="Category"
              name="category_name"
              options={["a","b"]}
            />
          </div>
          {/* buttons  */}
          <div className="my-8 flex flex-col md:flex-row gap-3">
            {postType.map(type => (
              <Button
                key={type}
                action={() => {
                  setSelectedPostType(type);
                }}
                variant={selectedPostType === type ? "primary" : "secondary"}
                className="capitalize flex gap-2 items-center"
              >
                <Icon type={type} />
                <span>{type}</span>
              </Button>
            ))}
          </div>
          {/* form fields  */}
          <div className="">
            {selectedPostType === "video" && (
              <FormControl
                control="input"
                label="Video URL"
                name="ipfs_url"
                type="text"
                placeholder="https://odysee.com/@JulianC:9/juliansquarantineday1:9"
                subHeader="Embed supported from: Odysee, Youtube, Vimeo"
              />
            )}
            {selectedPostType === "audio" && (
              <FormControl
                control="input"
                label="Audio URL"
                name="ipfs_url"
                type="text"
                placeholder="https://soundcloud.com/heryptohow/olga-feldmeir-and-robert-wieko-smartvalorcom"
                subHeader="Embed supported from: Buzzsprout, Soundcloud"
              />
            )}
            {selectedPostType === "image" && (
              <FormControl
                control="input"
                label="Image URL"
                name="ipfs_url"
                type="text"
                placeholder="Placeholder"
                subHeader="Embed supported from: ..."
              />
            )}
            {selectedPostType === "text" && (
              <FormControl
                control="textarea"
                label="Content"
                name="body"
                type="text"
                placeholder="Start typing..."
                subHeader="500 characters remaining"
              />
            )}
          </div>
          {/* form actions  */}
          <div className="mt-8 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-baseline">
            {/* visibility  */}
            <div className="">
              <P1 className="text-secondary">Visibility</P1>
              <div className="flex gap-3 mt-1 items-center">
                <Button
                  action={() => {}}
                  variant="secondary"
                  className="!text-gray-400 !border-gray-400 flex gap-2 items-center"
                >
                  <Image
                    src={globeIcon}
                    alt="globe icon"
                    width={10}
                    height={10}
                  />
                  <span>Public</span>
                </Button>
                <div className="relative">
                  <Button
                    action={() => {
                      setShowDropDown(!showDropDown);
                    }}
                    className="flex gap-2 items-center"
                  >
                    <Image
                      src={lockIcon}
                      alt="lock icon"
                      width={10}
                      height={10}
                    />
                    <span>Locked to {selectedLockedFor}</span>
                    <FaAngleDown
                      className={`${
                        showDropDown && "rotate-180"
                      } transition duration-300`}
                    />
                  </Button>
                  {/* dropdown  */}
                  {showDropDown && (
                    <DropDown
                      parentPositionAndPadding="top-12 left-0 p-5 !w-60"
                      arrowPosition="-top-2 right-8"
                    >
                      <ul className="py-2 pt-5 bg-white relative flex flex-col gap-2">
                        {lockedFor.map((item, index) => (
                          <li
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedLockedFor(item);
                              setShowDropDown(false);
                            }}
                          >
                            <P1>{item}</P1>
                          </li>
                        ))}
                      </ul>
                    </DropDown>
                  )}
                </div>
              </div>
            </div>
            {/* publish */}
            <Button
              type="submit"
              action={() => {}}
              className="!px-16 py-2.5 mt-auto flex gap-2 items-center w-full md:w-fit justify-center "
            >
              <Image
                src={publishIcon}
                alt="publish icon"
                width={12}
                height={12}
              />
              <span>Publish</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPost;

// EXTENDED COMPONENTS =================================
const Icon = ({ type }: { type: string }) => {
  return (
    <>
      {type === "video" && (
        <Image src={videoIcon} alt="video icon" width={10} height={10} />
      )}{" "}
      {type === "audio" && (
        <Image src={audioIcon} alt="audio icon" width={10} height={10} />
      )}{" "}
      {type === "image" && (
        <Image src={imageIcon} alt="image icon" width={10} height={10} />
      )}{" "}
      {type === "text" && (
        <Image src={textIcon} alt="text icon" width={10} height={10} />
      )}
    </>
  );
};

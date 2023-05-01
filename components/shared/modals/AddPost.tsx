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

// =============================================
// ADD POST MODAL COMPONENT ====================
// =============================================
const AddPost = () => {
  const postType = ["video", "audio", "image", "text"];
  const [selectedPostType, setSelectedPostType] = useState("video");

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
    video: "",
    audio: "",
    image: "",
    content: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    video: Yup.string(),
    audio: Yup.string(),
    image: Yup.string(),
    content: Yup.string(),
  });

  const handleSubmit = (values: any) => {
    console.log(values,"valuesvalues")
  };

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
                name="video"
                type="text"
                placeholder="https://odysee.com/@JulianC:9/juliansquarantineday1:9"
                subHeader="Embed supported from: Odysee, Youtube, Vimeo"
              />
            )}
            {selectedPostType === "audio" && (
              <FormControl
                control="input"
                label="Audio URL"
                name="audio"
                type="text"
                placeholder="https://soundcloud.com/heryptohow/olga-feldmeir-and-robert-wieko-smartvalorcom"
                subHeader="Embed supported from: Buzzsprout, Soundcloud"
              />
            )}
            {selectedPostType === "image" && (
              <FormControl
                control="input"
                label="Image URL"
                name="image"
                type="text"
                placeholder="Placeholder"
                subHeader="Embed supported from: ..."
              />
            )}
            {selectedPostType === "text" && (
              <FormControl
                control="textarea"
                label="Content"
                name="content"
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

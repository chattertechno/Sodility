"use client";

import { useAppSelector } from "@/context/hooks";
import { AddPost, ConnectDashPay, Donate, Modal, TwoFA } from "../shared";

const AppModal = () => {
  const { showModal, name } = useAppSelector(state => state.modal);

  return (
    <>
      {showModal && (
        <Modal>
          {name === "connectDashPay" && <ConnectDashPay />}
          {name === "addPost" && <AddPost />}
          {name === "donate" && <Donate />}
          {name === "2FA" && <TwoFA />}
        </Modal>
      )}
    </>
  );
};

export default AppModal;

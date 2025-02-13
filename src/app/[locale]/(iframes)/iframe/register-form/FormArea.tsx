"use client";
import React, { useState } from "react";
import { RegisterForm } from "@/containers/ContainerHomePage/RegisterForm";
import { Modal } from "@/components/Atoms/Modal";

export const FormArea = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      {/* {t("title")} */}
      <RegisterForm />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="mx-auto flex h-[80%] w-[80%] items-center rounded-md bg-white p-4 lg:h-1/2 lg:w-1/2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex et
            dolorem saepe necessitatibus harum minima non magnam qui eius cum,
            laudantium aliquam! Adipisci libero omnis dolor delectus numquam
            reiciendis?
          </p>
        </div>
      </Modal>
      <button onClick={() => setIsOpenModal(true)}>Open modal</button>
    </>
  );
};

"use client";
import React, { useState } from "react";
import { RegisterForm } from "@/containers/ContainerHomePage/RegisterForm";
import { Modal } from "@/components/Atoms/Modal";

export const FormArea = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModal2, setIsOpenModal2] = useState<boolean>(false);

  return (
    <div className="py-[100px]">
      {/* {t("title")} */}
      <RegisterForm />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="p-6">
          <div className="flex max-w-[500px] items-center rounded bg-white p-4 pt-14">
            <div className="">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                ex et dolorem saepe necessitatibus harum minima non magnam qui
                eius cum, laudantium aliquam! Adipisci libero omnis dolor
                delectus numquam reiciendis?
              </p>
              <button
                onClick={() => setIsOpenModal2(true)}
                className="rounded bg-blue-400 px-4 py-4"
              >
                Open modal
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpenModal={isOpenModal2}
        setIsOpenModal={setIsOpenModal2}
        hasCancelAbortAlert
      >
        <div className="p-6">
          <div className="flex max-w-[500px] items-center rounded bg-white p-4 pt-14">
            <div className="mb-4">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, iusto.
              </p>
            </div>
          </div>
        </div>
      </Modal>
      <div className="my-4 flex items-center justify-center">
        <button
          className="mx-auto rounded bg-blue-400 px-4 py-4"
          onClick={() => setIsOpenModal(true)}
        >
          Open modal 1
        </button>
      </div>
    </div>
  );
};

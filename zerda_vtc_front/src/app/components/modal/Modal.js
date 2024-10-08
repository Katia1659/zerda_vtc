// import React from "react";
// import {
//     Dialog,
//     DialogBackdrop,
//     DialogPanel,
//     DialogTitle,
// } from "@headlessui/react";
// import {Button} from "../buttons/Bottons";

import {
  React,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Button
} from "../index"

export  function Modal({ isOpen, onClose, title, message,cancelText, confirmText, onConfirm, onCancel, icon, children }) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {icon && (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {icon}
                      </div>
                    )}

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h2"
                        className="text-center  font-bold font-Nunito leading-6 text-gray-900 mb-4"
                      >
                        {title}
                      </DialogTitle>
                      {children}
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button type="button" onClick={onConfirm} variant="secondary">
                    {confirmText || "Confirm"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => (onCancel ? onCancel() : onClose())}
                  >
                    {cancelText || "Cancel"}
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </DialogBackdrop>
      </Dialog>
    );
}
"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} 
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

/* eslint-disable @next/next/no-img-element */
import { EMarkerIcon } from "@/types/enums";
import Image from "next/image";
import React from "react";
import { Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const ModalHelp: React.FC<Props> = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leyenda</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-between text-center">
        <div>
          <img width={50} src={EMarkerIcon.DRINKER} alt="bebedero" />
          <p>Bebedero</p>
        </div>
        <div>
          <img width={50} src={EMarkerIcon.FEEDER} alt="comedero" />
          <p>Comedero</p>
        </div>
        <div>
          <img width={50} src={EMarkerIcon.HUNTING_POSITION} alt="puesto" />
          <p>Puesto de montería</p>
        </div>
        <div>
          <img width={50} src={EMarkerIcon.DEFAULT} alt="default" />
          <p>Por defecto</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { EMarkerType } from "@/types/enums";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  latlng: number[];
};

export const ModalForm: React.FC<Props> = ({
  showModal,
  setShowModal,
  latlng,
}) => {
  useEffect(() => {
    console.log(latlng);
  }, [latlng]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setShowModal(false);
  };

  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Datos del marcador</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del marcador"
              {...register("name", { required: true })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del marcador"
              {...register("description", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Tipo de marcador</Form.Label>
            <Form.Select {...register("type", { required: true })}>
              <option value={EMarkerType.FEEDER}>Comedero</option>
              <option value={EMarkerType.DRINKER}>Bebedero</option>
              <option value={EMarkerType.HUNTING_POSITION}>
                Puesto de montería
              </option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-between">
            <Button
              className="border border-danger text-danger bg-transparent mx-4"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-success border-0">
              Confirmar
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

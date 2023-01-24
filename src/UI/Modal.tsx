import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import IOnClose from "../interfaces/IOnClose";
import "./Modal.css"

const Backdrop = (props: IOnClose) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props: PropsWithChildren<IOnClose>) => {
  return (
    <div className="modal">
      <div>{props.children}</div>
    </div>
  );
};

const overlayElement = document.getElementById("overlays");

const Modal = (props: PropsWithChildren<IOnClose>) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        overlayElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement!
      )}
    </div>
  );
};

export default Modal;

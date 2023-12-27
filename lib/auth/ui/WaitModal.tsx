import {
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay
} from "@chakra-ui/react";
import { WaitListScreen } from "./WaitListScreen";

export const WaitModal = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <WaitListScreen onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

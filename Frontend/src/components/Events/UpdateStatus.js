import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import ProjectService from "../../services/project.service";

const UpdateStatus = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [statusSelected, setStatusSelected] = useState();
    let count = props.count;
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });

    useEffect(() => {
        setStatusSelected(props.projectStatus.trim());
    }, [props.projectStatus]);

    function handleSubmit() {
        ProjectService.updateProjectStatus(props.projectId, statusSelected)
            .then((updatedProject) => props.updateParent(updatedProject))
            .then(onClose);
    }

    function handleClose() {
        onClose();
        setStatusSelected(props.projectStatus.trim());
    }

    function createRadioButtons() {
        let statusOptions = [
            "Design Pending",
            "Preliminary Design Ongoing",
            "Preliminary Design Complete",
            "Awaiting Customer Approval",
            "Detailed Design Pending",
            "Detailed Design Ongoing",
            "Design Complete",
            "Project Complete",
            "Project Cancelled",
        ];

        return statusOptions.map((status) => (
            <Radio key={count++} value={status}>
                {status}
            </Radio>
        ));
    }

    return (
        <div key={count++}>
            <Button
                width="full"
                size={projectBreakpoint}
                m={2}
                border="2px"
                color="brand.background"
                bg="brand.grey"
                borderColor="brand.pink"
                _hover={{ bg: "brand.pink", borderColor: "brand.grey" }}
                onClick={onOpen}
            >
                Update Status
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please select a status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RadioGroup
                            w="100%"
                            size="lg"
                            colorScheme="red"
                            value={statusSelected}
                            onChange={setStatusSelected}
                        >
                            <VStack
                                spacing="1rem"
                                align="left"
                                textAlign={"right"}
                            >
                                {createRadioButtons()}
                            </VStack>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateStatus;

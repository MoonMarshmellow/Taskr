import React, { useEffect, useRef, useState } from "react";
import { Task } from "../types/types";
import {
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSolidPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

type TaskCardProps = {
  task: Task;
  onCompleteTask: (task: Task) => void;
  onEditTask: (task: Task, text: string) => void;
  onDeleteTask: (task: Task) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key == "Enter") {
      if (text) {
        onEditTask(task, text);
      } else {
        onEditTask(task, task.body);
      }
      setEdit(false);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (edit) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <>
      <Flex
        width="100%"
        bgColor="brand.500"
        p={3.5}
        fontSize="16px"
        fontWeight="bold"
        borderRadius="full"
        onClick={() => {
          onCompleteTask(task);
        }}
        cursor="pointer"
        color="white"
        transition={"all .1s ease"}
        _hover={{
          transform: "scale(1.03)",
        }}
        align="center"
      >
        {!edit ? (
          <Text ml="11px">{task.body}</Text>
        ) : (
          <Input
            onClick={(event) => event.stopPropagation()}
            variant="unstyled"
            ml="11px"
            fontWeight={700}
            defaultValue={task.body}
            onKeyDown={(e) => handleKeyPress(e)}
            onChange={onTextChange}
            ref={inputRef}
          />
        )}

        <Spacer />
        <Icon
          as={BiSolidPencil}
          transition={"all .1s ease"}
          _hover={{
            transform: "scale(1.3)",
          }}
          onClick={(event) => {
            event?.stopPropagation();
            setEdit(!edit);
          }}
        />
        <Icon
          as={BsFillTrashFill}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          transition={"all .1s ease"}
          _hover={{
            transform: "scale(1.3)",
          }}
          ml={2}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            textAlign="center"
            justifyContent="center"
            bgColor="brand.200"
            color="white"
          >
            <ModalHeader>Delete Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              This is not the same as completing a task. To complete a task
              click on it.
            </ModalBody>

            <ModalFooter justifyContent="center">
              <Button
                bgColor="brand.200"
                color="white"
                _hover={{ bgColor: "gray.200", color: "gray.800" }}
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                bgColor="red.500"
                onClick={() => {
                  onDeleteTask(task);
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
export default TaskCard;

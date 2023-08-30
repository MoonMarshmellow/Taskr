import React, { useState } from "react";
import { Task } from "../types/types";
import {
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidPencil } from "react-icons/bi";

type TaskCardProps = {
  task: Task;
  onCompleteTask: (task: Task) => void;
  onEditTask: (task: Task, text: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onCompleteTask,
  onEditTask,
}) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key == "Enter") {
      onEditTask(task, text);
      setEdit(false);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

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
        // transition={"all .25s ease"}
        // _hover={{
        //   transform: "scale(1.03)",
        // }}
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
          />
        )}

        <Spacer />
        <Menu>
          <MenuButton
            bgColor="none"
            color="brand.100"
            fontWeight={700}
            onClick={(event) => event?.stopPropagation()}
            alignItems="center"
          >
            <Icon as={GiHamburgerMenu} fontWeight={700}></Icon>
          </MenuButton>
          <MenuList
            bgColor="brand.200"
            border="1px"
            borderColor="#3B3D3D"
            width="200px"
          >
            <MenuItem
              icon={<BiSolidPencil />}
              bgColor="brand.200"
              _hover={{ bgColor: "#3B3D3D" }}
              onClick={(event) => {
                event?.stopPropagation();
                setEdit(!edit);
              }}
            >
              Edit
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};
export default TaskCard;

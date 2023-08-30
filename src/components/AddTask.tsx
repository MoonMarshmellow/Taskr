import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type AddTaskProps = {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
};

const AddTask: React.FC<AddTaskProps> = ({ text, onChange, onAddTask }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key == "Enter") {
      onAddTask();
    }
  };
  return (
    <>
      <Flex
        bgColor="brand.300"
        width="100%"
        p={2}
        borderRadius="full"
        boxShadow="custom"
        mt={10}
        transition={"all .25s ease"}
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "0px 5px 40px 10px rgba(56, 204, 204, 0.4)",
        }}
      >
        <Input
          name="task"
          value={text}
          onChange={onChange}
          onKeyDown={(e) => handleKeyPress(e)}
          variant="unstyled"
          pl={4}
          color="brand.200"
          fontWeight={700}
          placeholder="Add a task"
          _placeholder={{ opacity: 0.6, color: "brand.200" }}
        />
        <Button
          onClick={onAddTask}
          borderRadius="full"
          fontSize="20px"
          width="20px"
          color="black"
          _hover={{ bgColor: "brand.100" }}
        >
          <Icon as={AiOutlinePlus} />
        </Button>
      </Flex>
    </>
  );
};
export default AddTask;

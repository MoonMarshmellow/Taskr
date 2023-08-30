import { Text, Flex } from "@chakra-ui/react";
import TasksApp from "./components/TasksApp";

function App() {
  return (
    <>
      <Flex justify="center" width="100%" height="100%">
        <Flex
          justify="center"
          align="center"
          width={{ sm: "70%", lg: "50%", base: "70%" }}
          //border="2px"
          //borderColor="red"
          direction="column"
        >
          <Flex direction="column" alignItems="center">
            <Text
              bgGradient="linear(to-r, brand.300, brand.500)"
              bgClip="text"
              fontSize="100px"
              fontWeight={700}
              mb="-10px"
              //borderColor="green"
              //border="2px"
            >
              Taskr
            </Text>
            <Text color="white" fontSize="25px" align="center">
              A simple way to manage your tasks
            </Text>
          </Flex>
          <TasksApp />
        </Flex>
      </Flex>
    </>
  );
}

export default App;

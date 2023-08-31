import React, { useEffect, useState } from "react";
import { Task } from "../types/types";
import AddTask from "./AddTask";
import { v4 } from "uuid";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const TasksApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fetchedTasks = JSON.parse(localStorage.getItem("tasks") as string);
    if (fetchedTasks) {
      if (fetchedTasks.length > 0) {
        setTasks(fetchedTasks);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onAddTask = () => {
    if (text === "") {
      return;
    }
    setTasks((prev) => [
      ...prev,
      {
        body: text,
        id: v4(),
        completed: false,
      },
    ]);
    setText("");
  };

  const onCompleteTask = (task: Task) => {
    const updatedTasks = tasks.map((item) =>
      item === task ? { ...item, completed: !item.completed } : { ...item }
    );
    //console.log(updatedTasks);
    setTasks(updatedTasks as Task[]);
  };

  const onEditTask = (task: Task, text: string) => {
    const updatedTasks = tasks.map((item) =>
      item === task ? { ...item, body: text } : { ...item }
    );
    //console.log(updatedTasks);
    setTasks(updatedTasks as Task[]);
  };

  const onDeleteTask = (task: Task) => {
    //delete task
    const updatedTasks = tasks.filter((item) => item !== task);
    //console.log(updatedTasks);
    setTasks(updatedTasks as Task[]);
  };

  return (
    <>
      <AddTask text={text} onChange={onTextChange} onAddTask={onAddTask} />
      <Stack direction="column" spacing="20px" width="100%" mt="50px">
        {tasks.map(
          (task) =>
            !task.completed && (
              <TaskCard
                task={task}
                onCompleteTask={onCompleteTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                key={task.id}
              />
            )
        )}
      </Stack>
      {tasks.length !== 0 && (
        <Flex
          color="white"
          width="100%"
          marginTop={5}
          align="center"
          onClick={() => {
            setHidden(!hidden);
          }}
          cursor="pointer"
        >
          {hidden ? (
            <Icon mr="2px" as={BsChevronRight} />
          ) : (
            <Icon mr="2px" as={BsChevronDown} />
          )}
          Completed Tasks
        </Flex>
      )}
      {tasks.length == 0 && (
        <Flex color="white" direction="column" align="center" justify="center">
          <Text fontSize={30} fontWeight={700}>
            No tasks yet
          </Text>
          <Text>Add a task to get started</Text>
        </Flex>
      )}
      {!hidden && (
        <Stack direction="column" spacing="20px" width="100%" mt="20px">
          {tasks.map(
            (task) =>
              task.completed && (
                <TaskCard
                  task={task}
                  onCompleteTask={onCompleteTask}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                  key={task.id}
                />
              )
          )}
        </Stack>
      )}
    </>
  );
};
export default TasksApp;

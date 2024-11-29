/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { Task } from "../index";
import useUiToast from "../hooks/useUiToast.ts";

const TodoPage = () => {
  const api = useFetch();
  const toast = useUiToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTask, setEditedTasks] = useState<Record<number, string>>({});
  const [taskStatus, setTaskStatus] = useState<Record<number, boolean>>({});

  const handleFetchTasks = async () => {
    setTasks(await api.get("/tasks"));
    setEditedTasks({});
  };

  const handleDelete = async (id: number) => {
    //
    await api.delete(`/tasks/${id}`);
    handleFetchTasks();
    toast.error(<>Task deleted</>);
  };

  const handleSave = async (task: Task, update: boolean) => {
    //
    const taskText =
      editedTask[task.id as number] != null
        ? editedTask[task.id as number]
        : task.name;
    await api.post("/tasks", { id: task.id, name: taskText });
    handleFetchTasks();
    update
      ? toast.success(<>Task successfully updated</>)
      : toast.success(<>Task successfully created</>);
  };

  const handleTaskText = (id: number, text: string) => {
    setEditedTasks((prev) => ({ ...prev, [id]: text }));
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => {
          const taskText =
            editedTask[task.id as number] != null
              ? editedTask[task.id as number]
              : task.name;

          return (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              gap={1}
              width="100%"
              key={task.id}
            >
              <TextField
                size="small"
                value={taskText}
                onChange={(e) =>
                  handleTaskText(task.id as number, e.target.value)
                }
                fullWidth
                sx={{ maxWidth: 350 }}
              />
              <Box>
                <IconButton
                  color="success"
                  onClick={() => {
                    handleSave(task, true);
                  }}
                >
                  <Check />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDelete(task.id as number);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              handleSave(
                {
                  name: "New task",
                  status: false,
                },
                false
              );
            }}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;

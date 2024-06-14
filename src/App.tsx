import {AppBar,Container,Stack,Toolbar,Typography,TextField,Button} from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { getTodos, saveTodos } from "./utils/features.ts";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id : string) : void => {
    const newTodos : TodoItemType[] = todos.map((i) => {
      if(i.id === id) i.isCompleted = !i.isCompleted;
      return i;
  })
   setTodos(newTodos);
  }

   
  const deleteHandler = (id:string) : void => {
    const newTodos : TodoItemType[] = todos.filter((i) => i.id!= id);
    setTodos(newTodos)
  }

  const editHandler = (
    id: string,
    newTitle: string
  ): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });

    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

 const removeHandler = () : void => {
  const leftTodos : TodoItemType[] = todos.filter((i) => i.isCompleted != true);
  setTodos(leftTodos)  
 }

 const hasSelectedTasks = (): boolean => {
  return todos.some((i) => i.isCompleted);
};

  useEffect(() => {saveTodos(todos)}, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "full" }}>
      <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography>What are you up to ?</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
      <Button variant="contained" onClick={submitHandler}  disabled={title === ""} sx={{marginTop : "1rem", width : "40%"}}>
        ADD
      </Button>
      <Button disabled={!hasSelectedTasks()} variant="contained" onClick={removeHandler} sx={{marginTop : "1rem", width :"40%"}}>
        Remove Selected
      </Button> 
      </div>
      
    </Container>
  );
};

export default App;
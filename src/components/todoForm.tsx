import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Todo } from "@/db";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CloseIcon } from "./icons/close";

interface updateTodo {
  tittle: string;
  description: string;
  id: number;
}
interface TodoFormProp {
  addTodo: (todo: Todo) => void;
  mode: "update" | "create";
  todoToUpdate: Todo | null;
  numberOfTodos: number;
  updateTodo: (todo: updateTodo) => void;
}

function toggleFormContainer() {
  let formContainer = document.getElementById("todoFormContainer");
  formContainer?.classList.toggle("hidden");
}
const TodoForm = ({
  mode,
  numberOfTodos,
  addTodo,
  updateTodo,
  todoToUpdate,
}: TodoFormProp) => {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (todoToUpdate?.tittle) {
      setTittle(todoToUpdate?.tittle);
    }
    if (todoToUpdate?.description) {
      setDescription(todoToUpdate?.description);
    }
  }, [mode, todoToUpdate]);
  let date = new Date();
  return (
    <Card className="w-65 relative">
      <div className="absolute translate-x-55 translate-y-[-50%]">
        <button onClick={toggleFormContainer}>{CloseIcon}</button>
      </div>
      <CardHeader>create new Todo</CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let newTodo: Todo;
            if (mode === "create") {
              let index = numberOfTodos - 1;
              newTodo = {
                tittle: tittle,
                completed: false,
                description: description,
                id: index,
                createdAt: date,
                userId: index,
              };
              addTodo(newTodo);
            } else {
              console.log("he");
              if (todoToUpdate) {
                let id = todoToUpdate.id;
                updateTodo({ tittle, description, id });
                toggleFormContainer();
              }
            }
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label>tittle</Label>
              <Input
                type="text"
                value={mode === "update" ? tittle : ""}
                required
                onChange={(e) => {
                  setTittle(e.target.value);
                }}
              ></Input>
            </div>
            <div className="grid gap-3">
              <Label>descrition</Label>
              <Textarea
                value={mode === "update" ? description : ""}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Textarea>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Add Todo
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;

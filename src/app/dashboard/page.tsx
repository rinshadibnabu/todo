"use client";
import { doneIcon } from "@/components/icons/done";
import { editIcon } from "@/components/icons/edit";
import { pendingIcon } from "@/components/icons/hourGlass";
import { Trash } from "@/components/icons/trash";
import TodoForm from "@/components/todoForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewTodo, Todo } from "@/db";
import { useState } from "react";
const date = new Date();

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 0,
      tittle: "go to gym",
      completed: false,
      description: "it been several days",
      createdAt: date,
      userId: 123,
    },
    {
      id: 1,
      tittle: "go to gym",
      completed: false,
      description: "it been several days",
      createdAt: date,
      userId: 123,
    },
    {
      id: 2,
      tittle: "go to gym",
      completed: false,
      description: "it been several days",
      createdAt: date,
      userId: 123,
    },
    {
      id: 3,
      tittle: "go to gym",
      completed: false,
      description: "it been several days",
      createdAt: date,
      userId: 123,
    },
    {
      id: 4,
      tittle: "go to gym",
      completed: false,
      description: "it been several days",
      createdAt: date,
      userId: 123,
    },
  ]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [formMode, setFormMode] = useState<"update" | "create">("create");
  function deleteTodo(id: number) {
    const todoId = id;
    if (!(todoId < 0)) {
      setTodos(todos.filter((_, index) => index !== todoId));
    }
  }

  function addTodo(newTodo: Todo): void | null {
    setTodos([...todos, newTodo]);
  }

  function toggleDone(id: number) {
    const todoId = id;
    setTodos((previousState) => {
      return previousState.map((todo, index) => {
        if (index === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
    let staus = confirm(
      "do you want to delete completed todo, it will deleted after one day if you didn't  complete in speciefied time",
    );
    if (staus) {
      deleteTodo(id);
    }
  }
  interface updateTodo {
    tittle: string;
    description: string;
    id: number;
  }
  function updateTodo({ tittle, description, id }: updateTodo): void {
    const todoId = id;
    console.log(tittle, description, id);
    setTodos((previousState) => {
      return previousState.map((todo, index) => {
        if (index === todoId) {
          return { ...todo, description: description, tittle: tittle };
        }
        return todo;
      });
    });
  }

  return (
    <div>
      <nav>
        <div className="p-3 border">My todo</div>
      </nav>
      <section id="main-content" className="relative h-dvh p-3">
        <div className="">add shity todo you never ever complete</div>

        <div className="todo-container justify-start grid grid-cols-7 gap-5">
          {todos.map((t, ix) => {
            return (
              <Card>
                <CardContent className="relative">
                  <div className="flex  justify-end fixed top-26">
                    <Button
                      size={"sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        let todoFormContainer =
                          document.getElementById("todoFormContainer");
                        let id: null | number =
                          e.currentTarget?.parentElement?.nextSibling.id;
                        if (id) {
                          setCurrentTodo(todos[id]);
                        }
                        setFormMode("update");
                        todoFormContainer?.classList.toggle("hidden");
                      }}
                    >
                      {editIcon}
                    </Button>
                  </div>
                  <div
                    className=" flex flex-col gap-6"
                    key={`${ix}`}
                    id={`${ix}`}
                  >
                    <h3>{t.tittle}</h3>
                    <p>{t.description}</p>
                    <div className="flex justify-around">
                      <Button onClick={() => deleteTodo(ix)}>{Trash}</Button>
                      <Button onClick={() => toggleDone(ix)}>
                        {!t.completed ? pendingIcon : doneIcon}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="m-3 flex justify-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              let todoFormContainer =
                document.getElementById("todoFormContainer");

              setFormMode("create");
              todoFormContainer?.classList.toggle("hidden");
            }}
          >
            add new todo
          </Button>
        </div>
        <section
          id="todoFormContainer"
          className="hidden z-10 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-black/60"
        >
          <div className="">
            <TodoForm
              updateTodo={updateTodo}
              numberOfTodos={todos.length}
              mode={formMode}
              addTodo={addTodo}
              todoToUpdate={formMode === "update" ? currentTodo : null}
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;

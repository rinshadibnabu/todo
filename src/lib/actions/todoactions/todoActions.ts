"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, todos, Todo, NewTodo } from "@/db";

export async function getTodos(userId: number): Promise<Todo[] | null> {
  try {
    const todo = await db.select().from(todos).where(eq(todos.userId, userId));

    return todo;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function createTodo(
  todo: NewTodo,
  userId: number,
): Promise<number | null> {
  try {
    const newTodo: Todo[] | null = await db
      .insert(todos)
      .values(todo)
      .returning();

    if (!newTodo) {
      throw "db erorr ";
    }

    return newTodo[0].id;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getTodoById(id: number): Promise<Todo | null> {
  try {
    const todo = await db.select().from(todos).where(eq(todos.id, id));
    return todo[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateTodo(
  id: number,
  updateTodoData: Partial<Todo>,
): Promise<Todo | null> {
  try {
    const todo = await db
      .update(todos)
      .set(updateTodoData)
      .where(eq(todos.id, id));
    return todo[0];
  } catch (e) {
    return null;
  }
}

export async function toggleCompletion(id: number): Promise<string | null> {
  try {
    const todo = await db
      .update(todos)
      .set({ completed: !todos.completed })
      .where(eq(todos.id, id));
    return "updated";
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteTodo(id: number): Promise<string | null> {
  try {
    const todo = await db.delete(todos).where(eq(todos.id, id));
    return "deleted";
  } catch (e) {
    console.log(e);
    return null;
  }
}

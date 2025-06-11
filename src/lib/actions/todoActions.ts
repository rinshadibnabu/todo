"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/db";
import { todos } from "@/db/schema";

export const getTodo(id:string){

}

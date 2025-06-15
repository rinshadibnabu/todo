// Make sure to install the 'postgres' package
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users } from "./schema";

const queryClient = postgres(process.env.DB_URL || "");
export const db = drizzle({ client: queryClient, schema: { todos, users } });

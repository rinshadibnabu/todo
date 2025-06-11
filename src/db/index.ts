// Make sure to install the 'postgres' package
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DB_URL || "");
const db = drizzle({ client: queryClient });

export default db;

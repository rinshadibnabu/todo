import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name: string) => `todoapp_${name}`);

export const todos = createTable("todo", (d) => ({
  id: d.integer().primaryKey().generatedAlwaysAsIdentity(),
  tittle: d.varchar({ length: 255 }).notNull(),
  completed: d.boolean().default(false).notNull(),
  createdAt: d.timestamp().defaultNow().notNull(),
  description: d.text(),
  userId: d
    .integer()
    .notNull()
    .references(() => users.id),
}));

export const users = createTable("user", (d) => ({
  id: d.integer().primaryKey().generatedAlwaysAsIdentity(),
  email: d.varchar({ length: 255 }).notNull(),
  name: d.varchar({ length: 255 }),
  password: d.varchar({ length: 255 }).notNull(),
}));
export const userRelation = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));

import { db, NewUser, User, users } from "@/db";
import { eq } from "drizzle-orm";

export async function getUserById(userId: number): Promise<User | null> {
  try {
    const user: User | null = db
      .select()
      .from(users)
      .where(eq(users.id, userId));
  } catch (error) {
    return null;
  }
}

export async function createNewUser(
  newUserPayload: NewUser,
): Promise<User | null> {
  try {
    const newUser = await db.insert(users).values(newUserPayload).returning();
    return newUser[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}

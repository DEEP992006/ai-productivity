import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { UserSchema } from "./features/auth/userSchema";

// Auth Configuration

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  callbacks: {
    
    // JWT Callback
    async jwt({ token, user, profile }) {
      if (user && profile) {
        token.id = profile.id;
        token.email = user.email;
      }

      return token;
    },

    
    // Session Callback
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }

      const checkuser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(session.user.id)));

      if (checkuser.length === 0) {
        const newuser: UserSchema[] = await db
          .insert(usersTable)
          .values({
            id: Number(session.user.id),
            name: session.user.name || "",
            email: session.user.email,
          })
          .returning();
      }

      return session;
    },
  },
});

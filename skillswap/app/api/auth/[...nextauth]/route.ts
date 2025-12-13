// app/api/auth/[...nextauth]/route.ts
import { nextAuthHandler } from "@/services/auth/nextAuth";

export { nextAuthHandler as GET, nextAuthHandler as POST };

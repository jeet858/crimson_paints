import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcryptjs";
const registerUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  user_type: z.string(),
  phone: z.number(),
});

const prisma = new PrismaClient();

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, email, password, user_type, phone } =
    registerUserSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user !== null) {
    return res.send({ user: null, message: "User already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      id: id,
      phone: phone,
      name: name,
      email: email,
      password: hashedPassword,
      user_type: user_type,
    },
  });
  return res.send({ user: newUser, message: "User created succesfully" });
}

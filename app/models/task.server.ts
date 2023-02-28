import type { User, Task } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Task } from "@prisma/client";

export const getTaskById = prisma.task.findUnique;

export function getTask({
  id,
  userId,
}: Pick<Task, "id"> & {
  userId: User["id"];
}) {
  return prisma.task.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getTaskListItems({ userId }: { userId: User["id"] }) {
  return prisma.task.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getTaskList({ userId }: { userId: User["id"] }) {
  return prisma.task.findMany({
    where: { userId },
    select: { id: true, title: true, body: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getTaskAssignedToUser({ id }: { id: User["id"] }) {
  return prisma.task.findMany({
    where: { assigned: { some: { id } } },
  });
}

export const createTask = prisma.task.create;

// export function createTask({
//   body,
//   title,
//   createdById,
// }: Pick<Task, "body" | "title" | > & {
//   createdById: User["id"];
// }) {
//   return prisma.task.create({
//     data: {
//       title,
//       body,
//       createdBy: { connect: { id: createdById } },
//     },
//   });
// }

export function deleteTask({
  id,
  userId,
}: Pick<Task, "id"> & { userId: User["id"] }) {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
}

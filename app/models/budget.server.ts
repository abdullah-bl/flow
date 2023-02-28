import type { User, Budget } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Budget } from "@prisma/client";

// export function getNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & {
//   userId: User["id"];
// }) {
//   return prisma.note.findFirst({
//     select: { id: true, body: true, title: true },
//     where: { id, userId },
//   });
// }

export const getBudget = prisma.budget.findFirst;

export const getBudgetList = ({ year, items }: { year: number, items: boolean }) => {
  return prisma.budget.findMany({
    where: { year },
    include: { item: items },
  });
}

export const getBudgetWithItems = ({ year }: { year: number }) => {
  return prisma.budget.findMany({
    where: { year },
    include: {
      item: true
    },
    orderBy: {
      cash: 'asc'
    }
  });
}

// export const getBudget = prisma.budget.findFirst;
// export const getBudgetByUnique = prisma.budget.findUnique;
// export const createBudget = prisma.budget.create;
// export const updateBudget = prisma.budget.update;
// export const deleteBudget = prisma.budget.delete;
// export const deleteBudgetByUnique = prisma.budget.deleteMany;
// export const deleteManyBudgets = prisma.budget.deleteMany;


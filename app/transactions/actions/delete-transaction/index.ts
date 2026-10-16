"use server";

import { db } from "@/app/lib/prisma";
import { deleteTransactionSchema, DeleteTransactionSchemaType } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchemaType) => {
  deleteTransactionSchema.parse({ transactionId });

  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
};

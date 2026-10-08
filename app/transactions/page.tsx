import { db } from "../lib/prisma";
import { DataTable } from "../components/ui/data-table";
import { transactionColumns } from "./columns";
import AddTransactionButton from "../components/add-transaction-button";
import Navbar from "../components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Transactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default Transactions;

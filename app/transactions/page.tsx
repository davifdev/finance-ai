import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { db } from "../lib/prisma";
import { DataTable } from "../components/ui/data-table";
import { transactionColumns } from "./columns";

const Transactions = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default Transactions;

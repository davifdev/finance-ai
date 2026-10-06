"use client";

import { Transaction } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./components/type-badge";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
  },
];

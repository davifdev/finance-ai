"use client";

import { Transaction } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./components/type-badge";
import {
  TRANSACTION_CATEGORY,
  TRANSACTION_PAYMENT_METHOD,
} from "@/app/constants";
import { Button } from "@/app/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

const TRANSACTION_CATEGORY_LABELS = {
  [TRANSACTION_CATEGORY.EDUCATION]: "Educação",
  [TRANSACTION_CATEGORY.ENTERTAINMENT]: "Entreterimento",
  [TRANSACTION_CATEGORY.FOOD]: "Alimentação",
  [TRANSACTION_CATEGORY.HEALTH]: "Saúde",
  [TRANSACTION_CATEGORY.HOUSING]: "Moradia",
  [TRANSACTION_CATEGORY.OTHER]: "Outros",
  [TRANSACTION_CATEGORY.SALARY]: "Salary",
  [TRANSACTION_CATEGORY.TRANSPORTATION]: "Transporte",
  [TRANSACTION_CATEGORY.UTILITY]: "Utilidades",
};

const TRANSACTION_PAYMENT_METHOD_LABELS = {
  [TRANSACTION_PAYMENT_METHOD.BANK_TRANSFER]: "Transferência bancária",
  [TRANSACTION_PAYMENT_METHOD.BANK_SLIP]: "Boleto Bancário",
  [TRANSACTION_PAYMENT_METHOD.CASH]: "Dinheiro",
  [TRANSACTION_PAYMENT_METHOD.CREDIT_CARD]: "Cartão de Crédito",
  [TRANSACTION_PAYMENT_METHOD.DEBIT_CARD]: "Cartão de Débito",
  [TRANSACTION_PAYMENT_METHOD.OTHER]: "Outros",
  [TRANSACTION_PAYMENT_METHOD.PIX]: "Pix",
};

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
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];

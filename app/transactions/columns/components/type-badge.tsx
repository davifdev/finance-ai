import { Badge } from "@/app/components/ui/badge";
import { TRANSACTION_TYPE } from "@/app/constants";
import { Transaction } from "@/app/generated/prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TRANSACTION_TYPE.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Ganhos
      </Badge>
    );
  }

  if (transaction.type === TRANSACTION_TYPE.EXPENSE) {
    return (
      <Badge className="font-bold text-danger bg-[#f6352b3b] hover:bg-[#f6352b3b]">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Gastos
      </Badge>
    );
  }

  if (transaction.type === TRANSACTION_TYPE.INVESTMENT) {
    return (
      <Badge className="bg-muted font-bold text-chart-1 hover:bg-muted">
        <CircleIcon className="mr-2 fill-chart-1 size={10}" />
        Investimentos
      </Badge>
    );
  }
};

export default TransactionTypeBadge;

"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
            disabled={!userCanAddTransaction}
          >
            Adicionar Transação
            <ArrowDownUpIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!userCanAddTransaction
            ? "Você atingiu o limite de transações. Atualize o seu plano para criar transações ilimitadas."
            : "Adicionar transação"}
        </TooltipContent>
      </Tooltip>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;

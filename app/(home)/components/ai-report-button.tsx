"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAIReport } from "../actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AIReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AIReportButton = ({ month, hasPremiumPlan }: AIReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAIReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          Relatório IA <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            {" "}
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white text-white max-h-[450px]">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar os relatórios com
                IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIReportButton;

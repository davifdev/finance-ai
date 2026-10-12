import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar";
import SummaryCards from "./components/summary-cards";
import TimeSelect from "./components/time-select";
import { isMatch } from "date-fns";
import { getDashboard } from "../data/get-dashboard";
import TransactionsPieChart from "./components/transactions-pie-chart";
import ExpensesPerCategory from "./components/expenses-per-category";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  console.log(month);
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("/?month=01");
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="flex flex-col gap-6">
          <SummaryCards month={month} {...dashboard} />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <h2 className="items-center flex pt-1 px-4 justify-center">
      Subscription Page
    </h2>
  );
};

export default Subscription;

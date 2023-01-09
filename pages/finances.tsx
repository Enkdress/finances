import { CreateCategoryForm, CreateExpenseForm } from "@/components/forms";
import { Button } from "@/components/ui";
import { Transition } from "@headlessui/react";
import { Session } from "@supabase/supabase-js";
import { getServerSession } from "lib/supabase/helper";
import { getMyExpenses } from "lib/supabase/queries";
import { formatDistanceToNow } from "date-fns";
import clsx from "classnames";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const response = await getServerSession(ctx);
  if (response?.error) return response.session;

  const { data } = await getMyExpenses(response.session as Session);

  return { props: { expenses: data } };
};

const Finances: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ expenses }) => {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const onAddExpenseClick = () => {
    setIsAddingCategory(false);
    setIsAddingExpense(!isAddingExpense);
  };

  const onAddCategoryClick = () => {
    setIsAddingCategory(!isAddingCategory);
    setIsAddingExpense(false);
  };

  return (
    <>
      <section className="w-4/5 md:w-8/12 mx-auto">
        <div className="pt-5">
          <h1 className="text-lg text-center md:text-left md:text-3xl mb-5 font-semibold">
            Manage Your Finances
          </h1>
          <div className="flex justify-center md:justify-end gap-3">
            <Button onClick={onAddExpenseClick} variant="primary">
              Add a expense
            </Button>
            <Button onClick={onAddCategoryClick} variant="label">
              Create categories
            </Button>
          </div>
        </div>
        <Transition
          show={isAddingExpense}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 -translate-y-20"
          enterTo="opacity-100 translate-y-0"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 translate-y-10"
          leaveTo="opacity-0 -translate-y-20"
        >
          <CreateExpenseForm onClose={() => setIsAddingExpense(false)} />
        </Transition>
        <Transition
          show={isAddingCategory}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 -translate-y-20"
          enterTo="opacity-100 translate-y-0"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 translate-y-10"
          leaveTo="opacity-0 -translate-y-20"
        >
          <CreateCategoryForm onClose={() => setIsAddingCategory(false)} />
        </Transition>
        <div className="mt-10">
          <table className="w-full">
            <thead>
              <tr>
                <td className="px-2">Name</td>
                <td className="px-2">Category</td>
                <td className="px-2">Price</td>
                <td className="px-2">Date</td>
              </tr>
            </thead>
            <tbody className="text-xs">
              {expenses.map((expense, idx) => (
                <tr
                  key={expense.id}
                  className={clsx(idx % 2 !== 0 ? "bg-slate-800" : "")}
                >
                  <td className="p-2 capitalize">{expense.name}</td>
                  <td className="p-2 capitalize">
                    {(expense?.category as { name: string }).name}
                  </td>
                  <td className="p-2 capitalize">$ {expense.price}</td>
                  <td className="p-2 capitalize">
                    {formatDistanceToNow(new Date(expense.created_at!))} ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Finances;

import { Button, Input, Select, SelectOption } from "@/components/ui";
import { useSession } from "@supabase/auth-helpers-react";
import { Database } from "lib/models.types";
import { insertExpense } from "lib/supabase/mutations";
import { getMyCategories } from "lib/supabase/queries";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";

interface ExpenseFormProps {
  onClose: () => void;
}

const CreateExpenseForm: FunctionComponent<ExpenseFormProps> = ({
  onClose,
}) => {
  const session = useSession();
  const [categories, setCategories] = useState<unknown[]>();

  // Form DataInputs
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !categoryId || !price || !session) {
      return;
    }

    toast.promise(insertExpense({ name, categoryId, price }, session), {
      loading: (
        <span className="flex gap-2">
          <LoaderIcon className="animate-spin w-4 h-4" />
          Loading...
        </span>
      ),
      success: "Congrats 🎉, expense added",
      error: (err) => `This just happened: ${err}`,
    });
    onClose();
  };

  useEffect(() => {
    const getCategories = async () => {
      if (session) {
        const { data } = await getMyCategories(session);
        setCategories(data);
      }
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex py-5 relative mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-8/12 mx-auto flex flex-col gap-5"
      >
        <Input
          name="name"
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <p>
          Category
          <Select
            options={categories as SelectOption[]}
            onOptionChange={(categoryId) => setCategoryId(categoryId)}
          />
        </p>
        <Input
          name="price"
          type="number"
          label="Price"
          value={price}
          onChange={({ target }) => setPrice(Number(target.value))}
        />
        <div className="flex gap-2 grow w-full">
          <Button type="submit" className="w-1/2 md:w-full" variant="primary">
            Create
          </Button>
          <Button className="w-1/2 md:w-auto" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpenseForm;

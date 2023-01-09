import { FormEvent, FunctionComponent, useState } from "react";
import { Button, Input } from "@/components/ui";
import { useSession } from "@supabase/auth-helpers-react";
import { insertCategory } from "lib/supabase/mutations";
import toast, { LoaderIcon } from "react-hot-toast";

interface CategoryFormProps {
  onClose: () => void;
}

const CreateCategoryForm: FunctionComponent<CategoryFormProps> = ({
  onClose,
}) => {
  const [name, setName] = useState("");
  const session = useSession();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !session) {
      return;
    }

    toast.promise(insertCategory({ name }, session), {
      loading: <span className="flex gap-2">Loading...</span>,
      success: "Congrats 🎉, category added",
      error: (err) => `This just happened: ${err}`,
    });
    onClose();
  };

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

export default CreateCategoryForm;

import { Session } from "@supabase/supabase-js";
import { supabase } from ".";

export const insertExpense = async (
  values: {
    name: string;
    categoryId: number;
    price: number;
  },
  session: Session
) => {
  const { error } = await supabase.from("expenses").insert({
    category_id: values.categoryId,
    name: values.name.toLowerCase(),
    price: values.price,
    profile_id: session.user.id,
  });

  if (error) {
    Promise.reject(error.message);
  }
};

export const insertCategory = async (
  values: { name: string },
  session: Session
) => {
  const { error } = await supabase.from("category").insert({
    name: values.name.toLowerCase(),
    profile_id: session.user.id,
  });

  if (error) {
    Promise.reject(error.message);
  }
};

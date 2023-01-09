import { Session } from "@supabase/supabase-js";
import { supabase } from ".";

export const getMyExpenses = async (session: Session) => {
  const userId = session.user.id;

  const { data, error } = await supabase
    .from("expenses")
    .select("*, category(*)")
    .eq("profile_id", userId);

  if (error) {
    throw new Error(`Code: ${error.code}\nMessage: ${error.message}\n`);
  }

  return {
    data,
  };
};

export const getMyCategories = async (session: Session) => {
  const userId = session.user.id;

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("profile_id", userId);

  if (error) {
    throw new Error(`Code: ${error.code}\nMessage: ${error.message}\n`);
  }

  return {
    data,
  };
};

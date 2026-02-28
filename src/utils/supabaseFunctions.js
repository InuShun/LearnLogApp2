import{ supabase } from "../utils/supabaseClient";

export const getAllRecords = async () => {
  const records = await supabase.from('study-record').select('*');
  return records.data;
};

export const addRecords = async (title, time) => {
  await supabase.from('study-record').insert({ title, time })
}

export const deleteRecords = async (id) => {
  await supabase.from('study-record').delete().eq("id", id)
}
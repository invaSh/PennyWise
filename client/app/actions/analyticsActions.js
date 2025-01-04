import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getBalance(){
  return fetchWrapper.get("analytics/balance");
}   

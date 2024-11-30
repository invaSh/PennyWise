import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getExpenses(){
    return fetchWrapper.get("expenses");
}   
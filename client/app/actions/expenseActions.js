import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getExpenses(){
    return fetchWrapper.get("expenses");
}   

export async function createExpense(body){
    return fetchWrapper.post("expenses", body);
}
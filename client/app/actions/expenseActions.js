import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getExpenses(){
    return fetchWrapper.get("expenses");
}   

export async function createExpense(body){
    return fetchWrapper.post("expenses", body);
}

export async function getExpense(id){
    return fetchWrapper.get(`expenses/${id}`);
}

export async function updateExpense(id, body){
    return fetchWrapper.put(`expenses/${id}`, body);
}

export async function deleteExpense(id){
    return fetchWrapper.del(`expenses/${id}`);
}

export async function getMonthlyExpenses(){
    return fetchWrapper.get("expenses/monthly");
}
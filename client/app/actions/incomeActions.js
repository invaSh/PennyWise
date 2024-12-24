import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getIncomes(){
    return fetchWrapper.get("income");
}   

export async function creteIncome(body){
    return fetchWrapper.post("income", body);
}

export async function getIncome(id){
    return fetchWrapper.get(`income/${id}`);
}

export async function updateIncome(id, body){
    return fetchWrapper.put(`income/${id}`, body);
}

export async function deleteIncome(id){
    return fetchWrapper.del(`income/${id}`);
}

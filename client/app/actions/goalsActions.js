import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getGoals(){
    return fetchWrapper.get("goals");
}   

export async function createGoal(body){
    return fetchWrapper.post("goals", body);
}

export async function getGoal(id){
    return fetchWrapper.get(`goals/${id}`);
}

export async function updateStatus(id, body){
    return fetchWrapper.put(`goals/status/${id}`, body);
}

export async function deleteGoal(id){
    return fetchWrapper.del(`goals/${id}`);
}

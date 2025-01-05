import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getBalance(){
  return fetchWrapper.get("analytics/balance");
}   

export async function getMonthlyExpenses(){
  return fetchWrapper.get("analytics/monthly");
}

export async function getBudgetPercentage(){
  return fetchWrapper.get("analytics/budget");
} 

export async function getYearlyExpenses(){
  return fetchWrapper.get("analytics/yearly");
}
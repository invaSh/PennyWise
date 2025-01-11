import { fetchWrapper } from '@/lib/fetchWrapper';

export async function getExpenses() {
  return fetchWrapper.get('expenses');
}

export async function getWeeklyExpenses() {
  return fetchWrapper.get('expenses/weekly');
}

export async function createExpense(body) {
  return fetchWrapper.post('expenses', body);
}

export async function getExpense(id) {
  return fetchWrapper.get(`expenses/${id}`);
}

export async function updateExpense(id, body) {
  return fetchWrapper.put(`expenses/${id}`, body);
}

export async function deleteExpense(id) {
  return fetchWrapper.del(`expenses/${id}`);
}

export async function getPaginatedExpenses(page) {
  const allEx = await fetchWrapper.get('expenses');
  const pageSize = 5;
  const pageNumber = page || 1;
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedExpenses = allEx.slice(startIndex, startIndex + pageSize);

  return {
    paginatedExpenses,
    totalPages: Math.ceil(allEx.length / pageSize),
    currentPage: pageNumber,
  };
}

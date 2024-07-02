document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseName = document.getElementById('expense-name');
  const expenseAmount = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
          const row = document.createElement('tr');

          row.innerHTML = `
              <td>${expense.name}</td>
              <td>$${expense.amount}</td>
              <td class="actions">
                  <button class="edit" data-index="${index}">Edit</button>
                  <button class="delete" data-index="${index}">Delete</button>
              </td>
          `;
          expenseList.appendChild(row);
      });
  }

  function addExpense(name, amount) {
      expenses.push({ name, amount });
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
  }

  function updateExpense(index, name, amount) {
      expenses[index] = { name, amount };
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
  }

  function deleteExpense(index) {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
  }

  function handleFormSubmit(e) {
      e.preventDefault();
      const name = expenseName.value;
      const amount = parseFloat(expenseAmount.value).toFixed(2);
      if (expenseForm.dataset.editing) {
          const index = expenseForm.dataset.editing;
          updateExpense(index, name, amount);
          delete expenseForm.dataset.editing;
      } else {
          addExpense(name, amount);
      }
      expenseForm.reset();
  }

  expenseForm.onsubmit = handleFormSubmit;

  expenseList.addEventListener('click', function (e) {
      if (e.target.classList.contains('edit')) {
          const index = e.target.dataset.index;
          const expense = expenses[index];
          expenseName.value = expense.name;
          expenseAmount.value = expense.amount;
          expenseForm.dataset.editing = index;
      } else if (e.target.classList.contains('delete')) {
          const index = e.target.dataset.index;
          deleteExpense(index);
      }
  });

  renderExpenses();
});
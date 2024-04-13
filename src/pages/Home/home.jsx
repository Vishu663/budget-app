import { useEffect, useState } from "react";
import "./home.css";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [budgets, setBudgets] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);

  const handleBudgetCreate = () => {
    if (budgetName && budgetAmount > 0) {
      const newBudget = { name: budgetName, amount: parseFloat(budgetAmount) };
      setBudgets([...budgets, newBudget]);
      setBudgetName("");
      setBudgetAmount(0);
    }
  };

  const handleExpenseAdd = () => {
    if (expenseName && expenseAmount > 0) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      const remainingBudget =
        budgets.reduce((acc, budget) => acc + budget.amount, 0) -
        parseFloat(expenseAmount);
      setBudgets([{ name: "Remaining Budget", amount: remainingBudget }]);
      setExpenseName("");
      setExpenseAmount(0);
    }
  };

  const handleExpenseDelete = (index) => {
    const deletedExpense = expenses[index];
    const remainingBudget =
      budgets.reduce((acc, budget) => acc + budget.amount, 0) +
      deletedExpense.amount;
    setBudgets([{ name: "Remaining Budget", amount: remainingBudget }]);
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Effect to redirect if name is not available
  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  return (
    <div className="container">
      <h2>
        <HomeIcon className="home-icon" />
        Budget-up
      </h2>
      <div className="first-row">
        <h2>Welcome back, {name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main">
        <div className="budget-form">
          <h2>Create Budget</h2>
          <input
            type="text"
            placeholder="Budget Name"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Budget Amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
          <button onClick={handleBudgetCreate}>Create Budget</button>
        </div>
        <div className="expense-form">
          <h2>Add Expense</h2>
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <button onClick={handleExpenseAdd}>Add Expense</button>
        </div>
      </div>
      <div className="budget-and-expense">
        <div className="budgets">
          <h2>Budgets</h2>
          {budgets.map((budget, index) => (
            <div key={index}>
              <p>
                {budget.name}: ${budget.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="expenses">
          <h2>Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.name}</td>
                  <td>${expense.amount}</td>
                  <td>
                    <button onClick={() => handleExpenseDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

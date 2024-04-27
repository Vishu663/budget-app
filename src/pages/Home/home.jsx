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
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [articles, setArticles] = useState([]);

  const handleBudgetCreate = () => {
    if (budgetName && budgetAmount > 0) {
      const newBudget = {
        name: budgetName,
        amount: parseFloat(budgetAmount),
        id: Date.now(),
      };
      setBudgets([...budgets, newBudget]);
      setBudgetName("");
      setBudgetAmount(0);
    }
  };

  const handleExpenseAdd = () => {
    if (expenseName && expenseAmount > 0 && selectedBudget) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        budgetId: selectedBudget.id,
      };
      setExpenses([...expenses, newExpense]);
      const updatedBudgets = budgets.map((budget) =>
        budget.id === selectedBudget.id
          ? { ...budget, amount: budget.amount - parseFloat(expenseAmount) }
          : budget
      );
      setBudgets(updatedBudgets);
      setExpenseName("");
      setExpenseAmount(0);
    }
  };

  const handleExpenseDelete = (index) => {
    const deletedExpense = expenses[index];
    const updatedBudgets = budgets.map((budget) =>
      budget.id === deletedExpense.budgetId
        ? { ...budget, amount: budget.amount + deletedExpense.amount }
        : budget
    );
    setBudgets(updatedBudgets);
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!name) {
      navigate("/");
    } else {
      const storedBudgets = localStorage.getItem(`${name}_budgets`);
      const storedExpenses = localStorage.getItem(`${name}_expenses`);

      if (storedBudgets) {
        setBudgets(JSON.parse(storedBudgets));
      }

      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    }
  }, [name, navigate]);

  useEffect(() => {
    localStorage.setItem(`${name}_budgets`, JSON.stringify(budgets));
    localStorage.setItem(`${name}_expenses`, JSON.stringify(expenses));
  }, [budgets, expenses, name]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '3ec9ab0866644790836f9f931c3ef1a2';
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
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
            <select
              value={selectedBudget ? selectedBudget.id : ""}
              onChange={(e) => {
                const budgetId = parseInt(e.target.value);
                const selected = budgets.find(
                  (budget) => budget.id === budgetId
                );
                setSelectedBudget(selected);
              }}
            >
              <option value="">Select Budget</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
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
                  <th>Budget</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>
                      {
                        budgets.find((budget) => budget.id === expense.budgetId)
                          .name
                      }
                    </td>
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
      <div className="container-2">
        <h1>Top Business News</h1>
        <div className="news-list">
          {articles.map((article, index) => (
            <div key={index}>
              <h3>{article.title}</h3>
              <p>{article.publishedAt}</p>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

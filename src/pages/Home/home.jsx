import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
    const navigate = useNavigate();
    const { name } = useParams();
    const [openBox, setOpenBox] = useState(false);
    const [expenseBox, setExpenseBox] = useState(false);
    const [expenseName, setExpenseName] = useState("");
    const [principalAmount, setPrincipalAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    const toggleOpenBox = () => {
        if (!expenseName && !principalAmount) {
            alert("Fill in the fields first");
        } else {
            setOpenBox(!openBox);
            setExpenseBox(!expenseBox);
            const newExpense = { name: expenseName, amount: principalAmount };
            setExpenses([...expenses, newExpense]);
            setExpenseName("");
            setPrincipalAmount("");
        }
    };

    const handleLogout = () => {
        navigate('/');
    }
    
    useEffect(() => {
        if (!name) {
            navigate("/");
        }
    }, [name, navigate]);

    return (
        <>
            <div className="home-container">
                <div className="home-main">
                    <h2>Budget-Up</h2>
                    <div className="first-row"><h1>Welcome back, {name}</h1><button onClick={handleLogout}>logout</button></div>
                    <div className="cards">
                        <div className="budget-card">
                            <h2>Create Budget</h2>
                            <label>
                                Budget Name
                                <input onChange={(e) => setExpenseName(e.target.value)} value={expenseName} type="text" placeholder="eg. groceries" />
                            </label>
                            <label>
                                Amount
                                <input type="number" placeholder="eg. 350rs" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} />
                            </label>
                            <button onClick={toggleOpenBox}>Create Budget</button>
                        </div>
                        {openBox && (
                            <div className="budget-card">
                                <h2>Add new Budget expense</h2>
                                <label>
                                    Expense Name
                                    <input type="text" placeholder="eg. milk" />
                                </label>
                                <label>
                                    Amount
                                    <input type="number" placeholder="eg. 350rs" />
                                </label>
                                <button>Add Expense</button>
                            </div>
                        )}
                    </div>
                    {expenseBox && (
                        <div className="expense-card">
                            {expenses.map((expense, index) => (
                                <div key={index}>
                                    <h2>{expense.name}</h2>
                                    <h2>{expense.amount}</h2>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

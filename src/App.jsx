import { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
    note: "",
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTransaction = () => {
    if (!form.amount || !form.category) return;

    const newTransaction = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
      note: "",
    });
  };

  return (
    <div style={{ padding:"20px",maxWidth:"500px", fontFamily:"Arial" }}>
      <h1>Finance Tracker</h1>

      <h3>Add Transaction</h3>

      <input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        style={{ display:"block", margin:"8px",padding:"8px", width:"100%"}}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        style={{ display:"block", margin:"8px",padding:"8px", width:"100%"}}
      />
      <select name="type" value={form.type} onChange={handleChange}
      style={{ display:"block", margin:"8px",padding:"8px", width:"100%"}}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        style={{ display:"block", margin:"8px",padding:"8px", width:"100%"}}
      />
      <input
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
        style={{ display:"block", margin:"8px",padding:"8px", width:"100%"}}
      />

      <button onClick={addTransaction}
              style={{
                padding:"10px",
                width:"300px",
                background:"black",
                color:"white",
              }}
              >Add Transaction</button>

      <h3>Transactions</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((t) => (
          <div
            key={t.id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px", borderRadius:"8px" }}
          >
            <p>
              <b>₹{t.amount}</b>
            </p>
            <p>
              {t.category} | {t.type}
            </p>
            <p>{t.date}</p>
            <p>{t.note}</p>
            <button
              onClick={() => {
                const updated = transactions.filter((item) => item.id !== t.id);
                setTransactions(updated);
              }}
              style={{
                marginTop:"8px",
                background:"red",
                color:"white",
                padding:"5px"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

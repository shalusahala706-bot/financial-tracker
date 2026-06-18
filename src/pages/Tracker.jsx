import { useState, useEffect } from "react";
import "./Tracker.css";

function Tracker() {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  const [showForm, setShowForm] = useState(false);

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
    <div className="dashboard-layout">
      <div className="tracker-container">
        <h1 className="tracker-title">Finance Tracker</h1>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Transaction"}
        </button>

        {showForm && (
          <div className="form-container">
            <div className="form-group">
              <label>Amount</label>

              <input
                className="input-field"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                className="input-field"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Type</label>

              <select
                className="input-field"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                className="input-field"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Note</label>
              <input
                className="input-field"
                name="note"
                placeholder="Note"
                value={form.note}
                onChange={handleChange}
              />
            </div>

            <button className="add-btn" onClick={addTransaction}>
              Save Transaction
            </button>
          </div>
        )}

        <div className="card">
          <h3 className="card-title">Recent Transactions</h3>
          <p className="card-subtitle">Your latest expenses</p>

          <div className="transaction-list">
            {transactions.length === 0 ? (
              <p>No transactions yet</p>
            ) : (
              transactions.map((t) => (
                <div key={t.id} className="transaction-card">
                  <p className="transaction-info">
                    <b>₹{t.amount}</b>
                  </p>
                  <p className="transaction-info">
                    {t.category} | {t.type}
                  </p>
                  <p className="transaction-info">{t.date}</p>
                  <p className="transaction-info">{t.note}</p>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      const updated = transactions.filter(
                        (item) => item.id !== t.id,
                      );
                      setTransactions(updated);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;

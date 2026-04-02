import { useState } from "react";
import EditExpenseModal from "./EditExpenseModal";

export default function GroupCard({ group, setGroups }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const total = group.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleAddExpense = () => {
    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
    };

    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id
          ? { ...g, expenses: [...g.expenses, newExpense] }
          : g
      )
    );

    // Reset inputs
    setTitle("");
    setAmount("");
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === group.id
            ? { 
                ...g, 
                expenses: g.expenses.filter(expense => expense.id !== expenseId) 
              }
            : g
        )
      );
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div className="card">
      <div className="group-header">
        <h2>{group.name}</h2>
        <span className="member-count">{group.members.length} members</span>
      </div>

      <div className="group-members">
        <strong>Members:</strong> {group.members.join(", ")}
      </div>

      <div className="group-stats">
        <div className="stat-item">
          <span className="stat-label">Expenses:</span>
          <span className="stat-value">{group.expenses.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value amount">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="expense-form">
        <h3>Add New Expense</h3>
        <div className="form-row">
          <input
            type="text"
            placeholder="Description (e.g., Dinner, Groceries)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="expense-input"
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            placeholder="Amount in ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount-input"
          />
          <button className="btn-add" onClick={handleAddExpense}>
            Add Expense
          </button>
        </div>
      </div>

      {/* Expenses List */}
      {group.expenses.length > 0 && (
        <div className="expenses-list">
          <h3>Recent Expenses</h3>
          {group.expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-details">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-date">{expense.date}</div>
              </div>
              <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
              <div className="expense-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEditExpense(expense)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Expense Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          setGroups={setGroups}
          groupId={group.id}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </div>
  );
}

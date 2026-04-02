import { useState } from "react";

export default function EditExpenseModal({ expense, setGroups, groupId, onClose }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);

  const handleUpdate = () => {
    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              expenses: group.expenses.map((exp) =>
                exp.id === expense.id
                  ? { ...exp, title, amount: Number(amount) }
                  : exp
              ),
            }
          : group
      )
    );

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Expense</h2>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button className="btn-primary" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

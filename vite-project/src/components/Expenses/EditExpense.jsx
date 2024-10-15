import React, { useState } from "react";

export default function EditExpense({ expense, onSave, onCancel }) {
  const [editedExpense, setEditedExpense] = useState({ ...expense });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedExpense);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-beige 100vh width-full z-50">
      <div className="bg-white w-[55%] h-[90%] p-6 rounded-lg shadow-lg relative overflow-auto">
        <h3 className="text-title text-charcoal mb-4 font-bold">Edit Expense</h3>
        <button
          onClick={onCancel}
          className="bg-transparent text-charcoal absolute right-0 top-0 text-button p-4"
          aria-label="close"
        >
          X
        </button>

          <label className="text-charcoal">Name</label>
          <input
            type="text"
            name="expenseName"
            value={editedExpense.expenseName}
            onChange={handleChange}
            className="shadow border rounded w-full my-2 p-1 bg-white text-charcoal"
          />

          <label className="text-charcoal">Date</label>
          <input
            type="text"
            name="date"
            value={editedExpense.date}
            onChange={handleChange}
            className="shadow border rounded w-full my-2 p-1 bg-white text-charcoal"
          />

          <label className="text-charcoal ">Amount</label>
          <input
            type="number"
            name="Amount"
            value={editedExpense.Amount}
            onChange={handleChange}
            className="shadow border rounded w-full my-2 p-1 bg-white text-charcoal"
          />

          <label className="text-charcoal">Participants</label>
          <input
            type="text"
            name="participants"
            value={editedExpense.participants.join(", ")}
            onChange={(e) => {
              const participantsArray = e.target.value
                .split(",")
                .map((p) => p.trim());
              setEditedExpense((prev) => ({
                ...prev,
                participants: participantsArray,
              }));
            }}
            className="shadow border rounded w-full my-2 p-1 bg-white text-charcoal"
          />

          {editedExpense.image && (
            <div className="mb-4">
              <img
                src={editedExpense.image}
                alt="Expense receipt"
                className="w-full h-auto max-h-60 object-contain" // Limit image height
              />
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              className="bg-pink shadow text-white rounded py-1 px-4 cursor-pointer text-button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    
  );
}
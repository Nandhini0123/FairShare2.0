import React, { useEffect, useState } from "react";
import EditExpense from "./EditExpense";

export default function DisplayExpensesList(props) {
  const [groupsData, setGroupsData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(null);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("FairShare_groupsData")) || [];
    setGroupsData(storedData);
  }, []);

  const handleEditExpense = (groupIndex, expenseIndex) => {
    setEditingExpense(groupsData[groupIndex].expenses[expenseIndex]);
    setCurrentGroupIndex(groupIndex);
    setCurrentExpenseIndex(expenseIndex);
  };

  const handleSaveExpense = (updatedExpense) => {
    const updatedGroupsData = [...groupsData];
    updatedGroupsData[currentGroupIndex].expenses[currentExpenseIndex] =
      updatedExpense;
    setGroupsData(updatedGroupsData);
    setEditingExpense(null);
    setCurrentGroupIndex(null);
    setCurrentExpenseIndex(null);
    localStorage.setItem(
      "FairShare_groupsData",
      JSON.stringify(updatedGroupsData)
    );
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setCurrentGroupIndex(null);
    setCurrentExpenseIndex(null);
  };

  const handleDeleteExpense = (groupIndex, expenseIndex) => {
    const updatedGroupsData = [...groupsData];
    updatedGroupsData[groupIndex].expenses.splice(expenseIndex, 1);
    setGroupsData(updatedGroupsData);
    localStorage.setItem(
      "FairShare_groupsData",
      JSON.stringify(updatedGroupsData)
    );
  };

  if (props.navSelect === "expenses") {
    return (
      <div className="">
        <h2 className="font-bold text-xl mb-4">Expenses</h2>
        {groupsData.map((group, groupIndex) => (
          <div key={group.groupId} className="mb-6">
            <h3 className="font-bold text-lg mb-3">{group.groupName}</h3>
            <div className="ml-4">
              {group.expenses.map((expense, expenseIndex) => (
                <div
                  key={`${group.groupId}-${expenseIndex}`}
                  className="shadow rounded-xl p-3 text-left relative bg-lightTeal/40 hover:shadow-lg transition-shadow flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-700">{expense.expenseName}</p>
                    <p className="text-gray-700">${expense.Amount}</p>
                    <p className="text-gray-600">{expense.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleEditExpense(groupIndex, expenseIndex)
                      }
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteExpense(groupIndex, expenseIndex)
                      }
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {editingExpense && (
          <EditExpense
            expense={editingExpense}
            onSave={handleSaveExpense}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    );
  }

  return null;
}

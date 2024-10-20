import React, { useEffect, useState } from "react";
import EditExpense from "../Expenses/EditExpense";

const getGroupsData = () =>
  JSON.parse(localStorage.getItem("FairShare_groupsData")) || [];

export default function GroupDetails({ groupId, onCancel }) {
  const [groupData, setGroupData] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState();

  useEffect(() => {
    const groupsData = getGroupsData();
    const group = groupsData.find((g) => g.groupId === groupId);
    setGroupData(group);
  }, [groupId]);

  const saveGroupData = (updatedGroupData) => {
    const groupsData = getGroupsData();
    const updatedGroups = groupsData.map((g) =>
      g.groupId === updatedGroupData.groupId ? updatedGroupData : g
    );
    localStorage.setItem("FairShare_groupsData", JSON.stringify(updatedGroups));
    setGroupData(updatedGroupData);
  };

  const handleSaveExpense = (updatedExpense) => {
    const updatedExpenses = groupData.expenses.map((expense) =>
      expense.expenseName === updatedExpense.expenseName
        ? updatedExpense
        : expense
    );
    const updatedGroupData = { ...groupData, expenses: updatedExpenses };
    saveGroupData(updatedGroupData);
    setSelectedExpense(null);
  };

  if (!groupData) {
    return (
      <p className="text-center text-gray-500">Loading group details...</p>
    );
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-beige 100vh width-full z-50">
        <div className="bg-white w-[55%] h-[90%] p-6 rounded-lg shadow-lg relative overflow-auto">
          <h3 className="text-title text-charcoal mb-4 font-bold">
            Group Details
          </h3>
          <button
            onClick={onCancel}
            className="bg-transparent text-charcoal absolute right-0 top-0 text-button p-4 hover:text-red-500"
            aria-label="close"
          >
            X
          </button>
          <p className="mb-2">
            <span className="text-charcoal font-bold">
              {groupData.groupName}
            </span>
          </p>
          <p className="mb-2">
            <span className="text-charcoal font-bold">
              {groupData.groupDescription}
            </span>
          </p>
          <p className="mb-2">
            <span className="text-charcoal font-bold">
              ${groupData.groupBudget}
            </span>
          </p>

          <h4 className="text-charcoal font-bold mt-4">Members</h4>
          <ul className="list-disc pl-5 mb-4">
            {groupData.groupMembers.map((member, index) => (
              <li className="text-charcoal font-medium" key={index}>
                {member}
              </li>
            ))}
          </ul>

          <h4 className="text-charcoal font-bold mt-4">Expenses</h4>
          {groupData.expenses && groupData.expenses.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {groupData.expenses.map((expense, index) => (
                <div
                  className="rounded-xl p-3 text-left relative bg-lightTeal/40 hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-center"
                  key={index}
                  onClick={() => setSelectedExpense(expense)}
                >
                  <div>
                    <p className="text-lg text-charcoal font-bold">
                      {expense.expenseName}
                    </p>
                    <p className="text-sm text-charcoal">${expense.Amount}</p>
                    <p className="text-sm text-charcoal">{expense.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-pink text-white rounded cursor-pointer px-1 py-1">
                      Details
                    </button>

                    <button className="bg-pink text-white rounded cursor-pointer px-1 py-1">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No expenses have been added to this group yet.
            </p>
          )}

          <div className="flex justify-center mt-4">
            <button
              onClick={onCancel}
              className="bg-pink shadow text-white rounded mt-8 py-1 px-4 cursor-pointer text-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {selectedExpense && (
        <EditExpense
          expense={selectedExpense}
          onSave={handleSaveExpense}
          onCancel={() => setSelectedExpense(null)}
        />
      )}
    </>
  );
}

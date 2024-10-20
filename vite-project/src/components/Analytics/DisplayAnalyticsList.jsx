import { useState, useEffect } from "react";
import BarChart from "./BarChart";

export default function DisplayAnalyticsList({ navSelect, groupsData }) {
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    if (navSelect === "analytics") {
      const updatedGroupData = {};

      groupsData.forEach((group) => {
        const groupExpenses = group.expenses || [];

        // Accumulate expense data for each group
        updatedGroupData[group.groupId] = {
          labels: groupExpenses.map((expense) => expense.expenseName),
          data: groupExpenses.map((expense) => parseFloat(expense.Amount) || 0),
        };
      });

      setGroupData(updatedGroupData);
    }
  }, [navSelect, groupsData]);

  if (navSelect === "analytics") {
    return (
      <div className="col-span-5 p-10">
        {groupsData.map((group) => (
          <div key={group.groupId} className="mb-8">
            <h2 className="text-lg font-bold mb-4">{group.groupName}</h2>
            <h3 className="text-md mb-2">Budget: ${group.groupBudget || 0}</h3>

            <BarChart
              labels={groupData[group.groupId]?.labels || []}
              data={groupData[group.groupId]?.data || []}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

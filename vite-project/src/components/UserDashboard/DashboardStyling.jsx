import React from "react";
import DashboardTop from "../../assets/dashboard-top.png";

const DashboardStyling = () => {
  const userName = localStorage.getItem("FairShare_userName");
  const userAvatar = localStorage.getItem("FairShare_userAvatar");
  const userAvatarAlt = localStorage.getItem("FairShare_userAvatarAlt");

  return (
    <div className="relative">
      <div className="absolute top-8 right-20 flex items-center space-x-4">
        {userAvatar && (
          <img
            src={userAvatar}
            alt={userAvatarAlt}
            className="w-10 h-10 rounded-full"
          />
        )}
        <h2 className="text-black text-2xl font-bold">
          {userName}
        </h2>
      </div>
      <img
        src={DashboardTop}
        alt="Teal wave image at top of dashboard."
        className="w-full"
      />
    </div>
  );
};

export default DashboardStyling;

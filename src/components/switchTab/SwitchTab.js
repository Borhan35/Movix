import React, { useState } from "react";

import "./style.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [left, setLeft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const activeTabHandler = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              key={index}
              onClick={() => activeTabHandler(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTab;

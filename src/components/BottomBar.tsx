import React from "react";

const BottomBar = () => {
  return (
    <div
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <p>
        Made with <span style={{ color: "red" }}>&hearts;</span> by 0xRabb1t |{" "}
        <a
          href="https://github.com/linxy97/UseWhisper"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          GitHub
        </a>
        {" "}edited by ZEL-Computing 
        {" "}© {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default BottomBar;
import React, { useState } from "react";

const History = ({ his }) => {
  const [buttonContent, setButtonContent] = useState("Copy");
  const [shortUrl, setShortUrl] = useState("");

  function copyToClipboard(e, short) {
    e.preventDefault();
    setShortUrl(short);
    // Copy to clipboard
    navigator.clipboard
      .writeText(short)
      .then(() => {
        // Change button text and style temporarily
        setButtonContent("Copied!");
        e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
        e.target.style.opacity = 1;

        setTimeout(() => {
          setButtonContent("Copy");
          e.target.style.backgroundColor = "";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
  return (
    <div className="shortened-url bg-white w-100 py-3 rounded-3 text-start gap-0">
      <p className="px-4 fs-6 fw-bolder mb-sm-0">
        {window.innerWidth < 1208 && his.original.length > 28
          ? `${his.original.slice(0, 28)}...`
          : his.original.slice(0, 85)}
      </p>
      <div
        className="px-4 pt-2  pt-sm-0 fs-6 fw-bolder d-sm-flex flex-sm-row gap-sm-1 gap-lg-5 align-items-sm-center"
        style={{
          borderTop: `${window.innerWidth < 576 ? "1px solid #aaa" : "0"}`,
        }}
      >
        <a href={`${his.short}`} target="_blank">
          {his.short}
        </a>
        <button
          className="mt-sm-0 mt-3 text-white border-0 rounded-2 fw-bold py-1 fs-5"
          style={{
            width: `${window.innerWidth < 376 ? "100%" : "auto-fit"}`,
          }}
          onClick={(e) => {
            copyToClipboard(e, his.short);
          }}
        >
          {his.short === shortUrl ? buttonContent : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default History;

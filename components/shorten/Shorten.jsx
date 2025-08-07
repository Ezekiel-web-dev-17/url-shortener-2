import { useRef, useState } from "react";
import "./Shorten.css";
import axios from "axios";

const Shorten = () => {
  const [longUrl, setLongUrl] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [btnContent, setBtnContent] = useState("Shorten It!");
  const inputRef = useRef(null);
  async function shortenUrl(longUrl) {
    try {
      // Show loading state
      setBtnContent("Shortening...");

      // Test URL Properties
      if (longUrl.length <= 1) throw Error("Please add a link"); // for empty input
      if (longUrl.includes("https://tinyurl.com"))
        throw Error("Don't try to shorten a shortened URL."); // Previously Shortened URLs
      if (!longUrl.startsWith("http") && !longUrl.startsWith("www."))
        throw Error("Invalid Url."); // Url does not start with www. or http

      // To prevent shortening a Url previously shortened or currently stored.
      const local = JSON.parse(localStorage.getItem("history") || "[]");
      let res = local.find((loc) => loc.original === `${longUrl}`);
      if (res) throw Error("Previously Shortened URL.");

      // Make the API request
      await axios
        .get(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
            longUrl.startsWith("www.") ? `https://${longUrl}` : longUrl
          )}`
        )
        .then((res) => {
          const data = res.data;
          saveUrls(data);
        });
      setLongUrl("");
      setBtnContent("Shorten It!");
    } catch (error) {
      setLongUrl("");
      setBtnContent("Shorten It!");
      setErrorResponse(error.message || "Something went wrong. Try again.");
      setTimeout(() => {
        setErrorResponse("");
      }, 3000);
    }
  }

  function saveUrls(data) {
    const newEntry = {
      id: Date.now(),
      original: longUrl,
      short: data,
    };
    const existing = JSON.parse(localStorage.getItem("history") || "[]");
    existing.push(newEntry);
    localStorage.setItem("history", JSON.stringify(existing));
  }

  if (errorResponse === "Please add a link" && inputRef.current) {
    // Add the red border
    inputRef.current.style.border = "3px solid red";

    inputRef.current.classList.add("empty");

    // Remove the border after 3 seconds
    setTimeout(() => {
      inputRef.current.style.border = "";
      inputRef.current.classList.remove("empty");
    }, 3000);
  }

  return (
    <section className="shorten">
      <form
        id="url-form"
        onSubmit={(e) => {
          e.preventDefault();
          shortenUrl(longUrl);
        }}
        className="d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center"
      >
        <input
          type="text"
          ref={inputRef}
          id="url-input"
          className="shorten-input rounded-2 py-2 px-3"
          placeholder="Shorten a link here..."
          value={longUrl}
          onChange={(e) => {
            e.preventDefault();
            setLongUrl(e.target.value);
          }}
        />
        <button
          type="submit"
          id="shorten-btn"
          className="shorten-btn btn text-white py-2 px-3 rounded-2 fw-bolder fs-5"
          style={{
            backgroundColor: "var(--Cyan)",
            fontFamily: "Poppins, sans-serif",
            width: `${window.innerWidth <= 451 ? "100%" : "25%"}`,
            textWrap: "nowrap",
          }}
        >
          {btnContent}
        </button>
        <span className="error-message position-absolute start-0 top-100 z-3 text-danger fs-6 fw-bold fst-italic">
          {errorResponse}
        </span>
      </form>
    </section>
  );
};

export default Shorten;

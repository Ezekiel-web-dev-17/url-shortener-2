import { useRef, useState } from "react";
import "./Shorten.css";
import axios from "axios";

function isValidUrl(httpUrl) {
  try {
    if (httpUrl.length < 1) return false;
    const url = new URL(httpUrl); // will throw if invalid
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    if (err) return false;
  }
}

const Shorten = ({ setHistory }) => {
  const [longUrl, setLongUrl] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [btnContent, setBtnContent] = useState("Shorten It!");
  const inputRef = useRef(null);

  function saveUrls(data) {
    const newEntry = {
      id: Date.now(),
      original: longUrl,
      short: data,
    };
    const existing = JSON.parse(localStorage.getItem("history") || "[]");
    existing.push(newEntry);
    localStorage.setItem("history", JSON.stringify(existing));
    setHistory(JSON.parse(localStorage.getItem("history")));
  }

  async function shortenUrl(longUrl) {
    try {
      // Show loading state
      setBtnContent("Shortening...");

      const httpUrl = longUrl.startsWith("www.")
        ? `https://${longUrl}`
        : longUrl;
      // Test URL Properties
      if (!longUrl.trim()) throw Error("Please add a link");
      if (!isValidUrl(httpUrl)) throw Error("Invalid Url.");
      if (longUrl.startsWith("https://tinyurl.com"))
        throw Error("Don't try to shorten a shortened URL."); // Previously Shortened URLs

      // To prevent shortening a Url previously shortened or currently stored.
      const local = JSON.parse(localStorage.getItem("history") || "[]");
      let res = local.find((loc) => loc.original === `${longUrl}`);
      if (res) throw Error("Previously Shortened URL.");

      // Make the API request
      await axios
        .get(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
            httpUrl
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

  if (errorResponse === "Please add a link" && inputRef.current) {
    // Add the red border
    inputRef.current.style.border = "3px solid var(--Red)";

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

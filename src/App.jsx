import "./App.css";
import Navbar from "../components/navbar/Navbar";
import Shorten from "../components/shorten/Shorten";
import shortMobile from "./assets/images/bg-shorten-mobile.svg";
import shortDesktop from "./assets/images/bg-shorten-desktop.svg";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Hero from "../components/Hero";
import History from "../components/History";
import Uses from "../components/uses/Uses";
import Footer from "../components/footer/Footer";

function App() {
  const history = JSON.parse(localStorage.getItem("history"));

  const clearHistoryWithConfirm = () => {
    toast(
      (t) => (
        <div>
          <p className=" fw-medium">
            Are you sure you want to delete all Shortened URLs?
          </p>
          <div className="mt-2 d-flex gap-2 justify-content-between mx-5">
            <button
              onClick={() => {
                localStorage.clear();
                toast.dismiss(t.id);
                toast.success("Past URLs deleted successfully.");
              }}
              className=" bg-danger text-white px-3 py-1 rounded border-0"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className=" text-white fw-bolder px-3 py-1 rounded border-0 cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Hero />
      <main>
        <section className="responses position-relative">
          <div className="short-bg position-absolute p-3 py-4 px-sm-5">
            <Shorten />
            <img
              className="short-bg-mobile"
              src={shortMobile}
              alt="mobile short background"
            />
            <img
              className="short-bg-desktop"
              src={shortDesktop}
              alt="desktop short background"
            />
          </div>
          <div className=" d-flex flex-column align-items-center gap-3 justify-content-between mt-3 px-sm-5">
            {history &&
              history.map((his) => <History key={his.id} his={his} />)}
            {history && (
              <button
                onClick={clearHistoryWithConfirm}
                className="delete mt-4 text-white px-4 py-2 rounded fw-bold border-0"
              >
                Delete All Shortened URLs
              </button>
            )}
          </div>
        </section>

        <section className="advanced">
          <h2 className="fw-bold" style={{ color: "var(--Very-Dark-Violet)" }}>
            Advanced Statistics
          </h2>
          <p
            className="mt-4 mt-sm-0 px-2 track "
            style={{ placeSelf: "center", opacity: "0.6", fontSize: "1.1rem" }}
          >
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>

          <hr className=" opacity-100" style={{ marginInline: "4rem" }} />

          <Uses />
        </section>

        <section className="boost-sect">
          <h2>Boost your links today</h2>
          <button className="get-started border-0 py-2 px-4 rounded-5 fs-6 fw-bold text-white">
            Get Started
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;

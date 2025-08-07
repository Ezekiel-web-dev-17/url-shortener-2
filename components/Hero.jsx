import illustrationWorking from "../src/assets/images/illustration-working.svg";

const Hero = () => {
  return (
    <header className="hero mt-5 pt-5 d-flex flex-sm-row-reverse flex-column gap-5 ps-sm-5 justify-content-sm-center align-items-sm-center mb-5 pb-4">
      <div className="hero-image w-100 ps-5 ps-sm-0">
        <img src={illustrationWorking} alt="illustration-working svg" />
      </div>
      <div className="hero-text text-sm-start">
        <h1> More than just shorter links</h1>
        <p
          className="lead building text-center text-sm-start fw-normal mt-4 mt-sm-0"
          style={{
            paddingInline: `${
              window.innerWidth === 375
                ? "0 2rem"
                : window.innerWidth < 376
                ? "1.5rem"
                : window.innerWidth >= 376 && window.innerWidth <= 1024
                ? "0 2.5rem"
                : "0 7.51rem"
            }`,
          }}
        >
          Build your brand's recognition and get detailed insights on how your
          links are performing.
        </p>
        <button className="get-started mt-sm-4 mt-3 text-white border-0 rounded-5 fw-bold px-5 py-2 fs-5">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Hero;

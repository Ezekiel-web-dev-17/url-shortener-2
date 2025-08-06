import "./Uses.css";
import brand from "../../src/assets/images/icon-brand-recognition.svg";
import detailed from "../../src/assets/images/icon-detailed-records.svg";
import fullyCustomizable from "../../src/assets/images/icon-fully-customizable.svg";

const Uses = () => {
  return (
    <div className="uses mt-sm-5 pt-sm-3">
      <div className=" ms-sm-5">
        <img src={brand} alt="brand-recognition icon" />
        <h3>Brand Recognition</h3>
        <p>
          Boost your brand recognition with each click. Generic links don't mean
          a thing. Branded links help instill confidence in your content.
        </p>
      </div>
      <div>
        <img src={detailed} alt="detailed-records icon" />
        <h3>Detailed Records</h3>
        <p>
          Gain insights into who is clicking your links. Knowing when and where
          people engage with your content helps inform better decisions.
        </p>
      </div>
      <div>
        <img src={fullyCustomizable} alt="fully-customizable icon" />
        <h3>Fully Customizable</h3>
        <p>
          Improve brand awareness and content discoverability through
          customizable links, supercharging audience engagement.
        </p>
      </div>
    </div>
  );
};

export default Uses;

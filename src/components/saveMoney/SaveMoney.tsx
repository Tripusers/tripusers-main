import { SaveSvgLeft, SaveSvgRight } from "../Icons/SaveSvg";
import "./style.scss";

const SaveMoney = ({
  price,
  priceActual,
  height = "24",
}: {
  price: number;
  priceActual: number;
  height?: string;
}) => {
  return (
    <div id="saveMoney">
      <SaveSvgLeft height={height} />
      <p
        style={{
          height: `${height}px`,
          fontSize: `calc(${height}px - 8px)`,
        }}
      >{`Save ₹ ${priceActual - price}`}</p>
      <SaveSvgRight height={height} />
    </div>
  );
};

export default SaveMoney;

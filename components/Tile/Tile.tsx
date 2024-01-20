import StyleWrapper from "./tile.style.js";

export default function Tile({ data }: amy) {
  return (
    <StyleWrapper>
      <img src={data.sites[0].logoSmall2x} alt="Tile Image" />
      <h4>{data.title}</h4>
      <p>{data.shortDescription}</p>
    </StyleWrapper>
  );
}

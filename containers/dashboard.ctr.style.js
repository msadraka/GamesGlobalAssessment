import styled from "styled-components";

export default styled.div`
  .header-container {
    max-width: 1024px;
    margin: 20px auto;
  }

  .body-container {
    max-width: 1024px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px;
    gap: 15px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 425px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

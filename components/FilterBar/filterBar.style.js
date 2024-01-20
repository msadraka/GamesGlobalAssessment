import styled from "styled-components";

export default styled.section`
  // display: flex;
  // flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;
    color: #868686;
  }

  .MuiChip-clickable.selected {
    border-color: #ac74dd;
    background-color: #fcf5ff;
    color: #ac74dd;
    border-width: 2px;
    font-weight: bold;

    svg {
      stroke: #ac74dd;
      fill: #ac74dd;
    }
  }

  .dropdown-chip-container {
    position: relative;

    .MuiFormControl-root {
      position: absolute;
      left: 0;
      top: -15px;
      visibility: hidden;
    }
  }

  .MuiListItem-root {
    padding: 0 !important;
    width: auto !important;

    .MuiChip-root {
      background-color: #fcf5ff;
      color: #ac74dd;
      border: 1px solid #ac74dd;

      svg {
        stroke: #ac74dd;
        fill: #ac74dd;
      }
    }
  }
`;

import { css } from "styled-components";

const flex = (jc = "center", ai = "center", fd = "row") => css`
  display: flex;
  flex-direction: ${fd};
  justify-content: ${jc};
  align-items: ${ai};
`;

export default {
  flex,
};

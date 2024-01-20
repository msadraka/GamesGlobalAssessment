import styled from "styled-components";

export default styled.div`
  padding: 16px;
  border-radius: 10px;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;

  @for $i from 1 through 100 {
    &:nth-child(#{$i}n) {
      animation-delay: #{$i * 0.05}s;
    }
  }

  &,
  img {
    border: 1px solid #ebecf3;
  }

  img {
    padding: 10px;
    display: block;
    border-radius: 10px;
    height: 64px;
    width: 64px;
  }

  .title {
    color: #404040;
  }

  p {
    color: #868686;
    font-size: 0.85rem;
    line-height: 1.25rem;
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 15%, 0);
      transform: translate3d(0, 15%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 15%, 0);
      transform: translate3d(0, 15%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
`;

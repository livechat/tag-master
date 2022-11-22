import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
      display: none;
  }
  
  .lc-tab--selected {
    color: #4284F5;

    &:hover {
      color: #004bc2;
    }
  }

  .lc-modal__body {
    background-color: white;
    border-bottom: solid 1px hsl(0,0%,90%);
    border-top: solid 1px hsl(0,0%,90%);
  }

  .lc-input {
    width: 100%;
  }

  .lc-modal__heading {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }

  .lc-btn--destructive {
    .lc-btn__loader {
      .lc-loader {
	border-top-color: #FF8889;
      }
    }
  }
`;

export default GlobalStyle;

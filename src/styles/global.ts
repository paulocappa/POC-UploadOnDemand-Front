import { createGlobalStyle } from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: #eee transparent;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background-color: #e6e6e6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%
  }


  /* Works on Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid #fff;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    background-color: #eee;
  }
`;

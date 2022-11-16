import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import AccountsSDK from "@livechat/accounts-sdk";

import "@livechat/design-system/dist/design-system.css";

import config from "./utils/config";
import Spinner from "./components/Spinner";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
      display: none;
  }
`;

const useAuth = ({ client_id, accounts_url }) => {
  const [accessToken, setAccessToken] = useState(null);

  const accountsSDK = new AccountsSDK({
    client_id,
    server_url: accounts_url,
  });

  useEffect(() => {
    const authorize = async () => {
      try {
        const authorizeData = await accountsSDK.redirect().authorizeData();

        accountsSDK.verify(authorizeData);
        const { access_token } = authorizeData;
        setAccessToken(access_token);
      } catch (error) {
        if (error.identity_exception === "unauthorized") {
          await accountsSDK.redirect().authorize();
        }
        console.error(error);
      }
    };
    authorize();
  }, []);

  return [accessToken];
};

const App = () => {
  const [accessToken] = useAuth(config);

  if (!accessToken) {
    return <Spinner marginTop="calc(100% - 50px)" />;
  }

  return (
    <Fragment>
      <GlobalStyle />
      Tag Master
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

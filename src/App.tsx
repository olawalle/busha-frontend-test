import styled from "styled-components";
import Header from "./components/shared/Header";
import Sidebar from "./components/shared/Sidebar";
import Wallets from "./Pages/Wallets";
import { useState } from "react";

export const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <AppWrapper>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <AppBody>
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Wallets />
      </AppBody>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const AppBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1142px;
  margin: 0 auto;
  padding: 60px 20px;
`;

export default App;

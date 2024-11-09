import styled from "styled-components";
import Header from "./components/shared/Header";
import Sidebar from "./components/shared/Sidebar";
import Wallets from "./Pages/Wallets";

function App() {
  return (
    <AppWrapper>
      <Header />
      <AppBody>
        <Sidebar />
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

import Board from "./components/Board";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import PropertiesBoxProvider from "./store/PropertiesBoxProvider";
function App() {
  console.log("App rendered");
  return (
    <>
      <BoardProvider>
        <PropertiesBoxProvider>
          <Toolbox />
          <Board />
        </PropertiesBoxProvider>
      </BoardProvider>
    </>
  );
}

export default App;

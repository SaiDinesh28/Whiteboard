import Board from "./components/Board";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
function App() {
  console.log("App rendered");
  return (
    <>
    <BoardProvider>
      <Toolbox />
      <Board />
    </BoardProvider>
    </>
  );
}

export default App;

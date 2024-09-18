import MainLauout from "./components/Layout/MainLauout";
import { useAppSelector } from "./redux/hooks";

function App() {
  const theme = useAppSelector((state) => state.theme.mode);
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <MainLauout />
      </div>
    </>
  );
}

export default App;

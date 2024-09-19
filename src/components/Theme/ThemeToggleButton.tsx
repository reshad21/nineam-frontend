import { BulbOutlined, MoonOutlined } from "@ant-design/icons"; // Import icons
import { toggleTheme } from "../../redux/features/Theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const ThemeToggleButton = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div onClick={handleToggleTheme} className="cursor-pointer">
      {theme === "light" ? (
        <MoonOutlined style={{ fontSize: "24px" }} />
      ) : (
        <BulbOutlined style={{ fontSize: "24px" }} />
      )}
    </div>
  );
};

export default ThemeToggleButton;

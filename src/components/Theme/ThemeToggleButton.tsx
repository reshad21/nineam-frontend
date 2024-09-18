import { toggleTheme } from "../../redux/features/Theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Button } from "antd";

const ThemeToggleButton = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button onClick={handleToggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};

export default ThemeToggleButton;

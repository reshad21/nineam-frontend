import type { GetProps } from "antd";
import { Input, Space } from "antd";
import "./SearchInput.css"; // Import the custom CSS file

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchInput = () => {
  return (
    <Space direction="vertical">
      <Search
        placeholder="search bike"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="custom-search"
      />
    </Space>
  );
};

export default SearchInput;

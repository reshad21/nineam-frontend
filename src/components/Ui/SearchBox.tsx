import { Input } from "antd";
import React from "react";

const { Search } = Input;

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <div>
      <Search
        placeholder="Search for bikes..."
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default SearchBox;

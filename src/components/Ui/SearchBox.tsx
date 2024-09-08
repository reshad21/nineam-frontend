import { Input } from "antd";
import React from "react";

const { Search } = Input;

interface SearchBoxProps {
  onSearch: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onChange }) => {
  return (
    <div>
      <Search
        placeholder="Search for bikes..."
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default SearchBox;

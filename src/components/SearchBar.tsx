import React from 'react';
import Input from './Input';

interface SearchBarProps {
  searchInput: string;
  handleInputChange: Function;
}

const SearchBar = ({ searchInput, handleInputChange }: SearchBarProps) => {
  return (
    <Input
      value={searchInput}
      placeholder={'Search tournament...'}
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default SearchBar;

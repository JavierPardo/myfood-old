import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';
import { Input } from 'reactstrap';

const Search = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTerm = ({ target: { value } }) => setSearchTerm(value);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 350);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);
  return (
    <Input
      type="search"
      name="search"
      id="exampleSearch"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearchTerm}
    />
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export default memo(Search);

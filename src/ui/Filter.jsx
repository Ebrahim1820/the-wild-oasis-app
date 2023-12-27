/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  //border: none;
  border-color: var(--color-grey-300);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, filterOptions }) {
  // to store the value in the url
  // we need to use useSearchPramas
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterField) || filterOptions.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {filterOptions.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilterValue === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>

    // <FilterButton onClick={() => handleClick("no-discount")}>
    //   No discount
    // </FilterButton>
    // <FilterButton onClick={() => handleClick("with-discount")}>
    //   With discount
    // </FilterButton>
    // </StyledFilter>
  );
}

export default Filter;

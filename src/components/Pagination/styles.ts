import styled, { css } from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Container = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  span {
    font-size: 13px;
    color: #999;
    margin: 0 6px;
  }

  button {
    display: flex;
    border: 0;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const Limit = styled.div<{ disabled: boolean }>`
  display: flex;

  p {
    font-size: 13px;
    margin-right: 6px;
    color: #999;
  }

  select {
    border: 0;
    background-color: #fff;
    color: #444;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const ChevronRight = styled(MdChevronRight).attrs(() => ({
  size: 24,
}))<{ disabled: boolean }>`
  color: #444;
  transition: 200ms linear;

  &:hover {
    color: #121;
  }

  ${props =>
    props.disabled &&
    css`
      color: #999;
      cursor: not-allowed;

      &:hover {
        color: #999;
      }
    `}
`;

export const ChevronLeft = styled(MdChevronLeft).attrs(() => ({
  size: 24,
}))<{ disabled: boolean }>`
  color: #444;
  transition: 200ms linear;

  &:hover {
    color: #121;
  }

  ${props =>
    props.disabled &&
    css`
      color: #999;
      cursor: not-allowed;

      &:hover {
        color: #999;
      }
    `}
`;

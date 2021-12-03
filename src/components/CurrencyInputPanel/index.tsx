import styled from 'styled-components';

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
  width: initial;
  :focus,
  :hover {
    border: 1px solid ${({ theme }) => theme.bg3};
  }
`;

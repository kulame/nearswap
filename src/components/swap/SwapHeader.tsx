import { RowFixed } from 'components/Row';
import styled from 'styled-components';

const StyledSwapHeader = styled.div`
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
`;

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowFixed>兑换</RowFixed>
    </StyledSwapHeader>
  );
}

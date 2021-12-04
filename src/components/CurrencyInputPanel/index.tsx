import { ReactComponent as DropDown } from 'assets/images/dropdown.svg';
import { ButtonGray } from 'components/Button';
import { RowFixed } from 'components/Row';
import { darken } from 'polished';
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

const CurrencySelect = styled(ButtonGray)<{
  visible: boolean;
  selected: boolean;
  hideInput?: boolean;
}>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  background-color: ${({ selected, theme }) =>
    selected ? theme.bg0 : theme.primary1};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 16px;
  box-shadow: ${({ selected }) =>
    selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)'};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  height: ${({ hideInput }) => (hideInput ? '2.8rem' : '2.4rem')};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
  padding: 0 8px;
  justify-content: space-between;
  margin-right: ${({ hideInput }) => (hideInput ? '0' : '12px')};
  :focus,
  :hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.bg2 : darken(0.05, theme.primary1)};
  }
`;

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  padding: ${({ selected }) =>
    selected ? ' 1rem 1rem 0.75rem 1rem' : '1rem 1rem 0.75rem 1rem'};
`;

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) =>
    active
      ? '  margin: 0 0.25rem 0 0.25rem;'
      : '  margin: 0 0.25rem 0 0.25rem;'}
  font-size:  ${({ active }) => (active ? '18px' : '18px')};
`;
export default function CurrencyInputPanel({ currency }) {
  console.log(currency.token);
  return (
    <>
      <Container>
        <InputRow style={{}} selected={false}>
          <CurrencySelect visible={true} selected={true} hideInput={false}>
            <Aligner>
              <RowFixed>
                <StyledTokenName
                  className="token-symbol-container"
                  active={true}
                >
                  {currency.symbol}
                </StyledTokenName>
              </RowFixed>
              <StyledDropDown selected={true} />
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
    </>
  );
}

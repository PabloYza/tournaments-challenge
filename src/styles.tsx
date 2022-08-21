import theme from './theme';
import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LoadedContent = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardStyled = styled.div`
  background: ${theme.palette.background.base};
  border-radius: 4px;
  margin: 12px 12px;
  min-width: 250px;
  padding: 10px;
`;

export const ErrorContent = styled.div`
  margin: auto;
  width: 50%;
`;

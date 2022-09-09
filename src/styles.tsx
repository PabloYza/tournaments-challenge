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
  margin-top: 10px;
`;

export const CardStyled = styled.div`
  background: ${theme.palette.background.base};
  border-radius: 4px;
  margin: 12px 12px;
  width: 270px;
  padding: 10px;
`;

export const ErrorContent = styled.div`
  margin: auto;
  width: 50%;
`;

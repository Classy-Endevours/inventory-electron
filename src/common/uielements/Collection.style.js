import styled from 'styled-components';
import { Table, Card, Button } from 'antd';

export const ColorerdTable = styled(Table)`
  border: 1px solid #dfe1e8;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;
export const ColoredRow = styled('span')`
  color: green !important;
`;

export const BorderedCard = styled(Card)`
  border: 1px solid #dfe1e8;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

export const NewContentButton = styled(Button)`
  border-radius: 8px;
  color: #ffffff;
  background-color: #174a84;
  height: 40px;
`;
export const AntiContentButton = styled(Button)`
  border-radius: 8px;
  color: #174a84;
  background-color: #ffffff;
  height: 40px;
`;

export default {};

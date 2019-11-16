import styled from 'styled-components';

export const Type = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 20px;
  color: ${props => props.color};
`;

export const Name = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.color};
`;

export const Dates = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  padding-top: 15px;
  color: ${props => props.color};
`;

export const Site = styled.div`
  color: ${props => props.color};
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;
export const User = styled.div`
  color: #ff9f90;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const Colors = styled.div`
  width: 12px;
  min-width: 12px;
  background: ${props => props.color};
`;

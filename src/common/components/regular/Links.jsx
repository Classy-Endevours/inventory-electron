/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useHistory } from 'react-router-dom';

export const MoreLink = ({ text, url }) => {
  const history = useHistory();
  return <a onClick={() => history.push(url)}>{text}</a>;
};
export default {};

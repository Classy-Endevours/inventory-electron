import Layout from './layout';
import Basic from './BasicDetail';
import Auth from './AuthDetail';

const Setting = () => {
  return <Layout Components={[Basic, Auth]} />;
};
export default Setting;

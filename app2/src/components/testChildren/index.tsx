import './index.less';
import { useEffect } from 'react';

const Index = (props: any) => {
  const { optionReducer } = props;
  useEffect(() => {
    console.log('子组件加载hook');
  }, []);
  return (
    <div className="testChildren">
      111111111133333333
      <div>{props.data}</div>
      <div onClick={() => optionReducer()}>option</div>
    </div>
  );
};

export default Index;

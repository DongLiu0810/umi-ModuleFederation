import React from 'react';
import styles from './index.less';
const TestChildren = React.lazy(() => import('app2/testChildren'));
export default function Index(props: any) {
  const optionReducer = () => {
    console.log(12123131331);
    console.log(props, '======');
  };
  return (
    <div className={styles.wrapper}>
      app1主页
      <div>
        <React.Suspense fallback="loading">
          <TestChildren
            data={'father'}
            optionReducer={optionReducer}
            {...props}
          />
        </React.Suspense>
      </div>
    </div>
  );
}

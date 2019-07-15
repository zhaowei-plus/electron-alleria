import React from 'react';
import { IPanelProp } from '@/types';

import styles from './index.css';

const Panel: React.FC<IPanelProp> = function(props: IPanelProp) {
  const { title, children , subTitle} = props;
  return (
    <>
      <div className={styles.panelWrapper}>
        <div className={styles.panelTitle}>{[title]} <span className={styles.panelSubTitle}>{[subTitle]}</span></div>
        <div className={styles.panelContent}>{children}</div>
      </div>
    </>
  );
};

export default Panel;

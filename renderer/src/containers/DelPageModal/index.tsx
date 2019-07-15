import React, { useState, useEffect } from 'react';
import { Modal , Button} from 'antd';

import { IDelPageModalProps } from '@/types';

import styles from './index.css';

const sleep = (time: number, fn: () => void) => {
  return new Promise(resolve => {
    fn();

    setTimeout(resolve, time);
  });
};

const DelPageModal: React.FC<IDelPageModalProps> = function(props: IDelPageModalProps) {
  const { handleOk, visible, handleCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    /* load data */
    setConfirmLoading(true);
    sleep(3000, () => {});
    setConfirmLoading(false);
  });

  return (
    <>
      <Modal
        title="删除页面"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={400}
      >
        <p>确认删除xxx页面 ? </p>
      </Modal>
    </>
  );
};

export default DelPageModal;

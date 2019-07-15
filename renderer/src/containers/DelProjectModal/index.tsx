import React, { useState, useEffect } from 'react';
import { Modal ,Checkbox, Button} from 'antd';

import { IDelProjectModalProps } from '@/types';

import styles from './index.css';

const sleep = (time: number, fn: () => void) => {
  return new Promise(resolve => {
    fn();

    setTimeout(resolve, time);
  });
};


const DelProjectModal: React.FC<IDelProjectModalProps> = function(props: IDelProjectModalProps) {
  const { handleOk, visible, handleCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);


  const onChange =()=>{
    setIsCheck(true)
  }

  useEffect(() => {
    /* load data */
    setConfirmLoading(true);
    sleep(3000, () => {});
    setConfirmLoading(false);
  });

  return (
    <>
      <Modal
        title="删除项目"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={400}
      >
        <p>确认是否移除项目 "这是项目名称" ? </p>
        <Checkbox style={{ color:'#888888' ,fontSize:12}} onChange={onChange}>同时删除项目文件（可从系统垃圾箱找回）</Checkbox>
      </Modal>
    </>
  );
};

export default DelProjectModal;

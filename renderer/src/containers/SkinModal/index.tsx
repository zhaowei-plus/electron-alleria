import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Button, Icon } from 'antd';

import { ISkinModalProps } from '@/types';

import styles from './index.css';

const SkinModal: React.FC<ISkinModalProps> = function (props: ISkinModalProps) {
  const { handleOk, visible, handleCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const initSelectedKey = localStorage.getItem('themeType')
  const [selectedKey, setSelectedKey] = useState(initSelectedKey);


  const handleSelectedColor = (key = '') => {
    setSelectedKey(key)
  }

  const colorConfig = [
    {
      key: 'PURPLE',
      color: '#94849c',
    }, {
      key: 'KHAKI',
      color: '#BBAC95',
    }, {
      key: 'BROWN',
      color: '#87725D',
    }, {
      key: 'RED',
      color: '#A65150',
    }, {
      key: 'PINK',
      color: '#EAB0AE',
    }, {
      key: 'YELLOW',
      color: '#E8C57F',
    }, {
      key: 'GREEN',
      color: '#929773',
    }, {
      key: 'BLUE',
      color: '#A4B9AD',
    },
  ]

  const colorCard = (
    <>
      {
        colorConfig.map(config => (
          <div
            className={`${styles.colorCard} ${selectedKey === config.key ? styles.selectedColor : ''}`}
            key={config.key}
            style={{ background: `${config.color}` }}
            onClick={() => handleSelectedColor(config.key)}
          >
            <Icon type="check-circle" />
          </div>
        ))
      }
    </>
  )

  return (
    <Modal
      title="换肤"
      visible={visible}
      onOk={() => handleOk(selectedKey)}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      width={400}
    >
      <div className={styles.skinContent}>
        {colorCard}
      </div>
    </Modal>
  );
};

export default SkinModal;

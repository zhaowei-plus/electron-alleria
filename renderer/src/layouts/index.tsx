import React, { useState } from 'react';
import Link from 'umi/link';
import { Menu, Icon, Popover } from 'antd';
import SkinModal from '@/containers/SkinModal';

import styles from './index.css';
import theme from '@/theme/index.css'

const BasicLayout: React.FC = props => {
  const { project } = window.g_app._store.getState();

  const themeType = localStorage.getItem('themeType')

  if (!themeType) {
    localStorage.setItem('themeType', 'PURPLE')
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [skinVisible, setSkinVisible] = useState(false);
  const [skinColorType, setSkinColorType] = useState(themeType || 'PURPLE');

  let projectRoute = project && Object.keys(project).length ? '/project/dashboard' : '/project';

  const handleSelected = (index) => {
    setSelectedIndex(index);
  }

  //  设置换肤
  const handleSkin = () => {
    setSkinVisible(true)
  }

  // 确定换肤
  const handleSkinOk = (color) => {
    localStorage.setItem('themeType', color)
    setSkinColorType(color);
    setSkinVisible(false)
  }

  // 取消换肤
  const handleSkinCancel = () => {
    setSkinVisible(false)
  }


  const menuConfig = [
    {
      linkTo: '/',
      iconType: 'user',
      text: '个人',
      key: 'PERSONAL'
    }, {
      linkTo: `${projectRoute}`,
      iconType: 'codepen',
      text: '项目',
      key: 'PROJECT'
    }, {
      linkTo: '/template',
      iconType: 'layout',
      text: '模板',
      key: 'TEMPLATE'
    }, {
      linkTo: '/block',
      iconType: 'build',
      text: '区块',
      key: 'BLOCK'
    },
    {
      linkTo: '/tools',
      iconType: 'tool',
      text: '工具',
      key: 'TOOL'
    },
  ]

  const content = (
    <ul className={styles.settingContent}>
      <li onClick={handleSkin}><Icon className={styles.menuIcon} type='skin' />换肤</li>
    </ul>
  );

  /* tslint:disable:jsx-no-multiline-js */
  const menu = (
    <>
      {
        menuConfig.map((config, index) => (
          <li key={config.key}>
            {/* tslint:disable-next-line:jsx-no-lambda */}
            <Link to={`${config.linkTo}`} className={`${styles.linkItem} ${selectedIndex === index ? styles.menuSelected : ''}`} onClick={() => handleSelected(index)} >
              <Icon className={styles.menuIcon} type={`${config.iconType}`} /><br />
              {config.text}
            </Link>
          </li>
        ))
      }
    </>
  )

  return (
    <div className={styles.normal}>
      <aside className={`${styles.aside} ${theme[`${skinColorType}-BG`]}`}>
        <ul className={styles.menu}>
          {menu}
          <li >
            {/* tslint:disable-next-line:jsx-no-lambda */}
            <a className={styles.setting} >
              <Popover
                content={content}
                placement="topLeft"
                className='setting-popover'
              >
                <Icon className={styles.menuIcon} type="setting" /><br />
                设置
              </Popover>
            </a>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>{props.children}</main>
      {
        skinVisible ? (
          <SkinModal
            visible={skinVisible}
            handleOk={handleSkinOk}
            handleCancel={handleSkinCancel}
          />
        ) : null
      }
    </div>
  );
};

export default BasicLayout;

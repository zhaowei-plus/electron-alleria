import React, { memo } from 'react';
import {
  PageHeader,
  Tabs,
  Icon,
  message,
  Button,
} from 'antd';

import ReactPanel from './blockPanel/react';

import blocks from './blocks-config';

import './index.css';

const { TabPane } = Tabs;

interface IBlocksProps {

}

/**
 * @desc React tab
 */
const TabReact = () => (
  <span>
    <Icon type="laptop" />
    React
  </span>
);

/**
 * @desc Other tab
 */
const TabOther = () => (
  <span>
    <Icon type="mobile" />
    其他
  </span>
)

const Blocks: React.FC<IBlocksProps> = function (props: IBlocksProps): React.ReactElement {
  const operations = <Button shape="round" size="small" type="primary">刷新列表</Button>;

  return (
    <>
      <header>
        <PageHeader title="区块预览" />
      </header>
      <section>
        <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
          <TabPane tab={<TabReact />} key="1">
            <ReactPanel list={blocks.list} />
          </TabPane>
          <TabPane tab={<TabOther />} key="2">
            <ReactPanel />
          </TabPane>
        </Tabs>
      </section>
    </>
  );
}





export default memo(Blocks);

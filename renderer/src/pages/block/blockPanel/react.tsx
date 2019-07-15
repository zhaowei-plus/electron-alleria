import React from 'react';
import { Card, Row, Col } from 'antd';

import style from './index.css';

interface IBlock {
  id: number,
  name: string,
  title: string,
  description: string,
  screenshots: string,
  categories: Array<string>;
};

interface IProps {
  list: Array<IBlock>,
};

const ReactPanel: React.FC<IProps> = function (props: IProps) {
  return (
    <div className={style.blocksWrapper}>
      <Row gutter={16}>
        {
          props.list.map(block => (
            <Col span={8} key={block.id}>
              <Card key={block.id} className={style.block}>
                <span>{block.name}</span>
                <span>{block.description}</span>
                <img src={block.screenshots} />
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

export default ReactPanel;

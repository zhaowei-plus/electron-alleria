import React, { useState, useEffect } from 'react';
import { Modal ,Button,List, Avatar,Row,Col} from 'antd';
import { ITemplateModalProps } from '@/types';
import TemplateCard from '@/containers/TemplateCard';

import styles from './index.css';

const sleep = (time: number, fn: () => void) => {
  return new Promise(resolve => {
    fn();

    setTimeout(resolve, time);
  });
};



const templates = [
  {
    'id':1,
    "isBlank": true,
    "name": "BasicTemplate",
    "title": "模板开发基础模板",
    "description": "模板开发基础模板，用于新开发模板时的模板",
    "homePage": "",
    "categories": [],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/ccb9a260-e8d3-4754-8662-dde4f12b29ff.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':2,
    "name": "BasicList",
    "title": "基础列表模板",
    "description": "基础列表模板，覆盖中台40%列表页面",
    "homePage": "#/basic-list/list",
    "categories": [
      "LIST"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/d019e6ce-288b-43d1-9a08-9b26e74cdf11.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':3,
    "name": "BasicDetail",
    "title": "基础详情模板",
    "description": "基础详情模板，提供基础信息展示",
    "homePage": "#/basic-detail/detail/1",
    "categories": [
      "DETAIL"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/97399d68-8a18-47df-a21e-e16486a27c79.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':4,
    "name": "BasicEdit",
    "title": "基础表单模板",
    "description": "基础表单模板，提供基础表单功能",
    "homePage": "#/basic-edit/edit/1",
    "categories": [
      "FORM"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/2918fb97-f534-42c2-907f-2cae0fa78a27.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':5,
    "name": "BasicComb",
    "title": "基础列表、基础详情组合模板",
    "description": "基础列表、基础详情组合模板，提供基本列表信息和详情展示",
    "homePage": "#/basic-comb/list",
    "categories": [
      "COMB"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/2a589e3d-9e2e-4509-b0a6-3fc56dd16704.png?x-oss-process=image/quality,Q_75/format,jpg",
      "https://cdn.zcy.gov.cn/f2e-assets/448522a2-40d8-4da9-a52c-257735d88828.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':6,
    "name": "ComplexList",
    "title": "复杂列表模板",
    "description": "复杂列表模板，覆盖中台60%列表页面",
    "homePage": "#/complex-list/list",
    "categories": [
      "LIST"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/cbc91777-33a5-4f92-b3c1-e533573a5d21.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':7,
    "name": "ComplexDetail",
    "title": "复杂详情模板",
    "description": "复杂详情模板，提供复杂信息展示",
    "homePage": "#/complex-detail/detail/1",
    "categories": [
      "DETAIL"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/c09912eb-8fbc-4788-87f3-4cae26302b98.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },
  {
    'id':8,
    "name": "ComplexComb",
    "title": "复杂列表、基础详情组合模板",
    "description": "复杂列表、基础详情组合模板，提供复杂列表信息和基础详情展示",
    "homePage": "#/complex-comb/list",
    "categories": [
      "COMB"
    ],
    "repository": "git@git.cai-inc.com:paas-front/zcy-bestPractice-front.git",
    "screenshots": [
      "https://cdn.zcy.gov.cn/f2e-assets/b5a7c178-62b4-4067-a873-b914babe8c93.png?x-oss-process=image/quality,Q_75/format,jpg",
      "https://cdn.zcy.gov.cn/f2e-assets/8465106a-b10c-488d-9e5c-80dc2ab218b4.png?x-oss-process=image/quality,Q_75/format,jpg"
    ]
  },


];

const TemplateModal: React.FC<ITemplateModalProps> = function(props: ITemplateModalProps) {
  const { handleOk, visible, handleCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    /* load data */
    setConfirmLoading(true);
    sleep(3000, () => {});
    setConfirmLoading(false);
  });
  
  /* tslint:disable:jsx-wrap-multiline */
  const renderCard = (list) => {
    return <Row gutter={24} style={{margin:'20px 0'}}>
      {list.length
        ? list.map(item => {
          return <Col span={12} style={{margin:'10px 0'}} key={item.id}>

            <div className={styles.cardWrapper}>
              <TemplateCard
                title={item.title}
                description={item.description}
                link={item.link}
                id={item.id}
                homePage={item.homePage}
                key={item.id}
                screenshots={item.screenshots || []}
              />
            </div>
          </Col>
        })
        : null}
    </Row>
  };

  return (
    <>
      <Modal
        title="选择模板"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={600}
      >
        <div style={{maxHeight:'400px',overflow:"scroll"}}>
          {renderCard(templates)}
        </div>
      </Modal>
    </>
  );
};

export default TemplateModal;

import React from 'react';
import { ITemplateItem } from '@/types';
import { REMOTE_WEBSITE_SERVER } from '@/constants/template';
import { Card as RawCard, Icon, Avatar, Modal, Button} from 'antd';
import { executable } from '@/services';
import styles from './index.css';
import { url } from 'inspector';

const { Meta } = RawCard;
const TemplateCard: React.FC<ITemplateItem> = function(props: ITemplateItem) {
  const handelUse = () => {
    const { addPage } = props;
    addPage(props.id);
  };
  const handelView = () => {
    const { homePage = '' } = props;
    const url = `${REMOTE_WEBSITE_SERVER}${homePage}`;
    executable.openExternal(url);
    /* 浏览器打开 */
  };
  const renderImg = () => {
    const { screenshots=[] } = props;
    const  screenshot=screenshots && screenshots.length ? screenshots[0]:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    return (
      <img
        alt="example"
        src={screenshot}
        className={styles.cardImg}
      />
    );
  };

  const renderActions = () => {
    return [
      // tslint:disable-next-line: jsx-wrap-multiline
      <span key="1" onClick={handelUse}>
        使用
      </span>, // tslint:disable-next-line: jsx-wrap-multiline
      <span key="2" onClick={handelView}>
        预览
      </span>,
    ];
  };

  const cardStyle=()=>{
    const { screenshots=[] } = props;
    const  screenshot=screenshots && screenshots.length ? screenshots[0]:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    return {
      backgroundImage:`url(${screenshot})`
    }
  }
  return (
    <>
      <div
       className={styles.card} 
      >
        <div className={styles.cardImg}  style={cardStyle()}/>
        <div className={styles.title}>
          {props.title}
        </div>
        <div className={styles.mask} id={`${props.id}`}>
          <div className={styles.introduce}>
            <h3>{props.title}</h3>
            {props.description}
          </div>
          <div className={styles.footerBtn}>
            <Button className={styles.button}  type='primary' onClick={handelUse}>使用该模板</Button>
            <Button className={styles.button} onClick={handelView}>在线预览</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateCard;

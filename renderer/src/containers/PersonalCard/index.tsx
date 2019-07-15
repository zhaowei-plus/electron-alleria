import React from 'react';
import { IPersonalItem } from '@/types';
import { Card, Icon, Tag } from 'antd';
import { DragSource, DropTarget, } from 'react-dnd'
import flow from 'lodash/flow';
import { findDOMNode } from 'react-dom';

import styles from './index.css';
import theme from '@/theme/index.css'

const { Meta } = Card;

const Types = { // 设定类型，只有DragSource和DropTarget的类型相同时，才能完成拖拽和放置
  CARD: 'CARD'
};


const CardSource = {
  beginDrag(props: any) {
    return {
      index: props.index
    }
  },
  canDrag() {
    return true
  },
};

function collectDragSource(connect, monitor) {
  // console.log('collectDragSource - isDragging:', monitor.isDragging());
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const CardTarget = {
  hover(props, monitor, component) {
    if (!component)
      return null; //异常处理判断

    const dragIndex = monitor.getItem().index;//拖拽目标的Index
    const hoverIndex = props.index; //放置目标Index
    if (dragIndex === hoverIndex)
      return null;// 如果拖拽目标和放置目标相同的话，停止执行

    //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
    const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
    const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) { // 从前往后放置
      return null;
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) { // 从后往前放置
      return null;
    }
    props.onDND(dragIndex, hoverIndex); //调用父组件中方法完成交换
    monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况
  }
};

function collectDragTarget(connect, monitor) {//同DragSource的collect函数
  // console.log('collectDragTarget - canDrop:', monitor.canDrop());
  return {
    isOver: monitor.isOver(), //source是否在Target上方
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),//能否被放置
    itemType: monitor.getItemType(),//获取拖拽组件type
    connectDropTarget: connect.dropTarget(),
  }
}

class PersonalCard extends React.Component<IPersonalItem> {
  render() {
    const { handleLinkToProject, project = {}, delProject, index, themeType, isOver } = this.props;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    let opacity = isOver ? 0.1 : 1; //当被拖拽时呈现透明效果

    const getProjectTypeTag = (type: string) => {
      let color = '#94849c';
      switch (type) {
        case 'React':
          color = '#f37726';
          break;
        case 'Vue':
          color = '#ef848d';
          break;
        case 'Pampas':
          color = '#93b17f';
          break;
        default:
          color = '#94849c';
          break;
      }
      return <Tag color={color}>{type}</Tag>;
    };

    return connectDragSource(
      connectDropTarget(
        <div className={styles.includeCard}>
          <Card
            className={`${styles.personalCard} ${theme[`${themeType}-BS`]}`}
            onClick={() => {
              handleLinkToProject(project);
            }}
            style={{ opacity }}
          >
            <Meta
              title={project.path}
              description={<span>
                类型：{getProjectTypeTag(project.type)} - {index}
              </span>}
            />
            <Icon className={`${styles.delIcon} delIcon`} type='delete' onClick={delProject} />
          </Card>
        </div>
      )
    );
  }
}

// 使组件连接DragSource和DropTarget
export default flow(
  DragSource(Types.CARD, CardSource, collectDragSource),
  DropTarget(Types.CARD, CardTarget, collectDragTarget)
)(PersonalCard)

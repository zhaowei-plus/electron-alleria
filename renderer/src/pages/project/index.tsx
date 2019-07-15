import React, { useState, memo } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import services, { ipc } from '@/services';
import { formatRoutesList } from '@/tools';
import { IProjectProps, IProjectPayload, IFormattedProjectPayload } from '@/types';
import styles from './index.css';

const noopString = '测试项目';

const Project: React.FC<IProjectProps> = function(props): React.ReactElement {
  const { loadDirs } = props;
  const currentProject = localStorage.getItem('current_project');

  if(currentProject){
    services.getFileFromUser(currentProject);
  }

  ipc.on('project-open', async (e: any, msg: IProjectPayload) => {
    const payload: IFormattedProjectPayload = formatRoutesList(msg);
    useReducer(payload);
    router.push('/project/dashboard');
  });

  /**
   * 修改状态信息
   * @returns void
   * @param {string[]} files
   */
  const useReducer = (payload: IFormattedProjectPayload) => {
    loadDirs(payload);
  };

  /**
   * 处理项目导入
   *
   */
  const handleImportProject = async () => {
    const res = await services.getFileFromUser();
  };



  return (
    <div className={styles.normal}>
      <Button onClick={handleImportProject} type="primary" size="small">
        导入项目
      </Button>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: IFormattedProjectPayload; }) => void) => {
  return {
    loadDirs(payload: IFormattedProjectPayload) {
      dispatch({ type: 'project/load', payload });
    },
  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Project));

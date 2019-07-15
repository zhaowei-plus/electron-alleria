import React, { MouseEvent, Component } from 'react';
import {
  PageHeader,
  Card,
  Icon,
  Modal,
  Form,
  Select,
  Input,
  message,
  Radio,
  Button,
  Tag,
  Checkbox,
} from 'antd';

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import router from 'umi/router';
import services, { ipc } from '@/services';
import DelProjectModal from '@/containers/DelProjectModal';
import AddProjectModal from '@/containers/AddProjectModal';
import { IFormattedProjectPayload, IProjectPayload } from '@/types';

import PersonalCard from '@/containers/PersonalCard'

import styles from './index.css';
import theme from '@/theme/index.css'


class PersonalPage extends Component<any, any>{
  constructor(props: object) {
    super(props);
    let initProjectList = localStorage.getItem('project_list');
    let initWorkSpacePath = localStorage.getItem('workspace_path');
    initProjectList = initProjectList ? JSON.parse(initProjectList) : [];

    this.state = {
      workSpacePath: initWorkSpacePath,
      delVisible: false,
      addVisible: false,
      projectList: initProjectList,
      Open: false,
      delId: '',
    }
  }

  // 跳转至项目菜单
  handleLinkToProject = (project: { type: any; path: any; fullPath: any; }) => {
    const { type, path, fullPath } = project;

    if (type === 'React') {
      localStorage.setItem('current_project', fullPath);
      localStorage.setItem('current_project_name', path);
      router.push('/project');
      return;
    }
    message.destroy();
    message.warn(`暂不支持${type}类型项目`);
  };

  /**
   * 处理项目导入
   *
   */
  handleImportProject = async () => {
    const { addVisible } = this.state;
    this.setState({
      addVisible: !addVisible
    })
    // setAddVisible(true);
  };

  // 删除项目
  delProject = (e: MouseEvent) => {
    e.stopPropagation();
    this.setState({
      delVisible: true
    })
  };


  // 删除确定
  handleDellOk = () => {
    this.setState({
      delVisible: false
    })
  };
  // 删除取消
  handleDellCancel = () => {
    this.setState({
      delVisible: false
    })
  };

  // 添加项目确定
  handleCreate = () => {
    this.props.form.validateFields((err: Error, v: any) => {
      if (err) {
        throw new Error(`fatal ${err}`);
      }
      const { project, type } = v;
      this.setState({
        addVisible: false
      })
      services.project.copy(project, type);
      message.success(`${project} 项目创建成功,类型为 ${type}`);
    });
  };

  // 添加项目取消
  handleCancel = () => {
    this.setState({
      addVisible: false
    })
  };

  // 导入工作区
  loadWorkSpace = async () => {
    message.destroy();
    message.info('正在加载工作区...')

    ipc.on('workspace-success', (e: any, msg: IProjectPayload) => {
      const { workSpacePath, projectsInfo } = msg;
      localStorage.setItem('project_list', JSON.stringify(projectsInfo));
      localStorage.setItem('workspace_path', workSpacePath);
      this.setState({
        projectList: projectsInfo,
        workSpacePath,
      })
      message.destroy();
      message.success('工作区加载成功')
    });
    await services.folder.getProjectsInWorkSpace();
  };

  // 删除工作区
  deleteCurrentWorkSpace = () => {
    Modal.confirm({
      title: '删除工作区配置（仅删除配置，可重新加载工作区）?',
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.setState({
          projectList: [],
          workSpacePath: '',
        })
        localStorage.removeItem('project_list');
        localStorage.removeItem('workspace_path');
      }
    })
  }

  //  拖拽排序
  handleDND = (dragIndex: any, hoverIndex: any) => {
    const { projectList } = this.state;
    let tmp = projectList[dragIndex] //临时储存文件
    projectList.splice(dragIndex, 1) //移除拖拽项
    projectList.splice(hoverIndex, 0, tmp) //插入放置项
    localStorage.setItem('project_list', JSON.stringify(projectList));
    this.setState({
      projectList,
    })
  };

  render() {
    const { form } = this.props;
    const { workSpacePath, addVisible, delVisible, projectList } = this.state;
    const themeType = localStorage.getItem('themeType')

    const add = (
      <div className={styles.includeCard} onClick={this.handleImportProject}>
        <Card
          className={`${styles.personalCard} ${theme[`${themeType}-BS`]}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
        >
          + 新建空项目
        </Card>
      </div>
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.personalHeader}>
          {/* tslint:disable:jsx-alignment */}
          <PageHeader title="个人界面"
            extra={workSpacePath ? [
              <span key='current'>当前工作区：{workSpacePath} <a><Icon type="delete" onClick={this.deleteCurrentWorkSpace} /></a></span>
            ] : [
                <Button onClick={this.loadWorkSpace} type="primary" key='import'>
                  导入工作区
            </Button>
              ]}
          />
        </div>

        <div className={styles.personalContent}>
          {add}
          {
            projectList.map((project: any, index: any) => {
              return (
                <PersonalCard
                  project={project}
                  key={project.path}
                  handleLinkToProject={this.handleLinkToProject}
                  delProject={this.delProject}
                  onDND={this.handleDND}
                  index={index}
                  themeType={themeType}
                />
              )
            })
          }
          <AddProjectModal
            visible={addVisible}
            onOk={this.handleCreate}
            onCancel={this.handleCancel}
            form={form}
          />
          <DelProjectModal
            visible={delVisible}
            handleOk={this.handleDellOk}
            handleCancel={this.handleDellCancel}
          />
        </div>
      </DndProvider>
    );
  }
};

export default Form.create()(PersonalPage)

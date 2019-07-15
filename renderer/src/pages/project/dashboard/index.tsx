import React, { useState } from 'react';
import {PageHeader, Select, Tag, Divider , Row, Col, Icon,Tooltip,message} from 'antd';
import { connect } from 'dva';
import { IDashboardProps, IFormattedProjectPayload, IProjectPayload, IRecordItemProps, ProjectMeta } from '@/types';
import services, { ipc } from '@/services';
import Panel from '@/containers/Panel';
import TemplateModal from '@/containers/TemplateModal';
import DelPageModal from '@/containers/DelPageModal';
import styles from './index.css';
import { formatRoutesList } from '@/tools';


const { Option } = Select;

const noopString = '示例项目';
const renderTags = (tags: string[]) => {
  return tags.map(tag => {
    let color = tag.length > 5 ? 'yellow' : 'green';
    if (tag === 'loser') {
      color = 'volcano';
    }
    return (
      <Tag color={color} key={tag}>
        {tag.toUpperCase()}
      </Tag>
    );
  });
};

const Dashboard: React.FC<IDashboardProps> = function(props: IDashboardProps): React.ReactElement {
  const { project = {}, loadDirs}: IDashboardProps = props;
  const currentProjectName = localStorage.getItem('current_project_name');
  const [files, setFiles] = project.files ? useState(project.files) : useState([]);
  const [modalNewVisible, setModalNewVisible] = useState(false);
  const [modalDelVisible, setModalDelVisible] = useState(false);
  const [projectPath, setProjectPath] = useState(project.path);
  const [projectName, setCurrentProjectName] = useState(currentProjectName||project.name);


  let initProjectList = localStorage.getItem('project_list');

  initProjectList = initProjectList?JSON.parse(initProjectList):[];

  // 新建页面
  const handleNew = () => {
    setModalNewVisible(!modalNewVisible);
  };
  // 新建页面OK
  const handleNewOk = () => {
    /* 生成页面， mock数据 */
    setModalNewVisible(!modalNewVisible);
    alert('开始生成页面');
    // services.exec.run('npm', )
  };

  // 删除页面
  const handleDel = () => {
    setModalDelVisible(!modalDelVisible);
  };
  // 删除页面OK
  const handleDelOk = () => {
    setModalDelVisible(!modalDelVisible);
  };

  const onProjectChange = (projectPath: any)=>{
    services.getFileFromUser(projectPath);
    ipc.on('project-open', async (e: any, msg: IProjectPayload) => {
      const payload: IFormattedProjectPayload = formatRoutesList(msg);
      setCurrentProjectName(payload.name);
      setFiles(payload.files);
      setProjectPath(payload.path);
      loadDirs(payload)
      message.destroy();
      message.success('切换项目成功');
    });
  };

  // 启动项目
  const handleStartDev = () => {
    message.info('正在启动开发服务...')
    const res = services.exec.run('npm', 'run dev', { cwd: project.path![0] });
  };

  // 在编辑器打开
  const handleOpenEditor = async () => {
    if (!project.path) {
      return;
    }
    message.info('正在启动编辑器...')
    const res = await services.editor.open(project.path);
  };

  // 在终端打开
  const handleOpenTerminal = () => {};

  // 在文件夹打开
  const handleOpenFolder = async () => {
    if (!projectPath) {
      return;
    }
    const res = await services.folder.open(projectPath);
  };
  const { name = noopString } = project;

  /* tslint:disable:jsx-no-multiline-js */
  const pageList=(
    <>
    {
      files && files.length?(
      <ul className={styles.pageList}>
      {
        files.map(file=>(
          <li key={file.title}>
            <span>{file.title}</span>
            <span style={{float:'right'}}>{file.type} <a style={{marginLeft:'5px'}} onClick={handleDel}><Icon type="delete-fill"/></a></span>
          </li>
        ))
      }
    </ul>
    ):(
      '无'
    )}
    </>
  );

  const tags=(
      <div className={styles.projectDevTool}>
          <a className={styles.handleOpen} onClick={handleStartDev}> <Icon type="play-circle" />启动开发</a>
          <a className={styles.handleOpen} onClick={handleNew}> <Icon type="file-add" />新建页面</a>
        </div>
  );

  const filteredProjectList = initProjectList.filter((project)=>project.type==='React');
  return (
    <div className={styles.normal}>
      <header>
        <PageHeader
          className={styles.projectHeader}
          title={
          filteredProjectList.length?
            <Select
              value={projectName}
              onChange={onProjectChange}
            >
              {
                filteredProjectList.map(({path,fullPath})=>{
                  return <Option value={fullPath} key={fullPath}>{path}</Option>;
                })}
            </Select>
            : <a href="/">请导入项目</a>
        }
          tags={tags}
        >
          <div className={styles.projectToolBox}>
              <Tooltip placement="bottomRight" title='在编辑器打开'>
                <a className={styles.handleOpen} onClick={handleOpenEditor}> <Icon type='edit'/>编辑器</a>
              </Tooltip>
              <Tooltip placement="bottomRight" title="在终端打开">
                <a className={styles.handleOpen} onClick={handleOpenTerminal}> <Icon type='code'/>终端</a>
              </Tooltip>
              <Tooltip placement="bottomRight" title="在文件夹打开">
                <a className={styles.handleOpen} onClick={handleOpenFolder}> <Icon type="folder-open" />文件夹</a>
              </Tooltip>
          </div>
        </PageHeader>
      </header>
      <section className={styles.projectContent}>
        <div  className={styles.projectNotice}>
          <span className={styles.projectCurrentStatus}>当前状态: 未开启服务</span>
          <span className={styles.projectViewLog}>查看日志</span>
        </div>
      <div className={styles.projectMainArea}>
        <Row gutter={24} style={{width:'100%'}}>
      <Col span={12}>
        <div className={styles.gutterBox}>
        <Panel title='页面列表' subTitle={`（${files.length}）`}>
          {pageList}
        </Panel>
        </div>
      </Col>
      <Col span={12}>
        <div className={styles.gutterBox}>
        <Panel title="Git 管理">
          <div>Git  管理</div>
        </Panel>
        </div>
      </Col>
      <Col span={12}>
        <div className={styles.gutterBox}>
        <Panel title="依赖管理">
          <div>依赖管理</div>
        </Panel>
        </div>
      </Col>

    </Row>
      </div>
      <TemplateModal
        visible={modalNewVisible}
        handleOk={handleNewOk}
        handleCancel={handleNew}
      />
      <DelPageModal
        visible={modalDelVisible}
        handleOk={handleDelOk}
        handleCancel={handleDel}
      />
      </section>
    </div>
  );
};

const RecordItem: React.FC<IRecordItemProps> = function(props: IRecordItemProps) {
  const { file } = props;
  return (
    <>
      <span className={styles.recordItem}>{file}</span>
    </>
  );
};

const mapStateToProps = ({ project }: { project: ProjectMeta }, {}) => {
  return {
    project: project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadDirs(payload: IDashboardProps) {
      dispatch({ type: 'project/load', payload });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import React, { memo, useState, useEffect } from 'react';
import { PageHeader, Tabs, Icon, message } from 'antd';
import { ITemplateProps, ILoadTemplatesArgs, ProjectMeta } from '@/types';
import TemplateCard from '@/containers/TemplateCard';
import AddPageModal from '@/containers/AddPageModal';
import { connect } from 'dva';
const { TabPane } = Tabs;
import services, { ipc } from '@/services';
import styles from './index.css';
import Title from 'antd/lib/skeleton/Title';

const Template: React.FC<ITemplateProps & ProjectMeta> = function(
  props: ITemplateProps & ProjectMeta
) {
  const { loadTemplates, templates = [], name } = props;
  const [list, setList] = templates.length === 0 ? useState([]) : useState(templates);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(-1);

  useEffect(() => {
    /* load templates */
    loadTemplates({ type: 'react' });
    setList(templates);
  });

  const renderReact = () => (
    <span>
      <Icon type="laptop" />
      React
    </span>
  );
  const renderOther = () => (
    <span>
      <Icon type="mobile" />
      其他
    </span>
  );

  const addPage = (id: number) => {
    setVisible(true);
    setId(id);
  };

  type IDemo = typeof templates;

  const renderCard = (list: IDemo) => {
    return list.length
      ? list.map(item => {
          return (
            <div className={styles.cardWrapper} key={item.id}>
              <TemplateCard
                title={item.title}
                description={item.description}
                link={item.link}
                id={item.id}
                homePage={item.homePage}
                key={item.id}
                addPage={addPage}
                screenshots={item.screenshots || []}
              />
            </div>
          );
        })
      : null;
  };

  const handleCancel = () => setVisible(false);
  const handleCreate = v => {
    /* 执行创建 */
    const { page, id, config } = v;
    const c = JSON.stringify(config);

    // services.exec.run('rt-test', `add ${page} --template ${id}`, {
    //   cwd: props.path![0],
    // });
    // services.exec.run('rt-test', `add ${page} --template ${id} --config ${c}`, {
    //   cwd: props.path![0],
    // });

    setVisible(false);
  };

  return (
    <>
      <header className={styles.templateHeader}>
        <PageHeader title="模板列表" />
      </header>
      <section className={styles.templateMain}>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={renderReact()} key="1">
            {renderCard(list)}
          </TabPane>
          <TabPane tab={renderOther()} key="2">
            其他模板
          </TabPane>
        </Tabs>
        <AddPageModal
          visible={visible}
          onCancel={handleCancel}
          name={name}
          id={id}
          onCreate={handleCreate}
        />
      </section>
    </>
  );
};

const mapStateToProps = ({ template, project }, {}) => {
  return {
    templates: template.templates,
    name: project.name,
    path: project.path,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadTemplates(payload: ILoadTemplatesArgs) {
      dispatch({ type: 'template/load', payload });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Template));

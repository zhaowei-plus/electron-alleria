export interface ProjectMeta {
  files?: string[];
  name?: string;
  path?: string;
}

export interface IRoutesList {
  title: string;
  type: string;
  lastCommitTime: number;
  tags: string[];
}

/* project init */

export interface IProjectProps {
  loadDirs: (args: IFormattedProjectPayload) => void;
}

export interface IProjectPayload {
  name: string;
  files: string[];
  path: string;
  workSpacePath:any;
  projectsInfo:any;
}

export interface IFormattedProjectPayload {
  name: string;
  files: IRoutesList[];
  path: string;
}

/* project dashboard */

export interface IDashboardProps {
  name: string;
  project: ProjectMeta;
}

export interface IRecordItemProps {
  file: string;
}

/* template */

export interface ILoadTemplatesArgs {
  type?: 'react' | 'other';
}

export interface ITemplateItem {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly link: string;
  readonly homePage: string;
  screenshots: string[];

  addPage: (id: number) => void;
}
export interface ITemplateProps {
  loadTemplates: (args?: ILoadTemplatesArgs) => void;

  templates: Array<ITemplateItem>;
}

/* panel */
export interface IPanelProp {
  title: string;
  subTitle?: string;
  children: React.ReactChildren | React.ReactElement;
}

export interface ICardContent {
  title: string;
  desc: string;
}

/* card */

export interface ITemplateModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
}


export interface IDelProjectModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
}


export interface IDelPageModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
}


export interface ISkinModalProps {
  handleOk: (color: string) => void;
  handleCancel: () => void;
  visible: boolean;
}

export interface IPersonalItem {
  project: object;
  index: number;
  handleLinkToProject: (project: { type: any; path: any; fullPath: any; }) => void;
  delProject: (e: any)=>void;
  isDragging:boolean;
  connectDragSource:any;
  connectDropTarget:any;
}

export interface IAddProjectModalProps {
  onOk: () => void;
  onCancel: () => void;
  visible: boolean;
  form: any;
}

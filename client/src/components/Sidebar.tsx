import { useRef, useMemo, useState } from 'react';
import {
  SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs
} from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import moment from 'moment'
import Tabs, { TabPane } from './Tabs';

const Sidebar = () => {
  let sidebarobj = useRef<SidebarComponent>(null);
  let folderEle: string = '<div className= "e-folder"><div className= "e-folder-name">Editor</div></div>';
  const toggleSidebar = (args: ClickEventArgs) => {
    if (args.item.tooltipText === "Menu" && sidebarobj.current) {
      sidebarobj.current.toggle()
    }
  }
  //
  const menuTemplate = (data: any) => {
    return (
      <div className='menu-item d-flex'>
        <div className='list-icon'><i className={`bi ${data.icon || 'bi-dot'}`}></i></div>
        <div className='menu-item-text flex-grow-1'>{data.text}</div>
      </div>
    );
  }
  const menuItems: any = [{ id: 1, text: 'Threads' }, { id: 2, text: 'Tabular Reviews' }]
  const currentMenuItems: any = [
    { id: 3, text: 'Sidebar', icon: 'bi-book' }
  ]
  //
  const Sidebar: any = useMemo(() => new Array(10).fill(0).map((r, i) => ({
    id: i + 1,
    text: `Document ${i + 1}`, date: moment(new Date(2024, 10, i + 1)).format('DD/MM/YYYY')
  })), [])
  const documentTemplate = (data: any) => {
    return (
      <div className='document-item d-flex'>
        <div className='list-icon align-self-center text-center'><i className='bi bi-file-text'></i></div>
        <div className='document-item-text flex-grow-1'>
          {data.text}
          <div className='document-item-date'>{data.date}</div>
        </div>
      </div>
    );
  }
  //
  const tabs = useMemo(() => [{ value: 0, label: 'Uploaded' }, { value: 1, label: 'Organisation' }], [])
  const [tab, setTab] = useState(0)
  return <SidebarComponent ref={sidebarobj} width="300px" dockSize="50px" enableDock={true} target=".main" position="Left">
    <ToolbarComponent className='toolbar' cssClass="defaultToolbar" id="defaultToolbar" clicked={toggleSidebar}>
      <ItemsDirective>
        <ItemDirective prefixIcon="bi bi-list menu-bar" tooltipText="Menu"></ItemDirective>
        <ItemDirective template={folderEle}></ItemDirective>
      </ItemsDirective>
    </ToolbarComponent>
    <div className='sidebar-content'>
      <div className="card mt-1">
        <ListViewComponent dataSource={menuItems} template={menuTemplate}></ListViewComponent>
      </div>
      <div className="card mt-1">
        <ListViewComponent dataSource={currentMenuItems} template={menuTemplate}></ListViewComponent>
        <div className="card-body">
          <TextBoxComponent placeholder="Search..."></TextBoxComponent>
          <Tabs items={tabs}
            value={tab} onChange={setTab}>
            {tabs.map((t, i) => {
              return <TabPane key={i} active={tab === t.value}>
                <div className='mt-2'>
                  <ListViewComponent dataSource={Sidebar} template={documentTemplate} cssClass='e-list-template'></ListViewComponent>
                </div>
              </TabPane>
            })}
          </Tabs>
        </div>
      </div>
    </div>
  </SidebarComponent>
};

export default Sidebar;
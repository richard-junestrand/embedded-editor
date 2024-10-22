import Editor from './Editor';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const Editors = () => {
  const [tabs, setTabs] = useState<{
    header: {
      text?: string
      iconCss?: string
    };
    content: any
    cssClass?: string
    selected?: boolean
  }[]>([
    { header: { text: 'Document 1' }, content: () => <Editor />, selected: true },
    //{ header: { iconCss: 'bi bi-plus' }, content: '', cssClass: 'tab-add' }
  ]);
  //
  const [newTab, setNewTab] = useState(1)
  const selectedTab=useMemo(() => {
    const m=tabs.find(r => r.selected);
    return m?tabs.indexOf(m):tabs.length-1
  },[tabs])
  const tabSelecting = (e: any) => {
    console.log(e.selectingIndex)
    if (e.selectingIndex === tabs.length - 1) {
      e.cancel = true; console.log('---ad')
      setNewTab(prev => prev + 1)
    }
  }
  const tabSelected = (e: any) => {
    setTabs(prev=> prev.map((r,i) => {return {...r,selected: i===e.selectedIndex}}));
  }
  const tabRemoved = (e: any) => {
   setTabs(prev=>{
    const val=prev.flatMap((r,i)=> i===e.removedIndex?[]:[r])
    const m=val.find(r => r.selected)
    return m?val:val.map((r,i) => ({...r,selected: i===val.length-1}))
   })
  }
  useEffect(() => {
    if (newTab > 1) {
      setTabs(prev => {
        return [...prev.map(r=>({...r,selected: false})), { selected: true, header: { text: `Document ${newTab}` }, content: () => <Editor /> }]
      })
    }
  }, [newTab])
  useEffect(() => {
    console.log(tabs.length)
  },[tabs])
  return <div className='editors flex-grow-1'><button style={{position:'absolute', zIndex:9999}} onClick={() => setNewTab(prev=>prev+1)}>Add</button>
    <TabComponent showCloseButton cssClass='tab-editors'
      heightAdjustMode='Fill' selected={tabSelected} selectedItem={selectedTab} removed={tabRemoved}>
      <TabItemsDirective>
        {tabs.map((tab, index) => {
          return <TabItemDirective key={index} cssClass={tab.cssClass} header={tab.header} content={tab.content} />
        })}
      </TabItemsDirective>
    </TabComponent>
  </div>
};

export default Editors;
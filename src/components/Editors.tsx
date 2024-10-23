import Editor from './Editor';
import { useEffect, useMemo, useState } from 'react';

const Editors = () => {
  const defaultTabs = useMemo(() => [{ id: 1, label: 'Document 1', selected: true }], [])
  const [tabs, setTabs] = useState<any[]>(defaultTabs)
  const [newTab, setNewTab] = useState(defaultTabs.length)
  //
  useEffect(() => {
    if (newTab > defaultTabs.length) {
      setTabs(prev => [...prev.map(r => ({ ...r, selected: false })), { id: newTab, label: `Document ${newTab}`, selected: true }])
    }
    // eslint-disable-next-line
  }, [newTab])
  const selectTab = (id: number) => {
    setTabs(prev => prev.map(r => ({ ...r, selected: r.id === id })))
  }
  const addTab = () => {
    setNewTab(prev => prev + 1)
  }
  const removeTab = (id: number) => {
    setTabs(prev => {
      let selectedIndex = prev.findIndex(r => r.selected)
      const l = prev.flatMap(r => r.id === id ? [] : [r])
      if (l.length > 0) {
        if (selectedIndex >= l.length) {
          selectedIndex = l.length - 1
        }
        return l.map((r, i) => ({ ...r, selected: i === selectedIndex }))
      }
      return l
    })
  }

  return <div className='editors flex-grow-1 d-flex flex-column'>
    <ul className="nav nav-tabs">
      {tabs.map(t => {
        return <li key={t.id} className="nav-item">
          <button className={`nav-link ${t.selected ? 'active' : ''}`}>
            <span className='d-flex justify-between'>
              <span onClick={() => selectTab(t.id)}>{t.label}</span>
              <span className='icon-close link' onClick={() => removeTab(t.id)}><i className='bi bi-x'></i></span>
            </span>
          </button>
        </li>
      })}
      <li>
        <button className="nav-link tab-add" onClick={addTab}><i className='bi bi-plus'></i></button>
      </li>
    </ul>
    <div className='flex-grow-1 tab-content'>
      {tabs.map(t => {
        return <div className={`editor ${t.selected ? 'active' : ''}`} key={t.id}>
          <Editor active={t.selected} />
        </div>
      })}
    </div>
  </div>
};

export default Editors;
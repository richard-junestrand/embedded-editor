import { Fragment } from 'react';

const Tabs = ({children, value, onChange, items}:{
  children?: React.ReactNode
  value: number
  onChange:(value:number)=>void
  items: {
    value: number
    label: string
  }[]
}) => {
  return <Fragment>
    <ul className="nav nav-tabs">
      {items.map((r,i)=> {
        return <li key={i} className="nav-item">
        <button className={`nav-link ${r.value===value?'active':''}`} onClick={()=>onChange(r.value)}>{r.label}</button>
      </li>
      })}
    </ul>
    <div className="tab-content">{children}
    </div>
  </Fragment>
};

export default Tabs;

export const TabPane =({active, children}:{
  active: boolean
  children?: React.ReactNode
}) => {
  return <div className={`tab-pane fade ${active?'show active':''}`}>{children}</div>
}
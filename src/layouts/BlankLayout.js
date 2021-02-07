import React from 'react'
import { Inspector } from 'react-dev-inspector';
const InspectorWrapper = process.env.NODE_ENV === 'development'
  ? Inspector
  : React.Fragment
export default function BlankLayout({ children }) {
  return (
    <InspectorWrapper>
      {children}
    </InspectorWrapper>
  )
}

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './components/Dashboard'

const container = document.getElementById('app')
const root = createRoot(container!);

root.render(<Dashboard />)

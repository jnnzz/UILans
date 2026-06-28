import { useState } from 'react'
import { Announcements } from './pages/Announcements.jsx'
import { OpportunityBoard } from './pages/OpportunityBoard.jsx'
import { StudentDashboard } from './pages/StudentDashboard.jsx'
import { StudentPlaceholder } from './pages/StudentPlaceholder.jsx'
import {
  CompanySelectionPage,
  DtrPage,
  JournalPage,
  RequirementsPage,
} from './pages/StudentTasks.jsx'
import { WorkspaceDetail } from './pages/WorkspaceDetail.jsx'
import { StudentShell } from './components/StudentShell.jsx'

export function StudentApp({ onExit }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)

  const handleNavigate = (view) => {
    setSelectedWorkspace(null)
    setActiveView(view)
  }

  const renderView = () => {
    if (activeView === 'opportunities') {
      return <OpportunityBoard />
    }

    if (activeView === 'company-selection') {
      return <CompanySelectionPage />
    }

    if (activeView === 'requirements') {
      return <RequirementsPage />
    }

    if (activeView === 'dtr') {
      return <DtrPage />
    }

    if (activeView === 'journal') {
      return <JournalPage />
    }

    if (activeView === 'announcements') {
      return <Announcements onGoOverview={() => setActiveView('dashboard')} />
    }

    if (activeView === 'workspaces') {
      if (selectedWorkspace) {
        return (
          <WorkspaceDetail
            workspaceId={selectedWorkspace}
            onBack={() => setSelectedWorkspace(null)}
          />
        )
      }

      return (
        <StudentPlaceholder
          type="workspaces"
          onOpenWorkspace={setSelectedWorkspace}
        />
      )
    }

    return <StudentDashboard onGoAnnouncements={() => setActiveView('announcements')} />
  }

  return (
    <StudentShell
      activeView={activeView}
      onNavigate={handleNavigate}
      onExit={onExit}
    >
      {renderView()}
    </StudentShell>
  )
}

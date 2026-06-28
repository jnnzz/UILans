import { useState } from 'react'
import { opportunities } from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'
import { OpportunityCard } from '../components/OpportunityCard.jsx'

export function OpportunityBoard() {
  const [activeTab, setActiveTab] = useState('industries')
  const visibleOpportunities =
    activeTab === 'matches'
      ? [...opportunities].sort((a, b) => Number.parseInt(b.match) - Number.parseInt(a.match)).slice(0, 4)
      : opportunities

  return (
    <main className="student-main">
      <section className="board-page">
        <div className="board-heading">
          <div>
            <h1>Opportunities</h1>
            <div className="tab-list">
              <button
                className={activeTab === 'industries' ? 'tab active' : 'tab'}
                type="button"
                onClick={() => setActiveTab('industries')}
              >
                Industries
              </button>
              <button
                className={activeTab === 'matches' ? 'tab active' : 'tab'}
                type="button"
                onClick={() => setActiveTab('matches')}
              >
                AI Matches
              </button>
            </div>
          </div>

          <label className="search-box">
            <Icon name="search" size={20} />
            <input type="search" placeholder="Search Announcement" />
          </label>
        </div>

        {activeTab === 'matches' && (
          <div className="workspace-alert">
            <Icon name="checkCircle" size={16} />
            <p>
              Showing posting matches based on your declared skills. OJThink does not
              submit applications or rank students for companies.
            </p>
          </div>
        )}

        <div className="opportunity-grid">
          {visibleOpportunities.map((opportunity, index) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              featured={index === 0}
              showMatch={activeTab === 'matches'}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

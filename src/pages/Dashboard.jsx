import React from 'react';

const cards = [
  {
    title: 'User dashboard',
    description: 'Track reservations, mileage, insurance selection, and delivery ETA from a streamlined hub.',
    bullets: ['Live booking status', 'Extend or modify trips', 'Add drivers and coverage'],
    cta: 'Open user dashboard'
  },
  {
    title: 'Employee dashboard',
    description: 'Operational visibility for fleet managers: assignments, inspections, and payouts.',
    bullets: ['Assign concierge deliveries', 'Pre/post trip inspections', 'Payments and refunds'],
    cta: 'Open staff view'
  }
];

const insights = [
  {
    title: 'Utilization',
    value: '92%',
    detail: 'Average fleet occupancy across the past 30 days'
  },
  {
    title: 'Uptime',
    value: '99.4%',
    detail: 'Maintenance and detailing tracked automatically'
  },
  {
    title: 'Customer NPS',
    value: '76',
    detail: 'Delivery experience and return flow surveys'
  }
];

const Dashboard = () => (
  <div className="app-shell" id="dashboard">
    <div className="section-header">
      <div>
        <h1 className="section-title">Dashboards</h1>
        <p className="section-subtitle">Clear separation for customers and staff without switching apps.</p>
      </div>
      <button className="button" type="button">
        Export data
      </button>
    </div>

    <div className="grid">
      {cards.map((card) => (
        <article key={card.title} className="card">
          <h3 style={{ margin: '0 0 8px' }}>{card.title}</h3>
          <p className="muted" style={{ margin: '0 0 10px' }}>{card.description}</p>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--muted)' }}>
            {card.bullets.map((bullet) => (
              <li key={bullet} style={{ marginBottom: '6px' }}>
                {bullet}
              </li>
            ))}
          </ul>
          <button className="button" type="button" style={{ marginTop: '12px' }}>
            {card.cta}
          </button>
        </article>
      ))}
    </div>

    <section className="banner" style={{ marginTop: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 6px' }}>Realtime fleet insights</h3>
        <p className="muted" style={{ margin: 0 }}>
          Automatic telemetry, mileage capture, and pre-trip checks keep utilization and guest satisfaction high.
        </p>
      </div>
      <div className="stat-blocks">
        {insights.map((item) => (
          <div key={item.title} className="stat-block">
            <h4 style={{ margin: '0 0 4px' }}>{item.title}</h4>
            <strong style={{ display: 'block', fontSize: '22px', marginBottom: '4px' }}>{item.value}</strong>
            <p className="muted" style={{ margin: 0 }}>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Dashboard;

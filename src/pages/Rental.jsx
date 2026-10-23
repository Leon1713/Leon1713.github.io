import React from 'react';

const milestones = [
  {
    title: 'Identity & coverage',
    body: 'Upload license, verify identity, and pick the coverage tier that matches your trip length.',
    chips: ['ID verification', 'Custom deductibles', 'Add extra driver']
  },
  {
    title: 'Delivery & pickup',
    body: 'Concierge delivery to your location with live ETA and photo-based checklists on arrival.',
    chips: ['Live arrival tracker', 'Damage walkthrough', 'Fuel & mileage snapshot']
  },
  {
    title: 'On-trip support',
    body: 'Extend your booking, request cleaning, or swap vehicles without leaving the app.',
    chips: ['24/7 concierge', 'Instant extensions', 'One-tap swaps']
  }
];

const Rental = () => (
  <div className="app-shell" id="rental">
    <div className="section-header">
      <div>
        <h1 className="section-title">Rental process</h1>
        <p className="section-subtitle">Three frictionless steps from discovery to handoff.</p>
      </div>
      <button className="button" type="button">
        Start pre-check
      </button>
    </div>

    <div className="steps">
      {milestones.map((item) => (
        <article key={item.title} className="step">
          <h4 style={{ margin: '0 0 6px' }}>{item.title}</h4>
          <p className="muted" style={{ margin: '0 0 10px' }}>{item.body}</p>
          <div className="tag-list">
            {item.chips.map((chip) => (
              <span key={chip} className="badge">
                {chip}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>

    <div className="banner" style={{ marginTop: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 6px' }}>Payments & compliance</h3>
        <p className="muted" style={{ margin: 0 }}>
          Secure payments, KYC, and insurance selection are embedded in the flow—no phone calls required.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="button secondary" type="button">
          Download checklist
        </button>
        <button className="button" type="button">
          Reserve now
        </button>
      </div>
    </div>
  </div>
);

export default Rental;

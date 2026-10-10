export const projects = [
  {
    slug: 'hearth-and-pipe',
    name: 'Hearth & Pipe',
    sector: 'Plumbing & heating',
    tag: 'Warmth, without the guesswork.',
    status: 'Demonstration project — not a paying client.',
    color: '#d95830',
    image: 'heating.webp',
    summary:
      'Heating, plumbing and maintenance are separated into clear service sections, with mobile navigation and a useful enquiry preparation step.',
    brief:
      'Create an approachable website for a fictional plumbing and heating business. Help homeowners understand service options and prepare a useful enquiry without relying on invented credentials or emergency promises.',
    audience: 'Homeowners looking for clear plumbing and heating information.',
    decisions: [
      [
        'Services before jargon',
        'Separate heating, plumbing and maintenance into plain-language choices so visitors can recognise the kind of help they need.',
      ],
      [
        'A warmer first impression',
        'A warm terracotta accent, generous spacing and a home-focused image create an approachable experience while keeping practical information prominent.',
      ],
      [
        'An honest contact step',
        'The demo explains what to include in an enquiry and makes clear that the sample form cannot send data.',
      ],
    ],
    features: [
      'Responsive service sections',
      'Native question accordions',
      'Accessible mobile navigation',
      'Local-only enquiry demonstration',
    ],
    demonstrates:
      'A clear service hierarchy, comfortable reading on small screens and a contact flow that sets expectations before someone starts writing.',
    services: [
      {
        name: 'Heating',
        text: 'Help with heating systems, radiators and understanding the next step for your home.',
      },
      {
        name: 'Plumbing',
        text: 'Clear guidance for leaks, taps, pipework and everyday plumbing needs.',
      },
      {
        name: 'Maintenance',
        text: 'A place to explain routine checks and planned work in everyday language.',
      },
    ],
  },
  {
    slug: 'current-electrical',
    name: 'Current Electrical',
    sector: 'Electrical services',
    tag: 'Good spaces. Better connected.',
    status: 'Demonstration project — not a paying client.',
    color: '#d9fa67',
    image: 'electrical.webp',
    summary:
      'Distinct lighting, installation and upgrade sections, a practical project preparation guide, and a visible route to the enquiry example.',
    brief:
      'Design a fictional electrical-service website for homeowners and small businesses. Give installation, lighting and planned upgrades an easy-to-scan structure without inventing qualifications, certifications or availability.',
    audience: 'Homeowners and small businesses exploring electrical work.',
    decisions: [
      [
        'Distinct service paths',
        'Lighting, installations and upgrades each have a clear entry point rather than sharing a vague list of capabilities.',
      ],
      [
        'Practical project context',
        'A short preparation guide invites visitors to explain their space, the intended work and any relevant existing information.',
      ],
      [
        'Clarity through contrast',
        'Deep violet and lime establish a confident visual identity. Large labels and visible focus states support quick navigation.',
      ],
    ],
    features: [
      'Clear residential/business service paths',
      'Responsive project preparation guide',
      'Keyboard-accessible controls',
      'No-transmission enquiry example',
    ],
    demonstrates:
      'How a distinct visual identity can support plain-language service navigation without introducing unsupported trust claims.',
    services: [
      {
        name: 'Lighting',
        text: 'Information about lighting ideas, placement and the work needed to bring them together.',
      },
      {
        name: 'Installations',
        text: 'A clear starting point for discussing sockets, fittings and new electrical work.',
      },
      {
        name: 'Upgrades',
        text: 'Explain the changes you have in mind for your home or business space.',
      },
    ],
  },
  {
    slug: 'shift-motorworks',
    name: 'Shift Motorworks',
    sector: 'Garage & vehicle repair',
    tag: 'Less uncertainty. More open road.',
    status: 'Demonstration project — not a paying client.',
    color: '#eb4935',
    image: 'garage.webp',
    summary:
      'Servicing, diagnostics and repairs are clearly separated, with useful information for drivers and an accessible enquiry demonstration.',
    brief:
      'Build an original fictional vehicle-service website that helps drivers understand servicing, diagnostics and repair enquiries. Keep the design confident without invented reviews, workshop locations, prices or booking promises.',
    audience: 'Drivers researching routine vehicle care and repair options.',
    decisions: [
      [
        'Separate symptoms from services',
        'Drivers can explore servicing, diagnostics or repairs without needing to know the technical cause of a problem first.',
      ],
      [
        'Useful enquiry preparation',
        'The website explains which vehicle details and symptoms are helpful, with no personal-data capture in the demo.',
      ],
      [
        'Confident, readable hierarchy',
        'A red, black and paper palette, bold typography and a large workshop image keep the experience direct and legible.',
      ],
    ],
    features: [
      'Service navigation for drivers',
      'Responsive image treatment',
      'Native FAQ sections',
      'Clearly labelled demo enquiry actions',
    ],
    demonstrates:
      'A practical approach to translating technical services into useful information for drivers, across desktop and mobile.',
    services: [
      {
        name: 'Servicing',
        text: 'A clear overview of routine care and what to discuss before planned work.',
      },
      {
        name: 'Diagnostics',
        text: 'Explain symptoms or warning lights and understand what a diagnostic enquiry needs.',
      },
      {
        name: 'Repairs',
        text: 'An easy starting point for describing a vehicle issue and the help you are exploring.',
      },
    ],
  },
];
export type Project = (typeof projects)[number];

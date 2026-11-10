export const FRONTEND_DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';
export const DEMO_PASSWORD = 'Demo@1234';
export const DEMO_SESSION_KEY = 'crisisgrid-demo-user';

export const DEMO_USERS = [
  { _id: 'demo-citizen', name: 'Demo Citizen', email: 'citizen@demo.crisisgrid.app', role: 'citizen' },
  { _id: 'demo-eoc', name: 'Demo EOC Operator', email: 'eoc@demo.crisisgrid.app', role: 'eoc' },
  { _id: 'demo-rescue', name: 'Demo Rescue Team', email: 'rescue@demo.crisisgrid.app', role: 'rescue_team' },
];

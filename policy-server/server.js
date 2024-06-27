import express from 'express';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());

const policies = [
  {
    id: 1,
    name: 'Health Insurance',
    description: 'Comprehensive health coverage',
  },
  { id: 2, name: 'Car Insurance', description: 'Coverage for your vehicle' },
  { id: 3, name: 'Home Insurance', description: 'Protect your home' },
  {
    id: 4,
    name: 'Life Insurance',
    description: 'Financial security for your family',
  },
  { id: 5, name: 'Travel Insurance', description: 'Travel with peace of mind' },
  { id: 6, name: 'Pet Insurance', description: 'Healthcare for your pets' },
];

app.get('/api/policies', (req, res) => {
  res.json(policies);
});

app.get('/api/policies/:id', (req, res) => {
  const policy = policies.find((p) => p.id === parseInt(req.params.id));
  if (policy) {
    res.json(policy);
  } else {
    res.status(404).send('Policy not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

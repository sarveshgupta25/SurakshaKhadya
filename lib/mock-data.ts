export type Role = 'farmer' | 'aggregator' | 'distributor' | 'retailer' | 'regulator';
export type BatchStatus = 'SAFE' | 'IN TRANSIT' | 'PENDING TEST' | 'RECALLED';
export type LabStatus = 'Passed' | 'Pending' | 'Failed';

export type JourneyStep = {
  role: string;
  name: string;
  location: string;
  timestamp: string;
  note: string;
};

export type Batch = {
  id: string;
  crop: string;
  variety: string;
  quantity: string;
  origin: string;
  currentOwner: string;
  ownerRole: Role;
  status: BatchStatus;
  labStatus: LabStatus;
  testDate: string;
  harvestDate: string;
  createdAt: string;
  location: string;
  journey: JourneyStep[];
};

export const roleLabels: Record<Role, string> = {
  farmer: 'Farmer',
  aggregator: 'Aggregator',
  distributor: 'Distributor',
  retailer: 'Retailer',
  regulator: 'Regulator',
};

export const batches: Batch[] = [
  {
    id: 'SK-26-08041',
    crop: 'Tomatoes',
    variety: 'Hybrid Roma',
    quantity: '2,400 kg',
    origin: 'Nashik, Maharashtra',
    currentOwner: 'GreenBasket Retail',
    ownerRole: 'retailer',
    status: 'SAFE',
    labStatus: 'Passed',
    testDate: '12 Aug 2026',
    harvestDate: '08 Aug 2026',
    createdAt: '08 Aug 2026',
    location: 'Pune, Maharashtra',
    journey: [
      { role: 'Farmer', name: 'Ramesh Patil Farms', location: 'Nashik, Maharashtra', timestamp: '08 Aug, 06:20', note: 'Harvested and batch created' },
      { role: 'Aggregator', name: 'Sahyadri Fresh Hub', location: 'Nashik, Maharashtra', timestamp: '08 Aug, 11:45', note: 'Quality checked and packed' },
      { role: 'Distributor', name: 'Western Route Logistics', location: 'Mumbai, Maharashtra', timestamp: '09 Aug, 08:10', note: 'Cold-chain dispatch verified' },
      { role: 'Retailer', name: 'GreenBasket Retail', location: 'Pune, Maharashtra', timestamp: '10 Aug, 14:30', note: 'Received in good condition' },
    ],
  },
  {
    id: 'SK-26-08038',
    crop: 'Alphonso Mangoes',
    variety: 'Ratnagiri Alphonso',
    quantity: '850 kg',
    origin: 'Ratnagiri, Maharashtra',
    currentOwner: 'Western Route Logistics',
    ownerRole: 'distributor',
    status: 'IN TRANSIT',
    labStatus: 'Passed',
    testDate: '11 Aug 2026',
    harvestDate: '07 Aug 2026',
    createdAt: '07 Aug 2026',
    location: 'Kolhapur, Maharashtra',
    journey: [
      { role: 'Farmer', name: 'Konkan Orchard Collective', location: 'Ratnagiri, Maharashtra', timestamp: '07 Aug, 07:05', note: 'Harvested and batch created' },
      { role: 'Aggregator', name: 'Konkan Fresh Co-op', location: 'Ratnagiri, Maharashtra', timestamp: '07 Aug, 15:20', note: 'Graded and packed' },
      { role: 'Distributor', name: 'Western Route Logistics', location: 'Kolhapur, Maharashtra', timestamp: '08 Aug, 10:00', note: 'In transit to Pune' },
    ],
  },
  {
    id: 'SK-26-08035',
    crop: 'Spinach',
    variety: 'Baby Leaf',
    quantity: '320 kg',
    origin: 'Pune, Maharashtra',
    currentOwner: 'Sahyadri Fresh Hub',
    ownerRole: 'aggregator',
    status: 'PENDING TEST',
    labStatus: 'Pending',
    testDate: 'Test scheduled 15 Aug',
    harvestDate: '13 Aug 2026',
    createdAt: '13 Aug 2026',
    location: 'Pune, Maharashtra',
    journey: [
      { role: 'Farmer', name: 'Asha Organic Farms', location: 'Pune, Maharashtra', timestamp: '13 Aug, 05:40', note: 'Harvested and batch created' },
      { role: 'Aggregator', name: 'Sahyadri Fresh Hub', location: 'Pune, Maharashtra', timestamp: '13 Aug, 09:15', note: 'Awaiting lab sample collection' },
    ],
  },
  {
    id: 'SK-26-08029',
    crop: 'Green Chillies',
    variety: 'G-4',
    quantity: '180 kg',
    origin: 'Satara, Maharashtra',
    currentOwner: 'MetroMart Stores',
    ownerRole: 'retailer',
    status: 'SAFE',
    labStatus: 'Passed',
    testDate: '10 Aug 2026',
    harvestDate: '06 Aug 2026',
    createdAt: '06 Aug 2026',
    location: 'Pune, Maharashtra',
    journey: [
      { role: 'Farmer', name: 'Satara Growers Group', location: 'Satara, Maharashtra', timestamp: '06 Aug, 06:00', note: 'Harvested and batch created' },
      { role: 'Aggregator', name: 'Sahyadri Fresh Hub', location: 'Satara, Maharashtra', timestamp: '06 Aug, 11:00', note: 'Sorted and packed' },
      { role: 'Distributor', name: 'Deccan Distribution', location: 'Pune, Maharashtra', timestamp: '07 Aug, 12:25', note: 'Delivery received' },
      { role: 'Retailer', name: 'MetroMart Stores', location: 'Pune, Maharashtra', timestamp: '08 Aug, 09:40', note: 'Available for sale' },
    ],
  },
  {
    id: 'SK-26-08012',
    crop: 'Strawberries',
    variety: 'Mahabaleshwar',
    quantity: '95 kg',
    origin: 'Mahabaleshwar, Maharashtra',
    currentOwner: 'Deccan Distribution',
    ownerRole: 'distributor',
    status: 'RECALLED',
    labStatus: 'Failed',
    testDate: '05 Aug 2026',
    harvestDate: '03 Aug 2026',
    createdAt: '03 Aug 2026',
    location: 'Pune, Maharashtra',
    journey: [
      { role: 'Farmer', name: 'Hillview Berry Farms', location: 'Mahabaleshwar, Maharashtra', timestamp: '03 Aug, 06:45', note: 'Harvested and batch created' },
      { role: 'Aggregator', name: 'Western Produce Hub', location: 'Mahabaleshwar, Maharashtra', timestamp: '03 Aug, 12:10', note: 'Packed for dispatch' },
      { role: 'Distributor', name: 'Deccan Distribution', location: 'Pune, Maharashtra', timestamp: '04 Aug, 15:00', note: 'Held pending review' },
    ],
  },
];

export const farmerBatches: Batch[] = [batches[0], batches[2], batches[4]];

export const ownerBatches: Record<Exclude<Role, 'farmer' | 'regulator'>, string[]> = {
  aggregator: ['SK-26-08035'],
  distributor: ['SK-26-08038', 'SK-26-08012'],
  retailer: ['SK-26-08041', 'SK-26-08029'],
};

export const rolePeople: Record<Role, { name: string; initials: string; location: string }> = {
  farmer: { name: 'Ramesh Patil Farms', initials: 'RP', location: 'Nashik, Maharashtra' },
  aggregator: { name: 'Sahyadri Fresh Hub', initials: 'SF', location: 'Pune, Maharashtra' },
  distributor: { name: 'Western Route Logistics', initials: 'WR', location: 'Mumbai, Maharashtra' },
  retailer: { name: 'GreenBasket Retail', initials: 'GB', location: 'Pune, Maharashtra' },
  regulator: { name: 'Maharashtra Food Safety Cell', initials: 'MF', location: 'Mumbai, Maharashtra' },
};

export function getBatch(id: string) {
  return batches.find((batch) => batch.id === id) ?? batches[0];
}

export const users = [
  { id: 'u1', name: 'Ava Stone', handle: 'avastone', avatar: '', verified: true },
  { id: 'u2', name: 'Liam Fox', handle: 'liamfox', avatar: '', verified: false },
  { id: 'u3', name: 'Maya Rivers', handle: 'mayar', avatar: '', verified: true },
];

export const posts = [
  {
    id: 'p1',
    userId: 'u1',
    content: 'Exploring the new city skyline — love the colors at dusk. A quiet moment, a lot of perspective, and a little bit of motion to make it feel alive.',
    img: 'media-1',
    likes: 24,
    comments: 8,
    timestamp: '2h',
  },
  {
    id: 'p2',
    userId: 'u2',
    content: "Quick thoughts on building better social UI: clarity > complexity.",
    img: '',
    likes: 46,
    comments: 12,
    timestamp: '5h',
  },
  {
    id: 'p3',
    userId: 'u3',
    content: 'Designing with motion feels like sculpting time. When the UI breathes, the product feels more human.',
    img: '',
    likes: 12,
    comments: 4,
    timestamp: '1d',
  },
];

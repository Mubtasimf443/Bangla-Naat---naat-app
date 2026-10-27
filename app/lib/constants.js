// TODO: replace with real numbers
export const CONTACTS = [
  { name: 'Muhammad Mubtasim Fuad', phone: '+8801750147694' },
  { name: 'Towhidul Islam Kayum', phone: '+8801839885747' },
];

export const CATEGORIES = [
  { id: 'hamd', label: 'হামদ' },
  { id: 'naat', label: 'নাত' },
  { id: 'milad', label: 'মিলাদ' },
  { id: 'ghazal', label: 'ইসলামী গজল' },
  { id: 'qasida', label: 'কাসিদা' },
  { id: 'madina', label: 'মদীনার গান' },
];

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

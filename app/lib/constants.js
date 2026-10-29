// TODO: replace with real numbers
export const CONTACTS = [
  { name: 'Muhammad Mubtasim Fuad', phone: '+8801750147694' },
  { name: 'Towhidul Islam Kayum', phone: '+8801839885747' },
];

export const CATEGORIES = [
  { id: 'hamd', label: 'হামদ' },
  { id: 'naat', label: 'নাত' },
  { id: 'ghazal', label: 'ইসলামীক গান' },
  { id: 'qasida', label: 'কাসিদা' },
];

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

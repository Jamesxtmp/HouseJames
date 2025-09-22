import Dexie from 'dexie';

export const db = new Dexie('HouseJamesDB');

db.version(1).stores({
  people: '++id, first_name, last_name',
  companies: '++id, name',
  skills: '++id, &skill_name',
  personal_info: 'person_id',
  academic_history: '++id, person_id',
  professional_history: '++id, person_id',
  person_skills: '[person_id+skill_id]'
});

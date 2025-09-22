import Dexie from 'dexie';

export const db = new Dexie('HouseJamesDB');

db.version(1).stores({
  people: '++id, first_name, last_name',
  companies: '++id, name',
  skills: '++id, &skill_name', // & indica que es único
  personal_info: '++id, &person_id', // person_id es único
  academic_history: '++id, person_id', // index en person_id
  professional_history: '++id, person_id', // index en person_id
  person_skills: '[person_id+skill_id], person_id, skill_id' // clave primaria compuesta e índices individuales
});

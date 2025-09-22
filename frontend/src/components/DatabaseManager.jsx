import { db } from '../db';

export async function addPerson(firstName, lastName, dob) {
  if (!firstName || !lastName) throw new Error('First name and last name are required.');
  
  return await db.people.add({
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dob,
    created_at: new Date(),
    updated_at: new Date(),
  });
}

export async function seedDatabase() {
  await db.transaction('rw', db.tables, async () => {
    await Promise.all(db.tables.map(table => table.clear()));

    const peopleData = [
      { id: 1, first_name: 'Juan', last_name: 'Pérez', date_of_birth: '1990-05-15' },
      { id: 2, first_name: 'María', last_name: 'Gómez', date_of_birth: '1985-10-30' },
    ];
    const companiesData = [
      { id: 1, name: 'ABC Corporation', industry: 'Technology', location: '123 Tech St, Cityville', website: 'https://www.abccorp.com' },
      { id: 2, name: 'XYZ Ltd.', industry: 'Finance', location: '456 Finance Ave, Townsville', website: 'https://www.xyzltd.com' },
    ];
    const skillsData = [
      { id: 1, skill_name: 'JavaScript', category: 'Programming' },
      { id: 2, skill_name: 'Project Management', category: 'Soft Skill' },
      { id: 3, skill_name: 'Spanish', category: 'Language' },
    ];
    const personalInfoData = [
      { person_id: 1, email_addresses: { personal: "personal@correo.com", work: "work@correo.com" }, phone_numbers: { personal: "123-456-7890", work: "987-654-3210" }, address: '123 Main St, Cityville', nationality: 'Mexican' },
      { person_id: 2, email_addresses: { personal: "personal@correo.com", work: "work@correo.com" }, phone_numbers: { personal: "555-123-4567", work: "555-987-6543" }, address: '456 Elm St, Townsville', nationality: 'English' },
    ];
    const academicHistoryData = [
      { person_id: 1, institution_name: 'University of Cityville', degree: 'BSc Computer Science', field_of_study: 'Computer Science', start_date: '2010-09-01', end_date: '2014-06-30' },
      { person_id: 2, institution_name: 'Townsville College', degree: 'BA Business Administration', field_of_study: 'Business', start_date: '2005-09-01', end_date: '2009-06-30' },
    ];
    const professionalHistoryData = [
      { person_id: 1, company_name: 'ABC Corporation', job_title: 'Software Developer', start_date: '2014-07-01', end_date: '2021-06-30' },
      { person_id: 2, company_name: 'XYZ Ltd.', job_title: 'Financial Analyst', start_date: '2009-07-01', end_date: '2018-12-31' },
    ];
    const personSkillsData = [
      { person_id: 1, skill_id: 1, proficiency_level: 'Advanced' },
      { person_id: 1, skill_id: 2, proficiency_level: 'Intermediate' },
      { person_id: 1, skill_id: 3, proficiency_level: 'Native' },
      { person_id: 2, skill_id: 2, proficiency_level: 'Advanced' },
      { person_id: 2, skill_id: 3, proficiency_level: 'Fluent' },
    ];

    await db.people.bulkAdd(peopleData);
    await db.companies.bulkAdd(companiesData);
    await db.skills.bulkAdd(skillsData);
    await db.personal_info.bulkAdd(personalInfoData);
    await db.academic_history.bulkAdd(academicHistoryData);
    await db.professional_history.bulkAdd(professionalHistoryData);
    await db.person_skills.bulkAdd(personSkillsData);
  });
}

export async function clearDatabase() {
  await db.transaction('rw', db.tables, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
  });
}
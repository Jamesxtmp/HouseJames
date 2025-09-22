import { db } from '../db';

// --- Funciones de Inserción (sin cambios) ---

export async function addPerson ( firstName, lastName, dob ) {
  if ( !firstName || !lastName ) throw new Error( 'First name and last name are required.' );
  return db.people.add( { first_name: firstName, last_name: lastName, date_of_birth: dob, created_at: new Date(), updated_at: new Date() } );
}
export async function addCompany ( name, industry, location, website ) {
  if ( !name ) throw new Error( 'Company name is required.' );
  return db.companies.add( { name, industry, location, website } );
}
export async function addSkill ( skill_name, category ) {
  if ( !skill_name ) throw new Error( 'Skill name is required.' );
  return db.skills.add( { skill_name, category } );
}
export async function addPersonalInfo(person_id, email_addresses, phone_numbers, address, nationality) {
    if (!person_id) throw new Error('Person ID is required.');

    const formatted_emails = Object.entries(email_addresses)
        .filter(([, address]) => address)
        .map(([type, address]) => ({ type, address }));

    const formatted_phones = Object.entries(phone_numbers)
        .filter(([, number]) => number)
        .map(([type, number]) => ({ type, number }));

    return db.personal_info.put({
        person_id,
        email_addresses: formatted_emails,
        phone_numbers: formatted_phones,
        address,
        nationality
    });
}
export async function addAcademicHistory ( person_id, institution_name, degree, field_of_study, start_date, end_date, description ) {
  if ( !person_id || !institution_name ) throw new Error( 'Person ID and institution are required.' );
  return db.academic_history.add( { person_id, institution_name, degree, field_of_study, start_date, end_date, description } );
}
export async function addProfessionalHistory ( person_id, company_name, job_title, start_date, end_date, responsibilities ) {
  if ( !person_id || !company_name || !job_title ) throw new Error( 'Person ID, company, and job title are required.' );
  return db.professional_history.add( { person_id, company_name, job_title, start_date, end_date, responsibilities } );
}
export async function addPersonSkill ( person_id, skill_id, proficiency_level ) {
  if ( !person_id || !skill_id ) throw new Error( 'Person ID and Skill ID are required.' );
  return db.person_skills.put( { person_id, skill_id, proficiency_level } );
}

// --- Funciones de Gestión de BD ---

export async function seedDatabase () {
  await db.transaction( 'rw', db.tables, async () => {
    await Promise.all( db.tables.map( table => table.clear() ) );

    // --- DATOS DE EJEMPLO MEJORADOS ---

    const peopleData = [
      { id: 1, first_name: 'Juan', last_name: 'Pérez', date_of_birth: '1990-05-15' },
      { id: 2, first_name: 'María', last_name: 'Gómez', date_of_birth: '1988-10-30' },
      { id: 3, first_name: 'Carlos', last_name: 'Santana', date_of_birth: '1995-03-20' },
    ];
    const companiesData = [
      { id: 1, name: 'Innovate Inc.', industry: 'Technology' },
      { id: 2, name: 'Data Solutions', industry: 'Big Data' },
      { id: 3, name: 'Market Leaders', industry: 'Marketing' },
    ];
    const skillsData = [
      { id: 1, skill_name: 'JavaScript', category: 'Programming' },
      { id: 2, skill_name: 'React', category: 'Programming' },
      { id: 3, skill_name: 'Python', category: 'Programming' },
      { id: 4, skill_name: 'Project Management', category: 'Soft Skill' },
      { id: 5, skill_name: 'English', category: 'Language' },
      { id: 6, skill_name: 'Spanish', category: 'Language' },
    ];

    const personalInfoData = [
      { 
        person_id: 1, 
        email_addresses: [
          { type: 'personal', address: 'juan.perez@email.com' },
          { type: 'work', address: 'j.perez@innovate.com' }
        ], 
        phone_numbers: [
          { type: 'personal', number: '111-222-3333' },
          { type: 'work', number: '111-999-0000' }
        ] 
      },
      { 
        person_id: 2, 
        email_addresses: [
          { type: 'personal', address: 'maria.gomez@email.com' },
          { type: 'work', address: 'm.gomez@marketleaders.com' }
        ], 
        phone_numbers: [
          { type: 'personal', number: '444-555-6666' },
          { type: 'work', number: '444-888-0000' }
        ] 
      },
      { 
        person_id: 3, 
        email_addresses: [
          { type: 'personal', address: 'carlos.santana@email.com' },
          { type: 'work', address: 'c.santana@datasolutions.com' }
        ], 
        phone_numbers: [
          { type: 'personal', number: '777-888-9999' },
          { type: 'work', number: '777-666-0000' }
        ] 
      },
    ];

    const academicHistoryData = [
      // Juan
      { person_id: 1, institution_name: 'Tech University', degree: 'BSc Computer Science', start_date: '2008-09-01', end_date: '2012-06-30' },
      { person_id: 1, institution_name: 'Advanced Studies College', degree: 'MSc Software Engineering', start_date: '2012-09-01', end_date: '2014-06-30' },
      // María
      { person_id: 2, institution_name: 'Business School of Marketing', degree: 'BA in Marketing', start_date: '2006-09-01', end_date: '2010-06-30' },
      // Carlos
      { person_id: 3, institution_name: 'Community College', degree: 'Associate Degree in Web Development', start_date: '2013-09-01', end_date: '2015-06-30' },
    ];

    const professionalHistoryData = [
      // Juan
      { person_id: 1, company_name: 'Data Solutions', job_title: 'Junior Developer', start_date: '2014-07-01', end_date: '2016-12-31' },
      { person_id: 1, company_name: 'Innovate Inc.', job_title: 'Senior Developer', start_date: '2017-01-15', end_date: null },
      // María
      { person_id: 2, company_name: 'Market Leaders', job_title: 'Marketing Assistant', start_date: '2010-07-01', end_date: '2015-02-28' },
      { person_id: 2, company_name: 'Market Leaders', job_title: 'Marketing Manager', start_date: '2015-03-01', end_date: null },
      // Carlos
      { person_id: 3, company_name: 'Innovate Inc.', job_title: 'Intern', start_date: '2015-07-01', end_date: '2015-12-31' },
      { person_id: 3, company_name: 'Data Solutions', job_title: 'Frontend Developer', start_date: '2016-01-10', end_date: null },
    ];

    const personSkillsData = [
      // Juan (React Dev)
      { person_id: 1, skill_id: 1, proficiency_level: 'Advanced' }, // JS
      { person_id: 1, skill_id: 2, proficiency_level: 'Advanced' }, // React
      { person_id: 1, skill_id: 5, proficiency_level: 'Fluent' },     // English
      // María (Manager)
      { person_id: 2, skill_id: 4, proficiency_level: 'Advanced' }, // Proj. Management
      { person_id: 2, skill_id: 6, proficiency_level: 'Native' },      // Spanish
      { person_id: 2, skill_id: 5, proficiency_level: 'Intermediate' },// English
      // Carlos (Python Dev)
      { person_id: 3, skill_id: 3, proficiency_level: 'Advanced' }, // Python
      { person_id: 3, skill_id: 1, proficiency_level: 'Intermediate' },// JS
      { person_id: 3, skill_id: 6, proficiency_level: 'Native' },      // Spanish
    ];

    // Insertar datos
    await db.people.bulkAdd( peopleData );
    await db.companies.bulkAdd( companiesData );
    await db.skills.bulkAdd( skillsData );
    await db.personal_info.bulkAdd( personalInfoData );
    await db.academic_history.bulkAdd( academicHistoryData );
    await db.professional_history.bulkAdd( professionalHistoryData );
    await db.person_skills.bulkAdd( personSkillsData );
  } );
}

export async function clearDatabase () {
  await db.transaction( 'rw', db.tables, async () => {
    await Promise.all( db.tables.map( table => table.clear() ) );
  } );
}
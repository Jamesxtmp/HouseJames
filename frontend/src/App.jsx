import { useState, useEffect } from 'react';
import './App.css';
import { db } from './db';
import * as dbManager from './components/DatabaseManager';

// --- FORMULARIOS ---

const PersonForm = ({ onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addPerson(firstName, lastName, dob); setFirstName(''); setLastName(''); setDob(''); onAdd(); };
  return ( <form onSubmit={handleSubmit}> <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required /> <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required /> <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /> <button type="submit">Add Person</button> </form> );
};

const CompanyForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addCompany(name, industry); setName(''); setIndustry(''); onAdd(); };
  return ( <form onSubmit={handleSubmit}> <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company Name" required /> <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" /> <button type="submit">Add Company</button> </form> );
};

const SkillForm = ({ onAdd }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('');
  const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addSkill(skillName, category); setSkillName(''); setCategory(''); onAdd(); };
  return ( <form onSubmit={handleSubmit}> <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Skill Name" required /> <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" /> <button type="submit">Add Skill</button> </form> );
};

const PersonSkillForm = ({ people, skills, onAdd }) => {
  const [personId, setPersonId] = useState('');
  const [skillId, setSkillId] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addPersonSkill(parseInt(personId), parseInt(skillId), level); setPersonId(''); setSkillId(''); onAdd(); };
  return ( <form onSubmit={handleSubmit}> <select value={personId} onChange={e => setPersonId(e.target.value)} required><option value="">Select Person</option>{people.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}</select> <select value={skillId} onChange={e => setSkillId(e.target.value)} required><option value="">Select Skill</option>{skills.map(s => <option key={s.id} value={s.id}>{s.skill_name}</option>)}</select> <input type="text" value={level} onChange={e => setLevel(e.target.value)} placeholder="Proficiency Level" /> <button type="submit">Assign Skill</button> </form> );
}

const AcademicHistoryForm = ({ people, onAdd }) => {
  const [personId, setPersonId] = useState('');
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addAcademicHistory(parseInt(personId), institution, degree); setPersonId(''); setInstitution(''); setDegree(''); onAdd(); };
  return ( <form onSubmit={handleSubmit}> <select value={personId} onChange={e => setPersonId(e.target.value)} required><option value="">Select Person</option>{people.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}</select> <input type="text" value={institution} onChange={e => setInstitution(e.target.value)} placeholder="Institution" required/> <input type="text" value={degree} onChange={e => setDegree(e.target.value)} placeholder="Degree" /> <button type="submit">Add Academic History</button> </form> );
}

const ProfessionalHistoryForm = ({ people, companies, onAdd }) => {
    const [personId, setPersonId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const handleSubmit = async (e) => { e.preventDefault(); await dbManager.addProfessionalHistory(parseInt(personId), companyName, title); setPersonId(''); setCompanyName(''); setTitle(''); onAdd(); }
    return ( <form onSubmit={handleSubmit}> <select value={personId} onChange={e => setPersonId(e.target.value)} required><option value="">Select Person</option>{people.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}</select> <select value={companyName} onChange={e => setCompanyName(e.target.value)} required><option value="">Select Company</option>{companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select> <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" required /> <button type="submit">Add Professional History</button> </form> );
}

const PersonalInfoForm = ({ people, onAdd }) => {
    const [personId, setPersonId] = useState('');
    const [emails, setEmails] = useState([{ type: 'personal', address: '' }]);
    const [phones, setPhones] = useState([{ type: 'personal', number: '' }]);

    const handleEmailChange = (index, field, value) => {
        const newEmails = [...emails];
        newEmails[index][field] = value;
        setEmails(newEmails);
    };

    const addEmail = () => setEmails([...emails, { type: 'personal', address: '' }]);
    const removeEmail = (index) => setEmails(emails.filter((_, i) => i !== index));

    const handlePhoneChange = (index, field, value) => {
        const newPhones = [...phones];
        newPhones[index][field] = value;
        setPhones(newPhones);
    };

    const addPhone = () => setPhones([...phones, { type: 'personal', number: '' }]);
    const removePhone = (index) => setPhones(phones.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dbManager.addPersonalInfo(parseInt(personId), emails, phones);
        setPersonId('');
        setEmails([{ type: 'personal', address: '' }]);
        setPhones([{ type: 'personal', number: '' }]);
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={personId} onChange={e => setPersonId(e.target.value)} required>
                <option value="">Select Person</option>
                {people.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
            </select>

            {emails.map((email, index) => (
                <div key={`email-${index}`}>
                    <input type="email" value={email.address} onChange={e => handleEmailChange(index, 'address', e.target.value)} placeholder="Email Address" />
                    <select value={email.type} onChange={e => handleEmailChange(index, 'type', e.target.value)}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="button" onClick={() => removeEmail(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addEmail}>Add Email</button>

            {phones.map((phone, index) => (
                <div key={`phone-${index}`}>
                    <input type="tel" value={phone.number} onChange={e => handlePhoneChange(index, 'number', e.target.value)} placeholder="Phone Number" />
                    <select value={phone.type} onChange={e => handlePhoneChange(index, 'type', e.target.value)}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="button" onClick={() => removePhone(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addPhone}>Add Phone</button>

            <button type="submit" style={{marginTop: '1rem'}}>Add Personal Info</button>
        </form>
    );
}

// --- COMPONENTE PRINCIPAL ---

function App() {
  const [data, setData] = useState({ people: [], companies: [], skills: [], personSkills: [], academicHistory: [], professionalHistory: [], personalInfo: [] });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [people, companies, skills, personSkills, academicHistory, professionalHistory, personalInfo] = await Promise.all([
      db.people.toArray(),
      db.companies.toArray(),
      db.skills.toArray(),
      db.person_skills.toArray(),
      db.academic_history.toArray(),
      db.professional_history.toArray(),
      db.personal_info.toArray(),
    ]);
    setData({ people, companies, skills, personSkills, academicHistory, professionalHistory, personalInfo });
  };

  const handleSeedDatabase = async () => { await dbManager.seedDatabase(); fetchAllData(); alert('DB Seeded!'); };
  const handleClearDatabase = async () => { await dbManager.clearDatabase(); fetchAllData(); alert('DB Cleared!'); };

  const getSkillName = (skillId) => data.skills.find(s => s.id === skillId)?.skill_name || 'Unknown Skill';

  return (
    <div>
      <h1>Data Management</h1>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleSeedDatabase}>Seed Database</button>
        <button onClick={handleClearDatabase} style={{ marginLeft: '1rem' }}>Clear Database</button>
      </div>
      <hr />

      <details>
        <summary><strong>Add Base Entries</strong></summary>
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
          <div><h4>Person</h4><PersonForm onAdd={fetchAllData} /></div>
          <div><h4>Company</h4><CompanyForm onAdd={fetchAllData} /></div>
          <div><h4>Skill</h4><SkillForm onAdd={fetchAllData} /></div>
        </div>
      </details>

      <details>
        <summary><strong>Add Relational Entries</strong></summary>
        <div style={{padding: '1rem'}}>
          <h4>Assign Skill to Person</h4>
          <PersonSkillForm people={data.people} skills={data.skills} onAdd={fetchAllData} />
          <h4 style={{marginTop: '1rem'}}>Add Academic History</h4>
          <AcademicHistoryForm people={data.people} onAdd={fetchAllData} />
          <h4 style={{marginTop: '1rem'}}>Add Professional History</h4>
          <ProfessionalHistoryForm people={data.people} companies={data.companies} onAdd={fetchAllData} />
           <h4 style={{marginTop: '1rem'}}>Add Personal Info</h4>
          <PersonalInfoForm people={data.people} onAdd={fetchAllData} />
        </div>
      </details>
      <hr />

      <h2>Data Overview</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        <div>
            <h3>People & Their Data</h3>
            {data.people.map(person => (
                <details key={person.id} style={{marginBottom: '1rem'}} open>
                    <summary><strong>{person.first_name} {person.last_name}</strong></summary>
                    <div style={{paddingLeft: '2rem'}}>
                        {data.personalInfo.filter(pi => pi.person_id === person.id).map(pi => 
                            <div key={pi.id}>
                                <h4>Contact Info</h4>
                                <ul>
                                    {(pi.email_addresses || []).map((email, index) => email.address && <li key={`email-${index}`}><strong>{email.type}:</strong> {email.address}</li>)}
                                    {(pi.phone_numbers || []).map((phone, index) => phone.number && <li key={`phone-${index}`}><strong>{phone.type} phone:</strong> {phone.number}</li>)}
                                </ul>
                            </div>
                        )}
                        
                        <h4>Academic History</h4>
                        <ul>
                            {data.academicHistory.filter(ah => ah.person_id === person.id).map(ah => 
                                <li key={ah.id}>{ah.degree} at {ah.institution_name}</li>
                            )}
                        </ul>

                        <h4>Professional History</h4>
                        <ul>
                            {data.professionalHistory.filter(ph => ph.person_id === person.id).map(ph => 
                                <li key={ph.id}>{ph.job_title} at {ph.company_name}</li>
                            )}
                        </ul>

                        <h4>Skills</h4>
                        <ul>
                            {data.personSkills.filter(ps => ps.person_id === person.id).map(ps => 
                                <li key={ps.skill_id}>{getSkillName(ps.skill_id)} ({ps.proficiency_level})</li>
                            )}
                        </ul>
                    </div>
                </details>
            ))}
        </div>
        <div>
            <h3>All Companies</h3>
            <ul>{data.companies.map(c => <li key={c.id}>{c.name}</li>)}</ul>
        </div>
         <div>
            <h3>All Skills</h3>
            <ul>{data.skills.map(s => <li key={s.id}>{s.skill_name}</li>)}</ul>
        </div>
      </div>

    </div>
  );
}

export default App;
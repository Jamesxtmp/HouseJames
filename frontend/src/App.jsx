import { useState, useEffect } from 'react';
import './App.css';
import { db } from './db';
import { addPerson, seedDatabase, clearDatabase } from './components/DatabaseManager';

function App() {
  const [people, setPeople] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  async function fetchPeople() {
    const allPeople = await db.people.toArray();
    setPeople(allPeople);
  }

  const handleAddPerson = async () => {
    try {
      await addPerson(firstName, lastName, dob);
      fetchPeople(); // Refresh list
      // Clear form
      setFirstName('');
      setLastName('');
      setDob('');
    } catch (error) {
      console.error(`Failed to add person: ${error}`);
      alert(`Failed to add person: ${error.message}`);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      await seedDatabase();
      fetchPeople(); // Refresh list
      alert('Database seeded successfully!');
    } catch (error) {
      console.error(`Failed to seed database: ${error}`);
      alert('Failed to seed database. Check console for details.');
    }
  };

  const handleClearDatabase = async () => {
    try {
      await clearDatabase();
      fetchPeople(); // Refresh list
      alert('Database cleared successfully!');
    } catch (error) {
      console.error(`Failed to clear database: ${error}`);
      alert('Failed to clear database. Check console for details.');
    }
  };

  return (
    <div>
      <h1>People Management</h1>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleSeedDatabase}>Seed Database</button>
        <button onClick={handleClearDatabase} style={{ marginLeft: '1rem' }}>Clear Database</button>
      </div>
      
      <hr />

      <h2>Add New Person</h2>
      <div>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <button onClick={handleAddPerson}>Add Person</button>
      </div>

      <hr />

      <h2>People List</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.first_name} {person.last_name} (Born: {person.date_of_birth})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

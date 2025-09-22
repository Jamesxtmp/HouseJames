CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    location TEXT,
    website VARCHAR(255)
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100)  -- Ej: "Idioma", "Programación", "Habilidad Blanda"
);

CREATE TABLE personal_info (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL UNIQUE REFERENCES people(id) ON DELETE CASCADE,
    -- Puede tener varios correos en json
    email_addresses JSONB,
    -- Puede tener varios números de teléfono
    phone_numbers JSONB,
    address TEXT,
    nationality VARCHAR(100)
);

CREATE TABLE academic_history (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT
);

CREATE TABLE professional_history (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    responsibilities TEXT
);

CREATE TABLE person_skills (
    person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50), -- Ej: "Básico", "Intermedio", "Avanzado"
    PRIMARY KEY (person_id, skill_id) -- Evita que una persona tenga la misma habilidad dos veces
);

--creat datos de prueba
INSERT INTO people (first_name, last_name, date_of_birth)
VALUES ('Juan', 'Pérez', '1990-05-15'),
       ('María', 'Gómez', '1985-10-30');
INSERT INTO companies (name, industry, location, website)
VALUES ('ABC Corporation', 'Technology', '123 Tech St, Cityville', 'https://www.abccorp.com'),
       ('XYZ Ltd.', 'Finance', '456 Finance Ave, Townsville', 'https://www.xyzltd.com');
INSERT INTO skills (skill_name, category)
VALUES ('JavaScript', 'Programming'),
       ('Project Management', 'Soft Skill'),
       ('Spanish', 'Language');
INSERT INTO personal_info (person_id, email_addresses, phone_numbers, address, nationality)
VALUES (1, '{"personal": "personal@correo.com", "work": "work@correo.com"}', '{"personal": "123-456-7890", "work": "987-654-3210"}', '123 Main St, Cityville', 'Mexican'),
       (2, '{"personal": "personal@correo.com", "work": "work@correo.com"}', '{"personal": "555-123-4567", "work": "555-987-6543"}', '456 Elm St, Townsville', 'English');
INSERT INTO academic_history (person_id, institution_name, degree, field_of_study, start_date, end_date, description)
VALUES (1, 'University of Cityville', 'BSc Computer Science', 'Computer Science', '2010-09-01', '2014-06-30', 'Graduated with honors'),
       (2, 'Townsville College', 'BA Business Administration', 'Business', '2005-09-01', '2009-06-30', 'Focused on finance and marketing');
INSERT INTO professional_history (person_id, company_name, job_title, start_date, end_date, responsibilities)
VALUES (1, 'ABC Corporation', 'Software Developer', '2014-07-01', '2021-06-30', 'Developed web applications'),
       (2, 'XYZ Ltd.', 'Financial Analyst', '2009-07-01', '2018-12-31', 'Analyzed market trends and financial data');
INSERT INTO person_skills (person_id, skill_id, proficiency_level)
VALUES (1, 1, 'Advanced'), -- Juan tiene habilidad en JavaScript
       (1, 2, 'Intermediate'), -- Juan tiene habilidad en Project Management
       (1, 3, 'Native'), -- Juan tiene habilidad en Spanish
       (2, 2, 'Advanced'), -- María tiene habilidad en Project Management
       (2, 3, 'Fluent'); -- María tiene habilidad en Spanish


-- Consulta para verificar los datos insertados
SELECT * FROM people;

-- Consulta todas la personas que hablen español
SELECT p.first_name, p.last_name, s.skill_name
FROM people p
JOIN person_skills ps ON p.id = ps.person_id
JOIN skills s ON ps.skill_id = s.id
WHERE s.skill_name = 'Spanish';
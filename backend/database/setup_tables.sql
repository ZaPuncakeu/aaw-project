CREATE TABLE public.admin (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL
);
INSERT INTO public.admin(email, pass) VALUES('admin@test.com', '$2a$10$6E0hhTSKZtegOqE.8uPUkO.iDpMFlh7f6jZOMVYMFqGW40xJQTJuG');
CREATE TABLE public.users (
    id_user SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL
);
CREATE TABLE public.species (
    id_specie SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL
);
CREATE TABLE public.animals (
    id_animal SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    photos TEXT NOT NULL,
    aliases TEXT NOT NULL,
    continent TEXT NOT NULL,
    countries TEXT NOT NULL,
    description TEXT NOT NULL,
    origin_description TEXT NOT NULL,
    lifestyle TEXT NOT NULL,
    nutrition TEXT NOT NULL,
    diet TEXT NOT NULL,
    species INT,
    lifespan INT NOT NULL,
    weight TEXT NOT NULL,
    length TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    position TEXT NOT NULL,
    CONSTRAINT fk1 FOREIGN KEY(species) REFERENCES species(id_specie)
);
CREATE TABLE public.favourites (
    id_user INT,
    id_animal INT,
    CONSTRAINT fk2 FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    CONSTRAINT fk3 FOREIGN KEY(id_animal) REFERENCES animals(id_animal) ON DELETE CASCADE,
    CONSTRAINT pk_user_animal PRIMARY KEY(id_user, id_animal)
);
CREATE TABLE public.attractions (
    id_attraction SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
);
CREATE TABLE public.tokens (
    token VARCHAR(255) NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
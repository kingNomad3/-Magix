DROP TABLE IF EXISTS populaire;

-- DELETE FROM populaire;

CREATE TABLE populaire (
    id serial PRIMARY KEY,
    id_carte INTEGER NOT NULL,
    joueur VARCHAR(20) NOT NULL
);

SELECT * FROM populaire;
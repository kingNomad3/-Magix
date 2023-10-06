<?php
    require_once("action/DAO/Connection.php");
    
    class UserDAO {

        public static function authenticate($username, $password) {
            // 1 - Établir la connexion
            $connection = Connection::getConnection();

            // 2 - Préparer la requête (SELECT, ou autre)
            $statement = $connection->prepare("SELECT * FROM users WHERE username = ?");
            $statement->bindParam(1, $username); // Premier ?, place username et nettoie-le
            $statement->setFetchMode(PDO::FETCH_ASSOC); // si absent, alors $row[0], $row[1]

            // 3 - Exécuter la requête
            $statement->execute();

            // var_dump($statement->fetchAll());
            // exit;

            $user = null;
            // 4 - Chercher le résultat
            // Tant qu'il y a des lignes, prendre 1 à la fois
            // $rows = $statement->fetchAll();
            if ($row = $statement->fetch()) {
                if (password_verify($password, $row["password"])) {
                    $user = [
                        "username" => $row["first_name"],
                        "visibility" => $row["visibility"],
                    ];
                }
            } 

            return $user;
        }

        public static function updateLastLogin($user) {
            // 1 - Établir la connexion
            $connection = Connection::getConnection();
        }

        public static function updateProfile($userId, $newPassword) {
            // ...
        }
    }
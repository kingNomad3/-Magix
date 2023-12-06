<?php
    require_once("action/DAO/Connection.php");
    
    class UserDAO {

        public static function authenticate($username, $password) {
       
            $connection = Connection::getConnection();

    
            $statement = $connection->prepare("SELECT * FROM users WHERE username = ?");
            $statement->bindParam(1, $username); 
            $statement->setFetchMode(PDO::FETCH_ASSOC); 

            $statement->execute();

            // var_dump($statement->fetchAll());
            // exit;

            $user = null;
       
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

      
    }
<?php
    require_once("action/DAO/Connection.php");
    require_once("action/DAO/PopulariteDAO.php");

    class PopularityDAO {
        public static function getCards() {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT id_carte, COUNT(id_carte) AS cards_by_id FROM populaire GROUP BY id_carte ORDER BY id_carte, cards_by_id;");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function carteParJoeur() {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT joueur, id_carte, COUNT(id_carte) AS cards_by_id FROM populaire GROUP BY id_carte, player ORDER BY player, id_carte, cards_by_id;");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function addCardDB($id_carte, $joueur) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO populaire (id_carte, player) VALUES (?, ?)");
            $statement->bindParam(1, $id_carte);
            $statement->bindParam(2, $joueur);
            $statement->execute();
        }

    
    }
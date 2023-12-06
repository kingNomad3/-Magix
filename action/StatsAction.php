<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/PopulariteDAO.php");

    class StatsAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $parjoueur = "";
            $getcards = "";

            if(!empty($_POST["parjoueur"])){
                $parjoueur = PopulariteDAO::carteParJoeur();
            }

            if(!empty($_POST["getcards"])){
                $getcards = PopulariteDAO::getCards();
            }
            
           return compact("getcards","parjoueur");
        }
    }             

<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/PopulariteDAO.php");

    class AjaxDataAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if(isset($_POST["id_carte"]) && isset($_POST["joueur"]))
                PopularityDAO::addCardDB($_POST["id_carte"], $_POST["joueur"]);

           
            
            if(isset($_POST["joueur"])) {
                $result = PopularityDAO::carteParJoeur();
            } 


            return compact("result");
        }
    }
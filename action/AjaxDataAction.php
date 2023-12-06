<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/PopulariteDAO.php");

    class AjaxDataAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $id = $_POST["id_carte"];
            $joueur = $_POST["joueur"];

            PopulariteDAO::addCardDB($id,$joueur);

         

            return [];
        }
    }
<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["type"] = $_POST["type"];
            $data["key"] = $_SESSION["key"];
            $result = parent::callAPI($_POST["callType"], $data);


            return compact("result");
        }
    }
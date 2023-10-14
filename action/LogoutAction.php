<?php
    require_once("action/CommonAction.php");

    class LogoutAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if(isset($_SESSION["key"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                $result = parent::callAPI("signout", $data);
                
                if($result == "INVALID_KEY") 
                    var_dump("INVALID_KEY");
                else {
                    session_unset();
                    session_destroy();
                    session_start();
                    header("location:index.php");
                }
            }
            
        }
    }
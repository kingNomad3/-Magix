<?php 

    require_once("action/CommonAction.php");

    class LoginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["username"] = "Kingnomad";
            $data["password"] = "Ella199845";

            $result = parent::callAPI("signin", $data);

            if ($result == "INVALID_USERNAME_PASSWORD") {
                // err
            }
            else {
                // Pour voir les informations retournées : 
                    // var_dump($result);exit;
                $key = $result->key;
            }
                    return [];
                }

    }
    

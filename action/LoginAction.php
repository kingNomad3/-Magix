<?php 

    require_once("action/CommonAction.php");

    class LoginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            if (isset($_POST{"username"})){
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["pwd"];

            

            $result = parent::callAPI("signin", $data);


            if ($result == "INVALID_USERNAME_PASSWORD") {
                // err 
                print("error");
                // var_dump($result);exit;
            }
            else {
                    // Debugging statement:
                    echo "Attempting to redirect to lobby.php";
                   

                    $key = $result->key;
                    $_SESSION["key"] = $key;
                    $_SESSION["username"] = $_POST["username"];
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    header("location:lobby.php");
                    exit;
                // Pour voir les informations retournées : 
                    // var_dump($result);exit;

                // $key = $result->key;
            }
        }
                    return [];
                }

    }
    

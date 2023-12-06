<?php
    require_once("action/StatsAction.php");
  


    $action = new StatsAction();
    $data = $action->execute();

   
    var_dump($data["parjoueur"]);
    echo json_encode($data["parjoueur"]);
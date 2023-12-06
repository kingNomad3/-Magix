<?php
    require_once("action/AjaxDataAction.php");

    $action = new AjaxDataAction();
    $data = $action->execute();

    echo json_encode($data["result"]);
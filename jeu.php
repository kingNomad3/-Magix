<?php
    require_once("action/JeuAction.php");

    $action = new jeuAction();
    $data = $action->execute();

    $pageName = "jeu.php";

    require_once("partial/header.php");
?>
<link rel="stylesheet" href="css/game.css">
<script defer src="js/game.js"></script>
<!-- <link rel="stylesheet" href="css/index.css"> -->


<div class="errorMessage"></div>

<div class="chat-container">
        <iframe class="chat-box" style="width:700px;height:330px;border:0" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>"> 
        </iframe>
</div>



<div onclick="toggleChat()" class="toggle-chat">chat-box</div>
<div onclick="toggleActions()" class="toggle-action">Actions</div>

<div class="latestAction">
</div>



<div id="opponent-side">
    <div class="remainingTurnTime">
        <div class="turn-pic">
            <div class="time-node">

            </div>
        </div>
    </div>  
    <div class="opponent-hand">
    </div>
    <div id="opponent-info">
        <div class="opponent-health"></div>
        <div class="opponent-deck"></div>
        <div class="opponent-mp"></div>
    </div>
</div>

<div class="board">
    <div class="opponent-board">
    </div>
    <div class="opponent-credentials">
        <div class="spacer"></div>
        <div class="opponent-name"></div>
        <div class="opponent-pic"></div>
        <div class="opponent-class"></div>
        <div class="spacer"></div>
    </div>
</div>

<div class="board">
    <div class="player-board">
    </div>
    <div class="player-credentials">
        <div class="spacer"></div>
        <div class="player-name"><?=  $_SESSION["username"] ?></div>   
        <div class="player-pic"></div>
        <div class="player-class"></div>
        <div class="spacer"></div>
    </div>
</div>

<div id="player-side">
    <div class="player-info">
        <div class="player-health"></div>
        <div class="player-deck"></div>
        <div class="player-mp"></div>
    </div>

    <div class="player-hand">

    </div>

    <div class="action-button">
        <div onclick="actionGame('SURRENDER', 'games/action')" class="basic-action surrender">
            surrender
        </div>
        <div class="basic-action" id="heroPower">
            Hero Power
        </div>
        <div onclick="actionGame('END_TURN', 'games/action')"  class="basic-action end-turn">
            End turn
        </div>
    </div>
</div>

<?php
    require_once("partial/footer.php");
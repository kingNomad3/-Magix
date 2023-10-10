<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    $pageName = "lobby.php";

    require_once("partial/header.php");
?>

<h1>LOBBY</h1>

<h4>BIENVENUE MIMI</h4>
<h2><?= $data["username"] ?></h2>

<div class="action-box">
    <a class="action-href" href="deck.php" class="deck-button">DECK</a>
    <button class="action-button" onclick="chooseGame('TRAINING', 'games/auto-match')">
        PRACTICE
    </button>
    <button class="action-button" onclick="chooseGame('PVP', 'games/auto-match')">
        PLAY
    </button>
    <a class="action-href" href="stats.php">ARCHIVES</a>
    <a class="action-href" href="logout.php" class="quit-button">LEAVE</a>
</div>

<div class="chat-container">
    <div class="chat-box">
        <iframe class="chat-box" style="width:700px;height:330px;border:0"  onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>"> 
        </iframe>
    </div>
</div>

<?php
    require_once("partial/footer.php");
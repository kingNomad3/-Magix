<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
    $pageName = "lobby.php";

    require_once("partial/header.php");
?>

    <link rel="stylesheet" href="css/loby.css">


<div class="canvas-container">
<script src="js/global.js"></script>
<script src="js/javacsript.js"></script>
<script src="js/sprites/heartkitty.js"></script>

</div>
<script>
    alert("Inline script executed!");
</script>
<script src="js/javacsript.js"></script>
<h4>WELCOME, LITTLE KITTEN</h4>
<h1>This is where you can talk to other kitties</h1>
<!-- <h2><?= $data["username"] ?></h2> -->

<div class="action-box">
    <a class="action-href" href="deck.php" class="deck-button">DECK</a>
    <button class="action-button" onclick="chooseGame('TRAINING', 'games/auto-match')">
        PRACTICE
    </button>
    <button class="action-button" onclick="chooseGame('PVP', 'games/auto-match')">
        PLAY
    </button>
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
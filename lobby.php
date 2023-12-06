<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<link rel="stylesheet" href="css/loby.css">

<div class="canvas-container">
    <script src="js/global.js"></script>
    <script src="js/javacsript.js"></script>
    <script src="js/index.js"></script>
    <script src="js/sprites/heartkitty.js"></script>
    <script src="js/TiledImage.js"></script>
</div>

<h4>MOWELCOME, WITTLE KITTEN</h4>
<h1 >hey, <span id="username-placeholder"><?= $_SESSION["username"] ?></span> this is where you can talk to other kitties</h1>

<div class="action-box">
    <a class="action-href" href="deck.php" class="deck-button">MOWECK</a>
    <button class="action-button" onclick="chooseGame('TRAINING', 'games/auto-match')">
        MOWTICE
    </button>
    <button class="action-button" onclick="chooseGame('PVP', 'games/auto-match')">
        MOWLAY
    </button>
    <a class="action-href" href="stats.php" class="deck-button">MAOWCHIVE</a>
    <a class="action-href" href="logout.php" class="quit-button">MOWEAVE</a>
</div>

<div class="content-container">
    <div class="canvas-container">
         <canvas id="canvas" data-full="true" class="full-canvas" width="1536" height="707"></canvas>
    </div>
    <div class="chat-container">
        <iframe class="chat-box" style="width:700px;height:330px;border:0" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>"> 
        </iframe>
    </div>
    <div class="canvas-container">
         <canvas id="canvas" data-full="true" class="full-canvas" width="1536" height="707"></canvas>
    </div>
</div>

<?php
    require_once("partial/footer.php");
?>

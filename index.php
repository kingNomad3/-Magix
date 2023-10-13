<?php
    require_once("action/LoginAction.php");

    $action = new LoginAction();
    $data = $action->execute();

    require_once("partial/header.php");
?> 
<script src="js/TiledImage.js"></script>
<script src="js/global.js"></script>
<script src="js/index.js"></script>
<script src="js/sprites/kitty.js"></script>
<script src="js/sprites/kitty2.js"></script>
<script src="js/sprites/Sparkles.js"></script>

<h1>WELCOME TO Hello kitty world </h1>
<link rel="stylesheet" href="css/index.css">

<div class="canvas-container">
    <!-- <canvas id="canvas" data-full="true" class="full-canvas" width="1536" height="707"></canvas> -->
    <!-- <canvas id="kittyheart" data-full="true" class="full-canvas" width="1536" height="707"></canvas> -->
    <canvas id="sparkles" data-full="true" class="full-canvas" width="1536" height="707"></canvas>
</div>

<form action="index.php" method="post">
    <div class="form-label">
        <label for="username">Nom d'usager : </label>
    </div>
    <div class="form-input">
        <input type="text" name="username" id="username" />
    </div>

    <div class="form-separator"></div>
    <div class="form-label">
        <label for="password">Mot de passe : </label>
    </div>
    <div class="form-input">
        <input type="password" name="pwd" id="password" />
    </div>

    <div class="form-separator"></div>
    <div class="form-label">&nbsp;</div>
    <div class="form-input">
        <button type="submit">Connexion</button>
   


<?php
    require_once("partial/footer.php");
?>

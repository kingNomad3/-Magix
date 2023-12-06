<?php
    require_once("action/StatsAction.php");
    require_once("action/DAO/PopulariteDAO.php");

    $action = new StatsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script defer src="js/javacsript.js"></script>
<link rel="stylesheet" href="css/stats.css">
<a href="lobby.php"><= LOBBY</a> 
<div class="title-div">ARCHIVES</div>


<div id="main-container">
    <div class="favorites-container">
        
    </div>
</div>



<div>
    <button class="with-players">Par Joueur</button>
    <button class="without-players">Par populatir</button>
</div>
<img src="images/DeckCards/carte73.png" alt="Description of the image">

<?php
    require_once("partial/footer.php");

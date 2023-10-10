<?php
    require_once("action/DeckAction.php");

    $action = new DeckAction();
    $data = $action->execute();

    $pageName = "deck.php";

    require_once("partial/header.php");
?>

<a href="lobby.php"><= LOBBY</a>
<div class="deck-div">
    <h1>DECK</h1>
    <iframe src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
    </iframe>
</iframe>

</div>

<?php
    require_once("partial/footer.php");
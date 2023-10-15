<?php
    require_once("action/DeckAction.php");

    $action = new DeckAction();
    $data = $action->execute();

    $pageName = "deck.php";

    require_once("partial/header.php");
?>
<link rel="stylesheet" href="css/deck.css">

<h1 class="deck-title">Choose your kitten army</h1>
<a href="lobby.php" class="lobby-button"> KITTEN LOBBY</a>
<iframe src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>" width="100%" height="100%"></iframe>


</iframe>

</div>

<?php
    require_once("partial/footer.php");
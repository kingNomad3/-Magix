<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();
	// $pageName = "index.php";

	require_once("partial/header.php");
?> 

<h1>WELCOME TO Hello kitty world </h1>


		<form action="" index.php method="post">

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

			<div class="form-label">
				&nbsp;
			</div>
			<div class="form-input">
				<button type="submit">Connexion</button>
               
<?php
	require_once("partial/footer.php");
<?php
    require_once("action/StatsAction.php");
    require_once("action/DAO/PopulariteDAO.php");

    $action = new StatsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script defer src="js/javacsript.js"></script>
<script defer src="js/game.js"></script>
<link rel="stylesheet" href="css/stats.css">
<a href="lobby.php"><= LOBBY</a> 


<div class="title-div">MOWRCHIVES</div>

<div>
    <button class="with-players" onclick="getCards()">Par Joueur</button>
    <button class="without-players">Par popularite</button>
</div>


<img src="images/DeckCards/carte73.png" alt="Description of the image">
<div class="data-line">
        <canvas id="pie-chart"></canvas>
        <script>
            const data = {
                labels: ['Simple', 'Double', 'Suite'],
                datasets: [{
                    label: 'Carte',
                    data: [10, 50, 30],
                    color: "#fff",
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                }]
            };

            const config = {
                type: 'pie',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    }
                }
            };

            new Chart(document.getElementById('pie-chart'), config);
        </script>
    </div>



<?php
    require_once("partial/footer.php");

<?php
    require "./includes/data-collector.php"; // Muss zuerst sein wegen start_session()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>

  
<style>
 .btn1
{
   text-align: center;
   width: 10px;
   height: 40px;
}
</style>
</head>
   <?php include "header.php"?> 
<body class="report">
    <?php
        /*
            Bestimme die Anzahl der erreichten Punkte. Dazu wird das
            'value'-Attribut des Feldes 'single-choice' ausgewertet.

            Wichtig: Sämtliche $_SESSION-Werte müssen fertig gesetzt sein,
                     bevor die Punktzahlen gesammelt werden dürfen.
        */
        $totalPoints = 0;

        foreach ($_SESSION as $name => $value) {
            if (str_contains($name, 'question-')) {
                if (isset($value["single-choice"])) {
                    $points = intval($value["single-choice"]);
                    $totalPoints = $totalPoints + $points; // Kurzform: $totalPoints += $points;
                }
            }
        }

        // Maximal mögliche Punkte
        $maxPoints = $_SESSION["quiz"]["questionNum"];
    ?>

    <div class="row">
        <div class="col-sm-8">
            <!-- Bilanz -->
            <h7>Félicitations!</h7>
            <h3>Vous avez obtenu <?php echo $totalPoints; ?> points sur 
                    <?php echo $maxPoints; ?> possible.</h3>

        </div>

        <button class="btn1 btn-success" onclick="document.location='/index.php';"  >Neues Quiz</button>
    </div>
   
<?php include "footer.php"?>
</body>
</html>  
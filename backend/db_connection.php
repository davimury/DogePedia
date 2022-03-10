<?php
function OpenCon()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "doge_pedia";
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Conexão falhou: %s\n" . $conn->error);

    // Tenta criar a tabela breeds
    $sql = "CREATE TABLE breeds(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        bred_for VARCHAR(30),
        breed_group VARCHAR(30),
        breed_height VARCHAR(30),
        life_span VARCHAR(30),
        breed_name VARCHAR(30),
        origin VARCHAR(30),
        reference_image_id VARCHAR(30),
        temperament VARCHAR(30),
        breed_weight VARCHAR(30)
    )";

    if (mysqli_query($conn, $sql)) {
        echo "Tabela criada com sucesso. <br>";
    } else {
        echo "ERROR: Não foi possivel executar $sql. " . mysqli_error($conn);
    }

    return $conn;
}

function CloseCon($conn)
{
    $conn->close();
}

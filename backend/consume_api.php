<?php
include (__DIR__.'\db_connection.php');
include (__DIR__.'\api_connection.php');

$conn = OpenCon();
echo "Conectado com sucesso <br>";

$result = CallAPI('GET', 'https://api.thedogapi.com/v1/breeds', []);

foreach (json_decode($result, true) as &$valor) {
    $sql = "INSERT INTO breeds (
        bred_for, 
        breed_group, 
        breed_height, 
        life_span, 
        breed_name, 
        origin, 
        reference_image_id, 
        temperament, 
        breed_weight
        ) VALUES ( 
            '{$valor['bred_for']}', 
            '{$valor['breed_group']}', 
            '{$valor['height']['metric']}', 
            '{$valor['life_span']}',
            '{$valor['name']}',
            '{$valor['origin']}',
            '{$valor['reference_image_id']}',
            '{$valor['temperament']}',
            '{$valor['weight']['metric']}'
        )";

    if (mysqli_query($conn, $sql)) {
        echo "Breed: {$valor['name']} adicionada a tabela <br>";
    } else {
        echo "ERROR: Não foi possivel executar $sql. " . mysqli_error($conn);
    }
}

CloseCon($conn);
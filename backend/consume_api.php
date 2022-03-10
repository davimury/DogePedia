<?php
include (__DIR__.'\db_connection.php');
include (__DIR__.'\api_connection.php');

$conn = OpenCon();
echo "<br> <br> Conectado com sucesso <br>";

$LIMIT_COUNT    = 50;
$curr_page      = 0;

list($header, $body) = CallAPI('GET', 'https://api.thedogapi.com/v1/breeds', ['limit' => $LIMIT_COUNT, 'page'=> $curr_page]);

$pagination_count   = (int)$header['pagination-count'];
$lastPage           = ceil($pagination_count / $LIMIT_COUNT) - 1;
/* list($header, $body) = explode("\r\n\r\n", $response, 2); */
$breed_id = 0;

do {
    echo "<br><br>Pagina {$curr_page}: <br><br>";
    if ($curr_page != 0) 
        list($header, $body) = CallAPI('GET', 'https://api.thedogapi.com/v1/breeds', ['limit' => $LIMIT_COUNT, 'page'=> $curr_page]);

    foreach (json_decode($body, true) as &$valor) {
        $bred_for           = $valor['bred_for'] ?? '';
        $breed_group        = $valor['breed_group'] ?? '';
        $breed_height       = $valor['height']['metric'] ?? '';
        $life_span          = $valor['life_span'] ?? '';
        $breed_name         = $valor['name'] ?? '';
        $origin             = $valor['origin'] ?? '';
        $reference_image_id = $valor['reference_image_id'] ?? '';
        $temperament        = $valor['temperament'] ?? '';
        $breed_weight       = $valor['weight']['metric'] ?? '';
    
        $sql = 'INSERT INTO breeds (
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
                "{$bred_for}", 
                "{$breed_group}", 
                "{$breed_height}", 
                "{$life_span}",
                "{$breed_name}",
                "{$origin}",
                "{$reference_image_id}",
                "{$temperament}",
                "{$breed_weight}"
            )';
    
        if (mysqli_query($conn, $sql)) {
            $breed_id += 1;
            echo "{$breed_id} - <b>{$valor['name']}</b> foi adicionado a tabela. <br>";
        } else {
            echo "ERROR: Não foi possivel executar $sql. " . mysqli_error($conn);
        }
    }

    $curr_page++;
} while ($curr_page <= $lastPage);

CloseCon($conn);
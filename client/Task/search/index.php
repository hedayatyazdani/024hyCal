<?php
    require "../../../config.php";
    require "../../../logic/php/Task.php";
    
    echo "<Calendar>";
    $res=Task::search(
        $uc->uid,
        isset($_GET['param'])?$_GET['param']:null,
        isset($_GET['start'])?$_GET['start']:null,
        isset($_GET['end'])?$_GET['end']:null,
        isset($_GET['dl'])?$_GET['dl']:0,
        isset($_GET['ul'])?$_GET['ul']:50);
    echo Task::toXml($res);
    print_r($defdb->queries);
    echo "</Calendar>";
?>
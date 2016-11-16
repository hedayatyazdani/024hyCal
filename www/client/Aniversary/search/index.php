<?php
    //search
    require "../../../config.php";
    require "../../../logic/php/Aniversary.php";
    
    echo "<Calendar>";
        $res=Aniversary::search(
            $uc->uid,
            isset($_GET['param'])?$_GET['param']:null,
            $_GET['calendar'],
            isset($_GET['similar'])?$_GET['similar']:null,
            isset($_GET['min'])?$_GET['min']:null,
            isset($_GET['max'])?$_GET['max']:null,
            isset($_GET['dl'])?$_GET['dl']:-1,
            isset($_GET['ul'])?$_GET['ul']:100
        );
        echo Aniversary::toXml($res);
        print_r($defdb->queries);
    echo "</Calendar>";
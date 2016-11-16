<?php
    //save
    require "../../../config.php";
    require "../../../logic/php/Aniversary.php";
    
    $a=Aniversary::parseXml($_REQUEST['xml']);
    foreach ($a as $cur)
    {
        print_r($cur);
        $cur->owner=$uc->uid;
        Aniversary::save($cur);
    }
<?php
    require "../../../config.php";
    require "../../../logic/php/Task.php";
    
    $ts=Task::parseXml($_REQUEST['xml']);
    foreach($ts as $task){
        $task->uid=$uc->uid;
        Task::save($task);
        echo $task->id;
    }
    //print_r($defdb->queries);
?>
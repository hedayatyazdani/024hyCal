<?php
    require "../../../config.php";
    require "../../../logic/php/Task.php";
    
    $task=new stdClass();
    $task->uid=$uc->uid;
    $task->id=$_GET['id'];
    Task::remove($task);
?>
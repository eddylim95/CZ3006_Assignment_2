<?php
require "order.php";

// Gets order from HTTP POST
$orderResponseTaker = new OrderResponseTaker();
$orderedFruits = $orderResponseTaker->takeOrder();

// Writes order to order.txt
$orderWriter = new OrderWriter();
$orderWriter->writeOrder($orderedFruits);
?>

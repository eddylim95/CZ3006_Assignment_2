<?php
class OrderWriter
{
    function writeOrder($fruits)
    {
        // Add and save fruit total orders
        $lines = file('./order.txt', FILE_SKIP_EMPTY_LINES);
        for ($i = 0; $i < sizeof($lines); $i++) {
            preg_match("/(\d+)/", $lines[$i], $current_value);
            preg_match("/[a-zA-z ]+: /", $lines[$i], $item);
            $lines[$i] = $item[0] . ((int)$current_value[0] + (int)$fruits[array_keys($fruits)[$i]]) . "\n";
            print $lines[$i];
        }
        file_put_contents('./order.txt', $lines);
    }
}

class OrderResponseTaker
{
    function takeOrder()
    {
        // Receive order numbers
        $fruits = array('apple' => 0, 'orange' => 0, 'banana' => 0);
        if (is_numeric($_POST["apple"])) {
            $fruits['apple'] = (int)$_POST["apple"];
        }
        if (is_numeric($_POST["orange"])) {
            $fruits['orange'] = (int)$_POST["orange"];
        }
        if (is_numeric($_POST["banana"])) {
            $fruits['banana'] = (int)$_POST["banana"];
        }

        return $fruits;
    }
}
?>
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Adds or remove qty for the fruits according to amount.
// Note: Will call qtyChange
function changeQty(fruit, qty) {
    var currentVal = Number($(fruit + ">>> #qty").val());
    $(fruit + ">>> #qty").val(currentVal + qty);
    onQtyChange(fruit);
}

// Updates fruit prices and receipt table
function onQtyChange(fruit) {
    var currentQty = Number($(fruit + ">>> #qty").val());
    if (!Number.isInteger(currentQty) || currentQty < 0) {
        currentQty = 0;
    }
    $(fruit + ">>> #qty").val(currentQty);
    var fruitPrice = getFruitPrice(fruit, currentQty);
    $(fruit + ">> #price").text('$' + fruitPrice);
    // call updateReceiptTable last
    updateReceiptTable(fruit, currentQty, fruitPrice);
}

// updates prices of the diagram
function getFruitPrice(fruit, totalQty) {
    var fruitPrice;
    if (fruit == '#Apples') {
        fruitPrice = 69 * totalQty / 100;
    } else if (fruit == '#Oranges') {
        fruitPrice = 59 * totalQty / 100;
    } else {
        fruitPrice = 39 * totalQty / 100;
    }
    return parseFloat(fruitPrice).toFixed(2);
}

// updates the ReceiptTable. Uses the html value of fruits
function updateReceiptTable(fruit, qty, fruitPrice) {
    if (qty == 0) {
        $("#receiptTable >> " + fruit).hide(300);
    } else {
        $("#receiptTable >> " + fruit).show(300);
    }
    $("#receiptTable >> " + fruit + " > #qty").html(qty);
    $("#receiptTable >> " + fruit + " > #price").html(fruitPrice);
    var applePrice = Number($("#receiptTable >> #Apples > #price").html())
    var orangePrice = Number($("#receiptTable >> #Oranges > #price").html())
    var bananaPrice = Number($("#receiptTable >> #Bananas > #price").html())
    var totalPrice = 0;
    if (!isNaN(applePrice)) {
        totalPrice += applePrice;
    }
    if (!isNaN(orangePrice)) {
        totalPrice += orangePrice;
    }
    if (!isNaN(bananaPrice)) {
        totalPrice += bananaPrice;
    }
    $("#receiptTablePrice > #totalPrice").html("$" + parseFloat(totalPrice).toFixed(2));
}

// Show name at checkout
function showName() {
    if ($("#username").val().trim() !== "") {
        $("#checkout > h1").html("<h1>" + $("#username").val() + "'s Checkout</h1>");
    } else {
        $("#checkout > h1").html("<h1>Checkout</h1>");
    }
}

// Post data to server and show alert messages.
function submit() {
    var totalPrice = parseFloat($("#receiptTablePrice > #totalPrice").html().slice(1)).toFixed(2)
    if ($("#username").val().trim() === "") {
        $("#alert-success").hide(300);
        $("#alert-danger").html(
            `<div class="col-md-12">
            <div class="alert alert-danger alert-dismissable">
                Please enter your name!
            </div>
        </div>`)
        $("#alert-danger").show(300);
    } else if (totalPrice > 0) {
        postToPhp();
        $("#alert-danger").hide(300);
        $("#alert-success").show(300);
        $("#payment >> .form-check-input").attr("disabled", "disabled");
        $("#submit").attr("disabled", "disabled");
        $("#receipt").show(300);
    } else {
        $("#alert-success").hide(300);
        $("#alert-danger").html(
            `<div class="col-md-12">
            <div class="alert alert-danger alert-dismissable">
                No items selected for checkout!
            </div>
        </div>`)
        $("#alert-danger").show(300);
    }
}

// Enables the payment button and save payment session
function enablePayment(payment) {
    $("#submit").removeAttr("disabled", "disabled");
    sessionStorage.setItem('payment', payment);
}

// Post order amount to PHP server and stores some session variables for receipt
function postToPhp() {
    var appleQty = Number($("#receiptTable >> #Apples > #qty").html());
    var orangeQty = Number($("#receiptTable >> #Oranges > #qty").html());
    var bananaQty = Number($("#receiptTable >> #Bananas > #qty").html());
    var username = $("#username").val();

    sessionStorage.setItem('apple', appleQty)
    sessionStorage.setItem('orange', orangeQty)
    sessionStorage.setItem('banana', bananaQty)
    sessionStorage.setItem('username', username)

    // HTTP post
    $.post("./request.php", {
            username: username,
            apple: appleQty,
            orange: orangeQty,
            banana: bananaQty
        },
        function (data, status) {
            console.log(status);
        });
}
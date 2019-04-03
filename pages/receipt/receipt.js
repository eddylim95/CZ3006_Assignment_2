// loads date into html
window.onload = dateNow();
window.onload = generateReceiptNumber();
window.onload = generateReceiptTitle();
window.onload = generateQuantities();
window.onload = updateTotalPrices();

function dateNow() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); //January = 0
    var year = today.getFullYear();

    today = 'Generated Date: ' + day + '/' + month + '/' + year;
    $("#date").html(today);
}

// generates a random receipt number into html
function generateReceiptNumber() {
    var randNum = Math.floor(Math.random() * 1000000);
    $("#receiptNumber").html("Receipt #: " + randNum);
}

function generateReceiptTitle() {
    $("#receiptTitle").html(sessionStorage.getItem('username') + "'s Receipt");
}

function generateQuantities(){
    var apples = sessionStorage.getItem('apple');
    var oranges = sessionStorage.getItem('orange');
    var bananas = sessionStorage.getItem('banana');
    if (apples != 0){
        $("#Apples").show();
        $("#Apples > #qty").html(apples);
        $("#Apples > #price").html("$" + getFruitPrice("#Apples", apples))
    }
    if (oranges != 0){
        $("#Oranges").show();
        $("#Oranges > #qty").html(oranges);
        $("#Oranges > #price").html("$" + getFruitPrice("#Oranges", oranges))
    }
    if (bananas != 0){
        $("#Bananas").show();
        $("#Bananas > #qty").html(bananas);
        $("#Bananas > #price").html("$" + getFruitPrice("#Bananas", bananas))
    }
}

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

// Updates the total prices in receipt and payment method
function updateTotalPrices(){
    var totalPrice = 0;
    totalPrice += parseFloat($("#Apples > #price").html().slice(1));
    totalPrice += parseFloat($("#Oranges > #price").html().slice(1));
    totalPrice += parseFloat($("#Bananas > #price").html().slice(1));
    totalPrice = totalPrice.toFixed(2);
    $("#subtotal").html("$" + totalPrice);
    $("#total").html("$" + totalPrice);
    $("#payment").html(sessionStorage.getItem('payment'))
}
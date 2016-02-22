//arrays for number word values
var digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var ty = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var extras = ['million', 'thousand', ''];

//assumes a whole number
//assumes user input is a string
function numToWords(n) {
    //var to concatenate the string
    var str='';
    var numByThrees;

    //ensure n is a whole number
    var num = n || parseFloat(n.replace(/,/g, ''));

    if(n.indexOf(',') === -1) {
        numByThrees = split(n);
    } else {
        numByThrees = n.split(',');
    }

    //ensure n is within range of 0 - 999,999,999
    if(num < 0 || num > 999999999 || n === '') {
        return 'Number is out of range. Please select a number between 0 and 999,999,999';
    } else {
        //run each index of numByThrees through as hundreds
        //concatenate end word need for each set based on place value
        for(var i = 0; i < numByThrees.length; i++) {
            //make array out of each set numByThrees index
            var numByThreesSplit = numByThrees[i].split('');

            //Cycle through numByThrees based on length
            if(numByThrees.length === 3) {//MILLIONS
                all(i,i);
            } else if(numByThrees.length === 2) { //THOUSANDS
                all(i,(i+1));
            } else if(numByThrees.length === 1) { //HUNDREDS
                if (numByThreesSplit.length === 3) {
                    all(i,(i+2));
                } else if (numByThreesSplit.length === 2) {
                    if(numByThreesSplit[0] === '1') {
                        str += tens[parseInt(numByThreesSplit[1])];
                    } else {
                        str += ty[parseInt(numByThreesSplit[0] - 2)];
                        if(numByThreesSplit[1] !== '0') {
                            str += ' ' + digits[parseInt(numByThreesSplit[1])]
                        }
                    }
                } else {
                    str += digits[parseInt(numByThreesSplit[0])];
                }
            }
        }

        //Call all functions needed for each index of numByThree
        function all(i,x) {
            if(numByThreesSplit.indexOf('0') !== -1) {
                if (numByThrees[i].length === 2 || numByThrees[i].length === 1) {
                    notThree(x);
                } else {
                    zeros(x);
                }
            }
            else if (numByThreesSplit.indexOf('0') === -1) {
                if (numByThrees[i].length === 2 || numByThrees[i].length === 1) {
                    notThree(x);
                } else {
                    if(numByThreesSplit[1] === '1') {
                        ten(x);
                    } else {
                        three(x);
                    }
                }
            } else {
                console.log('ERROR');
            }
        }

        //logic for groupings with 0s
        function zeros(x) {
            if(numByThreesSplit[0] === '0' && numByThreesSplit[1] === '0' && numByThreesSplit[2] === '0') {
                //000
                str += '';
            } else if (numByThreesSplit[0] === '0' && numByThreesSplit[1] === '0') {
                //002
                str += ' and ' + digits[parseInt(numByThreesSplit[2])] + ' ' + extras[x] + ' ';
            } else if (numByThreesSplit[0] === '0') {
                //022 OR 012
                if(numByThreesSplit[1] === '1') {
                    str += ' and ' + tens[parseInt(numByThreesSplit[2])] + ' ' + extras[x] + ' ';
                } else {
                    str += ty[parseInt(numByThreesSplit[1] - 2)] + ' ' + extras[x] + ' ';
                }
            } else if (numByThreesSplit[1] === '0' && numByThreesSplit[2] === '0') {
                //400
                str += digits[parseInt(numByThreesSplit[0])] + ' hundred ' + extras[x] + ' ';
            } else if (numByThreesSplit[2] === '0') {
                //120 OR 110
                if(numByThreesSplit[1] === '1') {
                    str += digits[parseInt(numByThreesSplit[0])] + ' hundred and ' + tens[parseInt(numByThreesSplit[2])];
                } else {
                    str += digits[parseInt(numByThreesSplit[0])] + ' hundred and ' + ty[parseInt(numByThreesSplit[1] - 2)] + ' ' + extras[x] + ' ';
                }
            } else if(numByThreesSplit[1] === '0') {
                //101
                str += digits[parseInt(numByThreesSplit[0])] + ' hundred and ' + digits[parseInt(numByThreesSplit[2])] + ' ' + extras[x] + ' ';
            }
        }

        //logic for tens
        function ten(x) {
            str += digits[parseInt(numByThreesSplit[0])] + ' hundred ' + tens[parseInt(numByThreesSplit[2])] + ' ' + extras[x] + ' ';
        }

        //numByThreesSplit.length = 1 or 2
        function notThree(x) {
            var d = digits[parseInt(numByThreesSplit[1])] === 'zero' ? '' : digits[parseInt(numByThreesSplit[1])];
            if (numByThrees[0].length === 2) {
                if(numByThreesSplit[0] === '1') {
                    str += tens[parseInt(numByThreesSplit[1])] + ' ' + extras[x] + ' ';
                } else {
                    console.log(1);
                    str += ty[parseInt(numByThreesSplit[0]) -2] + ' ' + d + ' ' + extras[x] + ' ';
                }
            } else if (numByThrees[0].length === 1) {
                str += digits[parseInt(numByThreesSplit[0])] + ' ' + extras[x] + ' ';
            }
        }

        //numByThreesSplit.length = 3
        function three(x) {
            if(numByThreesSplit[0] === '0' && numByThreesSplit[1] === '0' && numByThreesSplit[2] === '0') {
                str += '';
            } else {
                str += digits[parseInt(numByThreesSplit[0])] + ' hundred and ' + ty[parseInt(numByThreesSplit[1]) - 2] + ' ' + digits[parseInt(numByThreesSplit[2])] + ' ' + extras[x] + ' ';
            }
        }
    }//end of else

    return str;
}//end of numToWords()

//get user input
//call numToWords()
//reset input to ''
function userInput() {
    var user = document.getElementById('number').value;
    document.getElementById('output').innerHTML = numToWords(user);
    document.getElementById('number').value = '';
}

//allow submit via enter key
function enter(e) {
    e = e || window.event;
    if(e.keyCode == 13) {
        document.getElementById('numberSubmit').click();
    }
}

//split user input into array by every 3 if no commas
function split(str) {
    var i = str.length % 3;
    var parts = i ? [ str.substr( 0, i ) ] : [];
    for( i; i < str.length; i += 3 ) {
        parts.push( str.substr( i, 3 ) );
    }
    return parts;
}

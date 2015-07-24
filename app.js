var valueInput = function(inputName) {
    return document.querySelector('[name=' + inputName + ']').value;
};

var process = function() {
    var rule = parseInt(valueInput('rule'));

    var options = {
        cellSize: valueInput('cell-size'),
        size: [valueInput('size-x'), valueInput('size-y')]
    };

    window.location.hash = '#' + document.querySelector('[name=rule]').value;

    var t0 = performance.now();

    var rule = new Rule(rule, options);
    rule.process();

    var t1 = performance.now();
    document.querySelector('#infos .time').innerHTML = Math.round(t1 - t0);

    return false;
};

window.addEventListener('hashchange', function() {
    document.querySelector('[name=rule]').value = window.location.hash.replace(/[^0-9]+/g, '');
    process();
});

process();

document.getElementById('panel').onsubmit = process;

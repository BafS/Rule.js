
function Rule(ruleNumber, options) {
    this.rule = ruleNumber;
    this.options = options;
}

Rule.prototype.process = function() {

    var ruleBin = this.rule.toString(2);

    // bitwise operators to convert into 32 bits int
    var sizeX = this.options.size[0]|0;
    var sizeY = this.options.size[1]|0;

    var cellSize = this.options.cellSize|0;

    var padding = '00000000'.substr(ruleBin.length);

    rule = padding + ruleBin;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.canvas.width  = cellSize * sizeX;
    ctx.canvas.height = cellSize * sizeY;

    ctx.fillStyle = 'green';
    ctx.scale(cellSize, cellSize);

    var gameParents = [],
        gameChildren = [],
        gameRefTmp;

    // First line initialization
    for(var i = 0; i < sizeX; ++i) {
        gameParents[i] = 0;
    }

    // First cell ON
    gameParents[sizeX / 2] = 1;

    for(var y = 0; y < sizeY; ++y) {

        for(var x = 0; x < sizeX; ++x) {
            // Color the cell if there is something
            if(gameParents[x] != 0) {
                ctx.fillRect(x, y, 1, 1);
            }

            // Calculate children
            if(y != sizeY - 1) {
                var pattern = '' + gameParents[x - 1] + gameParents[x] + gameParents[x + 1];
                var patternNum = (7 - parseInt(pattern, 2))|0;
                gameChildren[x] = rule[patternNum]|0;
            }
        }

        gameRefTmp = gameParents;
        gameParents = gameChildren;
        gameChildren = gameRefTmp;
    }
};

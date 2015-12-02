wormApp.factory('drawingService', [function () {

    var _context,
        _canvasSize,
        _elementSize;

    var drawPiece = function (piece) {
        _context.fillRect(
            (piece.x + 1) * _elementSize.width,
            (piece.y + 1) * _elementSize.height,
            _elementSize.width,
            _elementSize.height
        );
    };

    var setPieceColor = function (color) {
        _context.fillStyle = color;
    };

    var clearCanvas = function () {
        _context.clearRect(0, 0, _canvasSize.width, _canvasSize.height);
    };

    return {
        setCanvas: function (canvas) {
            _canvasSize = {
                width: canvas.width,
                height: canvas.height
            };

            _context = canvas.getContext('2d');
        },
        setMatrixSize: function (size) {
            _elementSize = {
                width: _canvasSize.width / size.x,
                height: _canvasSize.height / size.y
            };
        },
        drawPiece: drawPiece,
        setPieceColor: setPieceColor,
        clearCanvas: clearCanvas
    };
}]);
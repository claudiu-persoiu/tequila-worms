wormApp.factory('drawingService', [function () {

    var _canvas,
        _context,
        _canvasSize,
        _elementSize,
        _matrixSize;

    var drawPiece = function (piece) {
        _context.fillRect(
            (piece.x + 1) * _elementSize.width,
            (piece.y + 1) * _elementSize.height,
            _elementSize.width,
            _elementSize.height
        );
        return this;
    };

    var setPieceColor = function (color) {
        _context.fillStyle = color;
        return this;
    };

    var clearCanvas = function () {
        _context.clearRect(0, 0, _canvasSize.width, _canvasSize.height);
        return this;
    };

    return {
        setCanvas: function (canvas) {
            _canvas = canvas;
            _context = _canvas.getContext('2d');
            return this;
        },
        calculateProportions: function () {
            _canvasSize = {
                width: _canvas.offsetWidth,
                height: Math.ceil((_canvas.offsetWidth / 16) * 11)
            };
            _canvas.width = _canvasSize.width;
            _canvas.height = _canvasSize.height;
            return this;
        },
        calculateElementSize: function () {
            _elementSize = {
                width: Math.ceil(_canvasSize.width / _matrixSize.x),
                height: Math.ceil(_canvasSize.height / _matrixSize.y)
            };
            return this;
        },
        setMatrixSize: function (size) {
            _matrixSize = size;
            return this;
        },
        drawPiece: drawPiece,
        setPieceColor: setPieceColor,
        clearCanvas: clearCanvas
    };
}]);
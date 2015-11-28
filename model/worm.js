module.exports = function (nameParam) {

    var name = nameParam;

    return {
        getName: function () {
            return name;
        },
        getData: function () {
            return {
                name: name
            }
        }
    };
};
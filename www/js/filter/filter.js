(function() {
    angular.module('starter')
        .filter("formateDate", function() {
            return function(input) {
                var date = new Date(input);
                M = (date.getMonth() + 1) + '月';
                D = date.getDate() + '日 ';
                h = date.getHours() + ':';
                m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
                return M + D + h + m;
            }
        })

    .filter("formatePrice", function() {
        return function(input) {
            if (!input || input == "null") {
               return '';
            }
            return '&' + input;
        }
    })

    .filter("formateDateBarcode", function() {
        return function(input) {
             var date = new Date(input);
            Y = date.getFullYear() + '/';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Y + M + D;
        }
    })

      .filter("isNull", function() {
        return function(input) {
            var text = input;
            if (!text||text == "null") {
               return '';
            }
            return text;
        }
    })
})()

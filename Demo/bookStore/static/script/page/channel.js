var sex = location.href.split('/').pop();
$.get('/ajax/' + sex, function(d) {
    new Vue({
        el: "#root",
        data: d,
        methods: {
            readBook: function() {
                location.href = "/reader"
            }
        }
    })
}, 'json')
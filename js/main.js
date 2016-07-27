;(function() {
    var selectedEmoji;  //选中的表情
    var isEraser = false;
    var moving = false;
    var tableWidth;
    var tableHeight;

    function resetTools() {
        $('.editor-tool span').removeClass('active');
        isEraser = false;
    }

    function initTable(w, h) {
        tableWidth = w;
        tableHeight = h;
        var table = '', tr = '<tr>', td = '';
        for (var i = 0; i < tableHeight; i++) {
            tr = '<tr>';
            td = '';
            for (var j = 0; j < tableWidth; j++) {
                td += '<td></td>';
            }
            tr += (td + '</tr>');
            table += tr;
        }
        $('.editor-table').html(table);
    }

    function bindEvent() {
        $('.emoji').click(function(e) {
            var emoji = $(this).text();
            selectedEmoji = emoji;
            $('.currentEmoji').text(emoji);
            resetTools();
        });

        $('.editor-table').on('mousedown touchstart', function(e) {
            moving = true;
        }).on('mousemove touchmove', function(e) {
            if (moving) {
                var target = $(e.target);
                if (isEraser) {
                    target.text('');
                } else {
                    target.text(selectedEmoji);    
                }
            }
        }).on('mouseup touchend', function(e) {
            moving = false;
        });

        $('.editor-table td').click(function(e) {
            if (isEraser) {
                $(this).text('');    
            } else {
                $(this).text(selectedEmoji);    
            }
        });

        $('.editor-tool span').click(function(e) {
            $('.editor-tool span').removeClass('active');
            $(this).addClass('active');
        });

        $('.eraser').click(function(e) {
            isEraser = !isEraser;
        });

        $('.clean').click(function(e) {
            $('.editor-table td').text('');
        });

        $('.save').click(function(e) {
            save();
        });
    }

    function save() {
        var editor = $('#save_editor');
        var tds = $('.editor-table td');
        var content = '', td;
        for (var i = 0; i < tds.length; i++) {
            td = $(tds[i]).text();
            content += td ? (td) : '&nbsp;&nbsp;&nbsp;&nbsp;';
            if ((i + 1) % tableWidth === 0) {
                content += '\n';
            }
        }
        editor.html(content);
        editor[0].select();
        
        try {
            var successful = document.execCommand('copy');
            if (successful) {
                $('.copy').addClass("show");
                setTimeout(function() {
                    $('.copy').removeClass("show");
                }, 1500);
            }
        } catch (err) {
            //cannot copy
        }
    }

    function init() {
        initTable(15, 15);
        bindEvent();
    }

    init();

})();
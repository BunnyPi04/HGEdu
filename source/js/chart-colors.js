'use strict';

window.chartColors = {
    blue: '#226bcf',
    light_blue: '#5498df',
    bg_light_blue: '#eef6ff',
    black: '#3a3a3a',
    green: '#2aa699',
    grey: '#797979',
    light_green: '#83c7c1',
    red: '#e82020',
    light_grey: '#bebebe',
    bg_grey: '#f6f6f6',
    bg_dark_grey: '#f2f2f2',
    border_light_grey: '#eeeeef',
    border_grey: '#f3f3f3',
    pink: '#f93da5',
    aqua: '#2db2e6',
    yellow: '#efe120',
    strong_green: '#39d55c',
    dark_yellow: '#f9b61b',
    strong_pink: '#f81a3f',
    purple: '#834eeb',
    shadow: '#00000029',
    easy: '#5c96d1',
    normal: '#086bd1',
    hard: '#002ad4',
    very_hard: '#001c8f'

    // red: 'rgb(255, 99, 132)',
    // orange: 'rgb(255, 159, 64)',
    // yellow: 'rgb(255, 205, 86)',
    // green: 'rgb(75, 192, 192)',
    // blue: 'rgb(54, 162, 235)',
    // purple: 'rgb(153, 102, 255)',
    // grey: 'rgb(201, 203, 207)'
};

(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-28909194-3', 'auto');
        ga('send', 'pageview');
    }
    /* eslint-enable */

}(this));

Chart.pluginService.register({
    beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Montserrat';
            var txt = centerConfig.text;
            var color = centerConfig.color || window.chartColors.grey;
            var maxFontSize = centerConfig.maxFontSize || 18;
            var sidePadding = centerConfig.sidePadding || 5;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

            if (centerConfig.unitText) {
                var miniText = centerConfig.unitText;
                var miniFont = centerConfig.unitFont || 'Montserrat';
                var miniSize = centerConfig.unitSize || '25';
                var miniColor = centerConfig.unitSize || window.chartColors.black;
            }

            //Start with a base font of 30px
            ctx.font = '22px ' + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + 'px ' + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            if (centerConfig.unitText) {
                let center = (fontSizeToUse + miniSize) / 2;
                ctx.fillText(txt, centerX, centerY - fontSizeToUse / 2);

                ctx.fillStyle = miniColor;
                ctx.font = miniSize + 'px ' + miniFont;
                ctx.fillText(miniText, centerX, centerY + miniSize / 2);
            } else {
                ctx.fillText(txt, centerX, centerY);
            }
        }
    }
});

Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function(ease) {
        // var ctx           = this.chart.ctx;
        // var easingDecimal = ease || 1;
        // var arcs          = this.getMeta().data;
        // Chart.helpers.each(arcs, function(arc, i) {
        //     arc.transition(easingDecimal).draw();

        //     var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
        //     var pColor = pArc._view.backgroundColor;

        //     var vm         = arc._view;
        //     var radius     = (vm.outerRadius + vm.innerRadius) / 2;
        //     var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
        //     var startAngle = Math.PI / 2 - vm.startAngle;
        //     var angle      = Math.PI / 2 - vm.endAngle;

        //     ctx.save();
        //     ctx.translate(vm.x, vm.y);

        //     ctx.fillStyle = i === 0 ? '#eeeeef' : pColor;
        //     ctx.beginPath();
        //     ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
        //     // ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
        //     ctx.fill();

        //     ctx.fillStyle = vm.backgroundColor;
        //     ctx.beginPath();
        //     ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
        //     ctx.fill();

        //     ctx.restore();
        // });
    }
});


Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Rating Graph'
    },
    xAxis: {
        tickWidth: 0,
        minPadding: 0.001,
        minRange: 30 * 24 * 3600 * 1000,//この値間隔を調整
        gridLineWidth: 1,
        type: 'datetime',
        dateTimeLabelFormats: {month: '%b <br>%Y'},
        plotOptions:{
          series: {
              lineWidth: 10
          }
        }
    },
    yAxis: {
        //横軸の幅
        tickInterval: 400,
        tickWidth: 0,
        gridLineWidth: 1,
        //レーティングごとの背景色
        plotBands:[{
                from: 0,
                to:   399,
                color: 'rgb(214, 214, 214)'
        },{
                from: 400,
                to:   799,
                color: 'rgb(214, 195, 178)'
        },{
                from: 800,
                to:   1199,
                color: 'rgb(178, 214, 178)'
        },{
                from: 1200,
                to:   1599,
                color: 'rgb(178, 234, 234)'
        },{
                from: 1600,
                to:   1999,
                color: 'rgb(178, 181, 255)'
        },{
                from: 2000,
                to:   2399,
                color: 'rgb(234, 233, 179)'
        },{
                from: 2400,
                to:   2799,
                color: 'rgb(255, 213, 178)'
        },{
                from: 2800,
                to:   10000,
                color: 'rgb(255, 178, 178)'
      }]
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'User1',
        data: [[0,500],[3000000,900], [4000000,900], [4400000,1000], [4900000,1000], [5000000,2150]]
    }]
});

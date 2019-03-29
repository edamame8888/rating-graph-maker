// データ設定
var config = {
    data: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        datasets: [{
            label: 'dataset1',
            backgroundColor: "DarkRed",
            borderColor: "chocolate",
            data: [
                10, 15, 20, 25, 30, 45, 60
            ],
        }, {
            label: 'dataset2',
            fill: false,
            backgroundColor: "olive",
            borderColor: "olivedrab",
            data: [
                10, 40, 80, 160, 160, 240, 280
            ],
        }, {
            label: 'dataset3',
            fill: false,
            backgroundColor: "DarkBlue",
            borderColor: "steelblue",
            data: [
                50, 100, 250, 300, 320, 360, 400
            ],
        }]
    },
};

window.addEventListener("load", init);
function init() {

    var stage = new createjs.Stage("myCanvas");
    stage.canvas.width = 640;
    stage.canvas.height = 320;

    // マウスオーバーを有効にする
    stage.enableMouseOver();

    drawGraph(stage);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        stage.update();
    }

}

function drawGraph(stage) {

    // パディングサイズ 10%
    var padding = 0.1;

    // 軸の基準
    var baseX = stage.canvas.width * padding;
    var baseY = stage.canvas.height * (1.0 - padding);

    // 横軸の描画
    var horizontalLine = new createjs.Shape();
    horizontalLine.x = baseX;
    horizontalLine.y = baseY;
    horizontalLine.graphics
        .beginStroke("gray")
        .moveTo(0, 0)
        .lineTo(stage.canvas.width * (1 - (padding * 2)), 0)
        .endStroke();
    stage.addChild(horizontalLine);

    // 縦軸の描画
    var verticalLine = new createjs.Shape();
    verticalLine.x = baseX;
    verticalLine.y = baseY;
    verticalLine.graphics
        .beginStroke("gray")
        .moveTo(0, 0)
        .lineTo(0, -stage.canvas.height * (1 - (padding * 2)))
        .endStroke();
    stage.addChild(verticalLine);

    // 横軸ラベルの数
    var horizontalLength = config.data.labels.length;

    // 横軸ラベルの間隔
    var horizontalStep = (stage.canvas.width * (1 - (padding * 2))) / horizontalLength;

    // 横軸ラベル
    for (var i = 0; i < horizontalLength; i++) {
        var labels = new createjs.Text(config.data.labels[i], "12px serif", "gray");
        labels.x = baseX + (horizontalStep * i);
        labels.y = baseY + 10;
        labels.textAlign = "center";
        stage.addChild(labels);
    }

    // 縦軸ラベルの数
    var verticalLength = 5;

    // 縦軸ラベルの間隔
    var verticalStep = (stage.canvas.height * (1 - (padding * 2))) / verticalLength;

    // 縦軸ラベル
    for (var i = 0; i < verticalLength; i++) {
        var labels = new createjs.Text(i * 100, "12px serif", "gray");
        labels.x = baseX - 10;
        labels.y = baseY - (verticalStep * i);
        labels.textAlign = "right";
        labels.textBaseline = "middle";
        stage.addChild(labels);
    }

    // 横軸補助線
    for (var i = 1; i < verticalLength; i++) {
        var additionalLine = new createjs.Shape();
        additionalLine.x = baseX;
        additionalLine.y = baseY - (verticalStep * i);
        additionalLine.graphics
            .beginStroke("lightgray")
            .setStrokeDash([2, 2], 0)
            .moveTo(0, 0)
            .lineTo(stage.canvas.width * (1 - (padding * 2)), 0, 0)
            .endStroke();
        stage.addChild(additionalLine);
    }

    // 縦軸補助線
    for (var i = 1; i < horizontalLength; i++) {
        var additionalLine = new createjs.Shape();
        additionalLine.x = baseX + (horizontalStep * i);
        additionalLine.y = baseY;
        additionalLine.graphics
            .beginStroke("lightblue")
            .setStrokeDash([2, 2], 0)
            .moveTo(0, 0)
            .lineTo(0, -stage.canvas.height * (1 - (padding * 2)))
            .endStroke();
        stage.addChild(additionalLine);
    }

    // 前のデータ点座標を保持する
    var prevX = baseX;
    var prevY = baseY;

    var waitTime = 0;

    // データ点
    for (var key in config.data.datasets) {
        for (var i = 0; i < horizontalLength; i++) {

            if (config.data.datasets[key].data[i] == null) {
                continue;
            }

            // 点の描画
            var dot = new createjs.Shape();
            dot.graphics.beginFill(config.data.datasets[key].backgroundColor);
            dot.graphics.drawCircle(0, 0, 5);
            dot.x = baseX + (horizontalStep * i);
            dot.y = baseY - (config.data.datasets[key].data[i] * verticalStep / 100);
            dot.dataVal = config.data.datasets[key].data[i];
            stage.addChild(dot);

            // 点の動き
            createjs.Tween.get(dot)
                .to({ scale: 0 }, 0)
                .wait(500 + waitTime)
                .to({ scale: 2.0 }, 200)
                .to({ scale: 1.0 }, 200, createjs.Ease.cubicOut)
                ;

            // 線の描画
            var stroke = new createjs.Shape();
            stroke.graphics
                .beginStroke(config.data.datasets[key].borderColor)
                .moveTo(0, 0)
                .lineTo(dot.x - prevX, dot.y - prevY)
                .endStroke();
            stroke.x = prevX;
            stroke.y = prevY;
            stage.addChildAt(stroke, 0);

            // 線の動き
            createjs.Tween.get(stroke)
                .to({ scaleX: 0, scaleY: 0 }, 0)
                .wait(500 + waitTime)
                .to({ scaleX: 1.0, scaleY: 1.0 }, 100)
                ;

            prevX = dot.x;
            prevY = dot.y;

            waitTime += 100;

            // 点にマウスイベント登録
            dot.addEventListener("mouseover", handleMouseOver);
            dot.addEventListener("mouseout", handleMouseOut);
        }
        prevX = baseX;
        prevY = baseY;
    }

    // マウスオーバーしたとき
    function handleMouseOver(event) {
        var dot = event.target;
        var dataVal = new createjs.Text(dot.dataVal, "12px serif", "gray");
        dataVal.x = dot.x - 5;
        dataVal.y = dot.y - 5;
        dataVal.textAlign = "right";
        dataVal.textBaseline = "bottom";
        dataVal.name = dot.dataVal;
        stage.addChild(dataVal);
    }

    // マウスアウトしたとき
    function handleMouseOut(event) {
        var dataVal = stage.getChildByName(event.target.dataVal);
        stage.removeChild(dataVal);
    }

}

$(function(){
  //idのフォームの隣のボタンを押したときにjson取得
  $('#send-id-btn').click(function(){

    const userId = document.getElementById("id-form").value;

    //DEBUG
    console.log(userId)

    //AtCoderのデータが格納されているJSONデータへのパス
    var path = "https://atcoder.jp/users/" + userId + "/history/json";  //httpから始まるURL型式でもOKです。

    //DEBUG
    console.log(path)

    $.ajax({
        type:           'GET',
        scriptCharset:  'utf-8',
        dataType:       'json',
        url:            '${path}',
        success: function(res){
          console.debug("ok"); //読み込み成功！
        },
        error:function(){console.log('Miss..');}
    });

  });
});

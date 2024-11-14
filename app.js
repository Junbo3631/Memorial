$(document).ready(function () {
  // LocalStorageからデータを読み込み
  let words = JSON.parse(localStorage.getItem('words')) || [];

  // ページ読み込み時にメモリストを表示
  displayWords();
  

  // メモを追加する処理
  $('#addWordButton').click(function () {
    const word = $('#ancestorWords').val().trim();
    if (word) {
      words.push(word);
      $('#ancestorWords').val(''); // 入力フィールドをクリア
      saveWords();  // LocalStorageに保存
      displayWords();
    } else {
      alert("テキストを入力してください！");
    }
  });

  // リストを全削除する処理
  $('#clearListButton').click(function () {
    if (confirm('リストを全て削除しますか？')) {
      words = []; // 配列を空にする
      localStorage.removeItem('words'); // LocalStorageをクリア
      displayWords(); // リスト表示を更新
    }
  });

  // メモリストを表示する関数
  function displayWords() {
    $('#wordsList').empty(); // リストをリセット

    words.forEach((word, index) => {
      const listItem = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${word} 
          <button class="btn btn-sm btn-success play-btn" data-word="${word}">再生</button>
        </li>
      `);
      $('#wordsList').append(listItem);
    });

    // 動的に生成した再生ボタンにクリックイベントを設定
    $('.play-btn').click(function () {
      const text = $(this).data('word');
      speakWord(text);
    });
  }

  // LocalStorageにデータを保存する関数
  function saveWords() {
    localStorage.setItem('words', JSON.stringify(words));
  }

  // 音声合成でメモを再生する関数
  function speakWord(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 日本語に設定
    synth.speak(utterance);
  }
});


 
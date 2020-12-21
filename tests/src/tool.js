function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback(1);
  }, 1000);
}

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

export { 
  timerGame,
  infiniteTimerGame
}
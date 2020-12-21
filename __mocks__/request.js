const users = {
  4: { name: 'Mark' },
  5: { name: 'Paul' },
};


export default function request(url) {
  console.log(23)
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10)
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
          error: 'User with ' + userID + ' not found.',
        })
    )
  })
}
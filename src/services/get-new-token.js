const getNewToken = async () => {
  return fetch(
    `${
      process.env.GATSBY_SERVER_URL
    }/new-token?refreshToken=${localStorage.getItem("rToken")}`
  ).then(r => r.json())
}

export default getNewToken
